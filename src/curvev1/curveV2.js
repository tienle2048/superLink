
import { ABI, POOL_TYPE } from "./constants"
import { web3 } from "./web3"





const N_COINS = 3n
const A_MULTIPLIER = 10000n

const MIN_GAMMA = BigInt(10 ** 10)
const MAX_GAMMA = BigInt(5 * 10 ** 16)

const MIN_A = N_COINS ** N_COINS * A_MULTIPLIER / 100n
const MAX_A = N_COINS ** N_COINS * A_MULTIPLIER * 1000n

const POW_18 = BigInt(10 ** 18)

const PRECISION = BigInt(10 ** 18)
const PRECISIONS = [
    1000000000000n,
    10000000000n,
    1n,
]



const maxBigInt = (...values) => {
    if (values.length < 1) {
        return -Infinity;
    }

    let maxValue = values.shift();

    for (const value of values) {
        if (value > maxValue) {
            maxValue = value;
        }
    }

    return maxValue;
}

const _geometric_mean = (unsorted_x, sort = true) => {
    let x = unsorted_x.map(item => item)
    if (sort) x = x.sort((a, b) => Number(b - a))
    let D = x[0]
    let diff = 0n
    for (let i = 0; i < 255; i++) {
        let D_prev = D
        let tmp = POW_18
        for (const _x of x) {
            tmp = tmp * _x / D
        }
        D = D * ((N_COINS - 1n) * POW_18 + tmp) / (N_COINS * POW_18)
        if (D > D_prev) diff = D - D_prev
        else diff = D_prev - D
        if (diff <= 1 || (diff * POW_18 < D))
            return D
    }
}

const newton_D = (ANN, gamma, x_unsorted) => {


    if (!(ANN > MIN_A - 1n && ANN < MAX_A + 1n)) throw new Error('Parameter is not a number!');
    if (!(gamma > MIN_GAMMA - 1n && gamma < MAX_GAMMA + 1n)) throw new Error('Parameter is not a number!');

    let x = x_unsorted.sort((a, b) => Number(b - a))



    // if (!(x[0] > 10 ** 9 - 1 && x[0] < 10 ** 15 * 10 ** 18 + 1)) throw new Error('Parameter is not a number!');


    let D = N_COINS * _geometric_mean(x, false)
    let S = 0n
    for (const x_i of x) {
        S += x_i
    }

    for (let i = 0; i < 255; i++) {
        let D_prev = D
        let K0 = POW_18
        for (const _x of x) {
            K0 = K0 * _x * N_COINS / D
        }

        let _g1k0 = gamma + POW_18
        if (_g1k0 > K0) _g1k0 = _g1k0 - K0 + 1n
        else _g1k0 = K0 - _g1k0 + 1n

        let mul1 = POW_18 * D / gamma * _g1k0 / gamma * _g1k0 * A_MULTIPLIER / ANN


        let mul2 = 2n * POW_18 * N_COINS * K0 / _g1k0

        let neg_fprime = (S + S * mul2 / POW_18) + mul1 * N_COINS / K0 - mul2 * D / POW_18


        let D_plus = D * (neg_fprime + S) / neg_fprime
        let D_minus = D * D / neg_fprime

        if (POW_18 > K0) D_minus += D * (mul1 / neg_fprime) / POW_18 * (POW_18 - K0) / K0
        else D_minus -= D * (mul1 / neg_fprime) / POW_18 * (K0 - POW_18) / K0

        if (D_plus > D_minus) D = D_plus - D_minus
        else D = (D_minus - D_plus) / 2n

        let diff = 0
        if (D > D_prev) diff = D - D_prev
        else diff = D_prev - D
        if (diff * BigInt(10 ** 14) < maxBigInt(BigInt(10 ** 16), D)) {
            for (const _x of x) {
                let frac = _x * POW_18 / D
                if (!((frac > BigInt(10 ** 16 - 1)) && (frac < BigInt(10 ** 20 + 1)))) throw new Error('Parameter is not a number!');
            }
            return D
        }

    }

}


