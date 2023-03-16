import { ABI, POOL_TYPE } from "./constants"
import { web3 } from "./web3"


/* 
const getUnderlyingAddressCurve = async (address, coins) => {
    const contract = new web3duphong.eth.Contract(
        AbiPoolCurve,
        address
    );
    const listAddress = Promise.all(coins.map(async (item, index) => {
        return await contract.methods.underlying_coins(index).call()
    })).then(res => res)
        .catch(res => [])
    return listAddress
}
 */


export const getDataPoolCurveV1 = async () => {
    const dataApi = await fetch('https://api.curve.fi/api/getPools/ethereum/main')
        .then((response) => response.json())

    const data = await Promise.all(dataApi.data.poolData.map(async item => {
        const underlyingAddress = []// await getUnderlyingAddressCurve(item.address, item.coins)
        const readAddress = []//item.underlyingCoins? item.underlyingCoins.map(item=>item.address):[]

        const contract = new web3.eth.Contract(
            ABI.POOL_CURVE_V1,
            item.address
        );

        const fee = await contract.methods.fee().call()

        return {
            ...item,
            amplificationCoefficient: parseInt(item.amplificationCoefficient),
            fee: parseInt(fee),
            coinsAddresses: [...item.coinsAddresses, ...underlyingAddress, ...readAddress]
        }
    }))

    return data

}

export const getAddressPoolCurveV1 = async (DataTokenA, DataTokenB, listDataPool) => {
    if (DataTokenA.address.toUpperCase() === DataTokenB.address.toUpperCase()) return []

    const listPoolforPair = listDataPool.filter(item => {
        const upperCaseItem = item.coinsAddresses.map(item => item.toUpperCase())
        return upperCaseItem.includes(DataTokenA.address.toUpperCase()) &&
            upperCaseItem.includes(DataTokenB.address.toUpperCase())
    })
        .filter(item => item.assetTypeName === 'usd')
        .map(item => {
            return {
                ...item,
                type: POOL_TYPE.curveV1,
                name: item.name ? item.name : "noName",
                A: item.amplificationCoefficient
            }
        })
    return listPoolforPair
}

export const getReservePoolCurveV1 = async (address, coins) => {

    const contract = new web3.eth.Contract(
        ABI.POOL_CURVE_V1,
        address
    );

    const balances = await Promise.all(coins.map(async (item, index) => {
        return await contract.methods.balances(index).call()
    })).then(res => res)
        .catch(res => {
            return coins.map(item => 0)
        })

    const exchangeRate = await Promise.all(coins.map(async item => {
        const contractWapperToken = new web3.eth.Contract(
            ABI.TOKEN_WAPPER,
            item.address
        );
        return await contractWapperToken.methods.exchangeRateStored().call()
    }))
        .then(res => res)
        .catch(res => {
            return coins.map(item => 1)
        })



    const realBalances = balances.map((item, index) => item * exchangeRate[index] * 10 ** (36 - coins[index].decimals))
    return { reserve: realBalances }
}

export const calculateAmountTradedCurveV1 = (priceImpactEst, dataPool) => {
    const { i, j, coins, reserve, rate, address } = dataPool
    let cantren = reserve[j] * 10 / rate
    let canduoi = 0.01 * 10 ** 36

    let isLoop = true
    let index = 0


    while (isLoop) {
        index++
        if (index === 100) return 0
        const amountIn = (cantren + canduoi) / 2
        const amountOut = calcAmountOutCurvev1(amountIn, reserve, dataPool)
        const priceMarket = amountOut / amountIn
        const priceImpact = 1 - priceMarket / rate
        if (priceImpact === NaN) {
            console.log(address, amountIn, canduoi, cantren, priceImpact, index)
            return 0
        }
        if (Math.abs(priceImpact - priceImpactEst) < 0.00001) {
            isLoop = false
            return amountIn * coins[i].usdPrice
        }
        if (priceImpact - priceImpactEst > 0) cantren = amountIn
        if (priceImpact - priceImpactEst < 0) canduoi = amountIn
    }
}

export const calcAmountOutCurvev1 = (amountIn, reserve, otherParam) => {

    const { i, j, A, fee } = otherParam

    const N_COINS = reserve.length
    const get_D = (reserve, A) => {
        let S = 0;
        for (let i of reserve) {
            S += i;
        }
        if (S === 0)
            return 0;
        let Dprev = 0;
        let D = S;
        let Ann = A * N_COINS;
        for (let i = 0; i < 256; i++) {
            let D_P = D;

            for (let x of reserve) {
                D_P = D_P * D / (x * N_COINS);
            }

            Dprev = D;
            D = (Ann * S + D_P * N_COINS) * D / ((Ann - 1) * D + (N_COINS + 1) * D_P);

            if (D > Dprev) {
                if (D - Dprev <= 1)
                    break;
            }
            else {
                if (Dprev - D <= 1)
                    break;
            }
        }
        //console.log(D)

        return D;
    }

    const get_y = (i, j, x, reserve) => {
        if (i === j)
            return 0;
        if (j < 0 || j >= N_COINS)
            return 0;
        if (i < 0 || i >= N_COINS)
            return 0;
        let amp = A;
        let D = get_D(reserve, amp);
        let c = D;
        let S_ = 0;
        let Ann = amp * N_COINS;
        let _x = 0;
        for (let _i = 0; _i < N_COINS; _i++) {
            if (_i === i)
                _x = x;
            else if (_i !== j)
                _x = reserve[_i];
            else
                continue;
            S_ += _x;
            c = c * D / (_x * N_COINS);
        }
        c = c * D / (Ann * N_COINS);
        let b = S_ + D / Ann;
        let y_prev = 0;
        let y = D;
        for (let _i = 0; _i < 256; _i++) {
            y_prev = y;
            y = (y * y + c) / (2 * y + b - D);
            if (y > y_prev) {
                if (y - y_prev <= 1)
                    break;
            }
            else {
                if (y_prev - y <= 1)
                    break;
            }
        }


        return y;
    }

    const get_dy = (i, j, dx) => {
        const FEE_DENOMINATOR = 10 ** 10
        let x = reserve[i] + dx;
        let y = get_y(i, j, x, reserve);
        let dy = (reserve[j] - y - 1);
        let _fee = fee * dy / FEE_DENOMINATOR;
        return dy - _fee;
    }

    const amountOut = get_dy(i, j, amountIn)

    return amountOut
}





export const calcRateCurveV1 = (info, i, j) => {
    const AMOUNT_CALC_RATE = 0.001
    const { reserve, A, fee, decimals } = info
    const otherParam = {
        i, j, A, fee, decimals
    }
    const amountIn = AMOUNT_CALC_RATE * 10 ** (36)
    const amountOut = calcAmountOutCurvev1(amountIn, reserve, otherParam) / 10 ** (36)
    const rate = amountOut / AMOUNT_CALC_RATE
    return rate
}

