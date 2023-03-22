import { tokenTrungGian } from "./constants"
import { getAddressPoolCurveV1, getDataPoolCurveV1 } from "./curveV1"
import { getAddressPoolCurveV2, getAddressPoolCurveV2noFac, getDataPoolCurveV2 } from "./curveV2"
import { getAddressPoolUniV2 } from "./uniV2"
import { getAddressPoolUniv3 } from "./uniV3"

const getListAddressPool = async (addressTokenA, addressTokenB, chain, listPoolCurveV1, listDataPool) => {


    const arrAddressPoolUniV2 = await getAddressPoolUniV2(addressTokenA, addressTokenB, chain)


    const arrAddressPoolCurveV1 = await getAddressPoolCurveV1(addressTokenA, addressTokenB, listDataPool, chain)


    const arrAddressPoolCurveV2noFac = await getAddressPoolCurveV2noFac(addressTokenA, addressTokenB, listDataPool, chain)


    const arrAddressPoolCurveV2 = await getAddressPoolCurveV2(addressTokenA, addressTokenB, chain)


    const arrAddressPoolUniV3 = []// await getAddressPoolUniv3(addressTokenA, addressTokenB,chain)

    listPoolCurveV1.push(...arrAddressPoolCurveV1, ...arrAddressPoolCurveV2noFac)
    const resultArr = [...arrAddressPoolUniV2, ...arrAddressPoolUniV3, ...arrAddressPoolCurveV2]//,...arrAddressPoolCurveV2]
    return resultArr
}

const getPoolApi = async () => {
    const listPoolCurveV1okla = await getDataPoolCurveV1()
    const listPoolCurveV2 = await getDataPoolCurveV2()

    return [...listPoolCurveV1okla, ...listPoolCurveV2]
}

export const findAllRoute = async (tokenA, tokenB, chain, listPoolCurveV1) => {
    

    let listDataPool =[]// await getPoolApi()
    

    let allRoute = []
    /*  await Promise.all(tokenTrungGian.map(async itemC => {
 
         tokenTrungGian.map(async itemD => {
 
             if (itemC.address === tokenA.address || itemD.address === tokenB.address || itemC.address === itemD.address) return {}
             if (itemC.address.toUpperCase() === tokenB.address.toUpperCase() || itemD.address.toUpperCase() === tokenA.address.toUpperCase()) return {}
             const AtoC = await getListAddressPool(tokenA, itemC)
             if (AtoC.length === 0) return {}
             const CtoD = await getListAddressPool(itemC, itemD)
             if (CtoD.length === 0) return {}
             const DtoB = await getListAddressPool(itemD, tokenB)
             if (DtoB.length === 0) return {}
             allRoute.push({
                 route: [
                     {
                         subRoute: AtoC,
                         namePair: `${tokenA.symbol} ---> ${itemC.symbol}`,
                         token0: tokenA.address,
                         token1: itemC.address,
                         coins: [tokenA, itemC]
                     },
                     {
                         subRoute: CtoD,
                         namePair: `${itemC.symbol} ---> ${itemD.symbol}`,
                         token0: itemC.address,
                         token1: itemD.address,
                         coins: [itemC, itemD]
                     },
                     {
                         subRoute: DtoB,
                         namePair: `${itemD.symbol} ---> ${tokenB.symbol}`,
                         token0: itemD.address,
                         token1: tokenB.address,
                         coins: [itemD, tokenB]
                     },
 
                 ]
             })
             return {}
         })
     })) */
    const AtoB = await getListAddressPool(tokenA, tokenB, chain, listPoolCurveV1, listDataPool)
    allRoute.push({
        route: [
            {
                subRoute: AtoB,
                namePair: `${tokenA.symbol} ---> ${tokenB.symbol}`,
                coins: [tokenA, tokenB]
            },
        ]
    })

    await Promise.all(tokenTrungGian.map(async item => {

        if (item.address === tokenA.address || item.address === tokenB.address) return {}
        const AtoC = await getListAddressPool(tokenA, item, chain, listPoolCurveV1, listDataPool)
        if (AtoC.length === 0) return {}
        const CtoB = await getListAddressPool(item, tokenB, chain, listPoolCurveV1, listDataPool)
        if (CtoB.length === 0) return {}

        allRoute.push({
            route: [
                {
                    subRoute: AtoC,
                    namePair: `${tokenA.symbol} ---> ${item.symbol}`,
                    coins: [tokenA, item]
                },
                {
                    subRoute: CtoB,
                    namePair: `${item.symbol} ---> ${tokenB.symbol}`,
                    coins: [item, tokenB]
                },

            ],

        })
        return {}
    }))

    return allRoute
}