const newton_y = (ANN, gamma, x, D, i) => {
    if (!(ANN > MIN_A - 1n && ANN < MAX_A + 1n)) throw new Error('Parameter is not a number!');
    if (!(gamma > MIN_GAMMA - 1n && gamma < MAX_GAMMA + 1n)) throw new Error('Parameter is not a number!');
    if (!(D > BigInt(10 ** 17 - 1) && D < BigInt(10 ** 15 * 10 ** 18 + 1))) throw new Error('Parameter is not a number!');

    for (let k = 0; k < 3; k++) {
        if (k != i) {
            let frac = x[k] * POW_18 / D
            if (!((frac > BigInt(10 ** 16 - 1)) && (frac < BigInt(10 ** 20 + 1)))) throw new Error('Parameter is not a number!');
        }
    }

    let y = D / N_COINS
    let K0_i = POW_18
    let S_i = 0n

    let x_sorted = x.map(item => item)
    x_sorted[i] = 0n
    x_sorted = x_sorted.sort((a, b) => Number(b - a))

    let convergence_limit = maxBigInt(x_sorted[0] / BigInt(10 ** 14), D / BigInt(10 ** 14), 100n)

    for (let j = 2; j < Number(N_COINS) + 1; j++) {
        let _x = x_sorted[Number(N_COINS) - j]
        y = y * D / (_x * N_COINS)
        S_i += _x
    }


    for (let j = 0; j < Number(N_COINS) - 1; j++) {
        K0_i = K0_i * x_sorted[j] * N_COINS / D
    }

    for (let j = 0; j < 255; j++) {
        let y_prev = y

        let K0 = K0_i * y * N_COINS / D
        let S = S_i + y

        let _g1k0 = gamma + POW_18
        if (_g1k0 > K0) _g1k0 = _g1k0 - K0 + 1n
        else _g1k0 = K0 - _g1k0 + 1n


        let mul1 = POW_18 * D / gamma * _g1k0 / gamma * _g1k0 * A_MULTIPLIER / ANN


        let mul2 = POW_18 + (2n * POW_18) * K0 / _g1k0

        let yfprime = POW_18 * y + S * mul2 + mul1
        let _dyfprime = D * mul2
        if (yfprime < _dyfprime) {
            y = y_prev / 2n
            continue
        }
        else yfprime -= _dyfprime
        let fprime = yfprime / y

        let y_minus = mul1 / fprime
        let y_plus = (yfprime + POW_18 * D) / fprime + y_minus * POW_18 / K0
        y_minus += POW_18 * S / fprime

        if (y_plus < y_minus)
            y = y_prev / 2n
        else
            y = y_plus - y_minus

        let diff = 0n
        if (y > y_prev) diff = y - y_prev
        else diff = y_prev - y
        if (diff < maxBigInt(convergence_limit, y / BigInt(10 ** 14))) {
            let frac = y * POW_18 / D
            if (!((frac > BigInt(10 ** 16 - 1)) && (frac < BigInt(10 ** 20 + 1)))) throw new Error('Parameter is not a number!');
            return y
        }
    }
}


const reduction_coefficient = (x, fee_gamma) => {
    let S = x.reduce((a, b) => a + b, 0n)
    let K = x.reduce((a, b) => a * N_COINS * b / S, POW_18)
    if (fee_gamma > 0) K = fee_gamma * POW_18 / (fee_gamma + POW_18 - K)
    return K
}

const fee_calc = (xp, fee_gamma, mid_fee, out_fee) => {
    const f = reduction_coefficient(xp, fee_gamma)
    return (mid_fee * f + out_fee * (POW_18 - f)) / POW_18
}




const get_dy = (i, j, dx, priceScale, balances, A, gamma, D) => {

    if (!(i != j && i < BigInt(N_COINS) && j < BigInt(N_COINS))) throw new Error('Parameter is not a number!');
    if (!(dx > 0n)) throw new Error('Parameter is not a number!');

    let precisions = PRECISIONS

    let price_scale = priceScale.map(item => BigInt(item))

    let xp = balances.map(item => BigInt(item))
    xp[i] += dx
    xp[0] *= precisions[0]

    for (let k = 0; k < Number(N_COINS) - 1; k++) {
        xp[k + 1] = xp[k + 1] * price_scale[k] * precisions[k + 1] / PRECISION
    }
    let y = newton_y(A, gamma, xp, D, j)
    let dy = xp[j] - y - 1n
    xp[j] = y
    if (j > 0) dy = dy * PRECISION / price_scale[j - 1]
    dy /= precisions[j]
    dy -= fee_calc(xp, 500000000000000n, 3000000n, 30000000n) * dy / BigInt(10 ** 10)
    return dy
}

export const calcAmountOutCurvev2 = (amountIn, reserve, otherParam) => {
    const { A, D, priceScale, decimals, gamma, i, j } = otherParam
    const amountInConvertBigInt = BigInt(Math.floor(amountIn / (10 ** 36) * 10 ** decimals[i]))
    const amountOut = get_dy(i, j, amountInConvertBigInt, priceScale, reserve, A, gamma, BigInt(D))
    return Number(amountOut) * 10 ** (36 - decimals[j])
}



export const getDataPoolCurveV2 = async () => {
    const dataApi = await fetch('https://api.curve.fi/api/getPools/ethereum/crypto')
        .then((response) => response.json())
        .then(res => res.data.poolData)



    const data = dataApi.map(item => {
        return {
            ...item,
            assetTypeName: "crypto"
        }
    })

    return data

}


