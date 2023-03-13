import { ABI, LIST_FACTORY_ACCRESS } from "./constants";
import { web3 } from "./web3";

export const getAddressPoolUniV2 = async (TokenA, TokenB) => {
    const arrAddressPool = await Promise.all(
        LIST_FACTORY_ACCRESS.eth.map(async (item) => {
            const contract = new web3.eth.Contract(
                ABI.FACTORY_UNI_V2,
                item.factory
            );
            return await contract.methods.getPair(TokenA.address, TokenB.address).call().then(res => {
                return {
                    namePool: item.name,
                    address: res,
                }
            })
        })
    )
    let resultArr = arrAddressPool.filter(item => parseInt(item.address, 16) !== 0).map(item => { return { ...item, type: "uniV2" } })
    return resultArr
}

export const getReservePoolUniV2 = async (address, coins) => {
    const contract = new web3.eth.Contract(
        ABI.POOL_UNI_V2,
        address
    );
    const token0 = await contract.methods.token0().call()
    const detailPool = await contract.methods.getReserves().call()

    let { _reserve0, _reserve1 } = detailPool

    if (token0 !== coins[0].address) {
        [_reserve0, _reserve1] = [_reserve1, _reserve0]
    }
    const [decimal0, decimal1] = [10 ** (36 - coins[0].decimals), 10 ** (36 - coins[1].decimals)]

    const data = {
        rate: (_reserve1 * decimal1) / (_reserve0 * decimal0),
        reserve: [_reserve0 * decimal0, _reserve1 * decimal1]
    }

    return data
}

export const calculateAmountTradedUniV2 = (priceImpactEst, dataPool, coins) => {

    const _reserve0 = dataPool[0]
    const amountTraded = (_reserve0 * priceImpactEst) / ((1 - priceImpactEst) * (1 - 0.0025))

    return amountTraded * coins[0].usdPrice
}

export const calcAmountOutUniV2 = (amountIn, reserveIn, reserveOut) => {
    const amountInWithFee = amountIn * 0.9975
    const numerator = amountInWithFee * reserveOut
    const denominator = reserveIn + amountIn
    return numerator / denominator
}