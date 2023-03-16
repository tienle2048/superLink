import { ABI, POOL_TYPE } from "./constants";
import { web3 } from "./web3";

export const getAddressPoolUniv3 = async (addressA, addressB) => {

    const FACTORY_ADDRESS_UNIV3 = [{ factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984", name: "UniSwapV3" }]

    const FEE = [100, 500, 3000, 10000]

    const arrAddressPool = await Promise.all(
        FACTORY_ADDRESS_UNIV3.map(async (item) => {
            const contract = new web3.eth.Contract(
                ABI.FACTORY_UNI_V3,
                item.factory
            );

            const listAddressPool = await Promise.all(FEE.map(async itemFee => {
                return await contract.methods.getPool(addressA.address, addressB.address, itemFee).call().then(res => {
                    return {
                        namePool: `${item.name} ${itemFee}`,
                        address: res,
                        fee: itemFee
                    }
                })
            }))

            return listAddressPool
        })
    )

    let resultArr = arrAddressPool.flat().filter(item => parseInt(item.address, 16) !== 0).map(item => { return { ...item, type: POOL_TYPE.uniV3 } })


    return resultArr
}

export const getReservePoolUniV3 = async (address, coins) => {
    const contract = new web3.eth.Contract(
        ABI.POOL_UNI_V3,
        address
    );
    const token0 = await contract.methods.token0().call()
    return {
        reserve: [10000000000, 10000000000],
        token0,
        coins
    }
}

export const calcAmountOutUniV3 = async (amountIn, reserve, otherParam) => {

    const { coins, fee } = otherParam
    const addrQuoter = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"
    let constract = new web3.eth.Contract(ABI.QUOTER_UNI_V3, addrQuoter)

    const amountInFake = 10000000

    return await constract.methods.quoteExactInputSingle(
        coins[0].address,
        coins[1].address,
        fee,
        amountInFake,
        0).call()

}