export const getAddressPoolCurveV2noFac = async (DataTokenA, DataTokenB, listDataPool) => {
    if (DataTokenA.address.toUpperCase() === DataTokenB.address.toUpperCase()) return []

    const listPoolforPair = listDataPool.filter(item => {
        const upperCaseItem = item.coinsAddresses.map(item => item.toUpperCase())
        return upperCaseItem.includes(DataTokenA.address.toUpperCase()) &&
            upperCaseItem.includes(DataTokenB.address.toUpperCase())
    })
        .filter(item => item.assetTypeName === 'crypto')
        .map(item => {
            return {
                ...item,
                type: POOL_TYPE.curveV2,
                name: item.name ? item.name : "noName",
                A: BigInt(item.amplificationCoefficient)
            }
        })
    return listPoolforPair
}

export const getAddressPoolCurveV2 = async (TokenA, TokenB) => {
    try{

    const FACTORY_ADDRESS_CURVE_V2 = [{ factory: "0xF18056Bbd320E96A48e3Fbf8bC061322531aac99", name: "curveV2 factory" }]

    const arrAddressPool = await Promise.all(
        FACTORY_ADDRESS_CURVE_V2.map(async (item) => {
            const contract = new web3.eth.Contract(
                ABI.FACTORY_CURVE_V2,
                item.factory
            );
            return await contract.methods.find_pool_for_coins(TokenA.address, TokenB.address).call().then(res => {
                return {
                    namePool: item.name,
                    address: res,
                }
            })
        })
    )
    let resultArr = arrAddressPool.filter(item => parseInt(item.address, 16) !== 0).map(item => { return { ...item, type: POOL_TYPE.curveV2Fac } })
    return resultArr
    }
    catch(err){
        return []
    }
}

export const getReservePoolCurveV2 = async (address, coins) => {
    const contract = new web3.eth.Contract(
        ABI.POOL_CURVE_V2,
        address
    );
    const priceScaleStart = new Array(coins.length - 1).fill(0)

    const priceScale = await Promise.all(priceScaleStart.map(async (item, index) => {
        const itemPriceScale = await contract.methods.price_scale(index).call()

        return itemPriceScale
    }))

    const balances = await Promise.all(coins.map(async (item, index) => {
        return await contract.methods.balances(index).call()
    }))
        .then(res => res)
        .catch(res => {
            return coins.map(item => 0)
        })

    const gamma = await contract.methods.gamma().call()

    const D = await contract.methods.D().call()

    return {
        reserve: balances,
        priceScale: priceScale,
        gamma: BigInt(gamma),
        D: BigInt(D)
    }
}

export const getReservePoolCurveV2Fac = async (address, coins) => {
    const contract = new web3.eth.Contract(
        ABI.POOL_CURVE_V2_FAC,
        address
    );
    const priceScaleStart = new Array(coins.length - 1).fill(0)

    const priceScale = await Promise.all(priceScaleStart.map(async (item, index) => {
        const itemPriceScale = await contract.methods.price_scale().call()

        return itemPriceScale
    }))

    const balances = await Promise.all(coins.map(async (item, index) => {
        return await contract.methods.balances(index).call()
    }))
        .then(res => res)
        .catch(res => {
            return coins.map(item => 0)
        })

    const gamma = await contract.methods.gamma().call()

    const D = await contract.methods.D().call()

    return {
        reserve: balances,
        priceScale: priceScale,
        gamma: BigInt(gamma),
        D: BigInt(D)
    }
}

export const calculateAmountTradedCurveV2 = (priceImpactEst, dataPool) => {
    const { i, j, coins, reserve, rate, address, decimals } = dataPool
    let cantren = reserve[j] * 10 ** (36 - decimals[j]) / rate
    let canduoi = 0.01 * 10 ** 36

    let isLoop = true
    let index = 0


    while (isLoop) {
        index++
        if (index === 100) return 0
        const amountIn = (cantren + canduoi) / 2

        const amountOut = calcAmountOutCurvev2(amountIn, reserve, dataPool)
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

export const calcRateCurveV2 = (info, i, j) => {
    const AMOUNT_CALC_RATE = 0.001
    const { reserve, A, fee, decimals, D, priceScale, gamma } = info

    const otherParam = {
        i: j,
        j: i,
        A, fee, decimals, D, priceScale, gamma
    }
    const amountIn = AMOUNT_CALC_RATE * 10 ** 36
    const amountOut = calcAmountOutCurvev2(amountIn, reserve, otherParam)

    const rate = amountIn / Number(amountOut)

    return rate
}