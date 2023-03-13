import { POOL_TYPE } from './constants'
import { calcAmountOutCurvev1, calcRateCurveV1, calculateAmountTradedCurveV1, getReservePoolCurveV1 } from './curveV1'
import { calcAmountOutCurvev2, calcRateCurveV2, calculateAmountTradedCurveV2, getReservePoolCurveV2, getReservePoolCurveV2Fac } from './curveV2'
import { findAllRoute } from './router'
import { calcAmountOutUniV2, calculateAmountTradedUniV2, getReservePoolUniV2 } from './uniV2'
import { calcAmountOutUniV3, getReservePoolUniV3 } from './uniV3'

const { uniqBy, add, xorBy, intersection } = require('lodash')

const listPoolCurveV1 = []



const getDetailPool = async (address, type, coins) => {
    try {
        switch (type) {
            case POOL_TYPE.uniV2:
                return await getReservePoolUniV2(address, coins)
            case POOL_TYPE.curveV1:
                return await getReservePoolCurveV1(address, coins)
            case POOL_TYPE.curveV2:
                return await getReservePoolCurveV2(address, coins)
            case POOL_TYPE.curveV2Fac:
                return await getReservePoolCurveV2Fac(address, coins)
            case POOL_TYPE.uniV3:
                return await getReservePoolUniV3(address, coins)
            default:
                return []
        }
    }
    catch (err) {
        console.log(err)
        console.log(address, type, coins)
    }
}


const calculateAmountTraded = (priceImpactEst, type, dataPool, coins, indexTokenCurve) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return calculateAmountTradedUniV2(priceImpactEst, dataPool, coins)
        case POOL_TYPE.curveV1:
            return calculateAmountTradedCurveV1(priceImpactEst, dataPool, coins, indexTokenCurve)
        case POOL_TYPE.uniV3:
            return 0
        case POOL_TYPE.curveV2:
            return calculateAmountTradedCurveV2(priceImpactEst, dataPool, coins, indexTokenCurve)
        default:
            return 0
    }
}

const calcRateCurve = (info, i, j) => {
    switch (info.type) {
        case POOL_TYPE.curveV1:
            return calcRateCurveV1(info, i, j)
        case POOL_TYPE.curveV2:
            return calcRateCurveV2(info, i, j)
        default:
            return 0
    }
}

const getIndexTokenCurve = (coins, address) => {
    const index = coins.findIndex(item => item.address.toUpperCase() === address.toUpperCase())
    return index
}

const calculateAmountOut = (amountIn, type, reserve, otherParam) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return calcAmountOutUniV2(amountIn, reserve[0], reserve[1])
        case POOL_TYPE.curveV1:
            return calcAmountOutCurvev1(amountIn, reserve, otherParam)
        /* case POOL_TYPE.uniV3:
            return calcAmountOutUniV3(amountIn, reserve, otherParam) */
        case POOL_TYPE.curveV2:
            return calcAmountOutCurvev2(amountIn, reserve, otherParam)
        default:
            return 0
    }
}

const spliceAndCalculateOutput = (amountIn, route) => {
    const poolCurve = route.reduce((a, b) => a + b.amountTradedEst, 0)

    const okla = route.map(item => {

        const splicePercent = item.amountTradedEst / poolCurve

        const amountInPerPool = item.amountTradedEst * amountIn / poolCurve

        const otherParam = {
            i: item?.i,
            j: item?.j,
            A: item?.A,
            fee: item?.fee,
            coins: item.coins,
            D: item?.D,
            priceScale: item?.priceScale,
            gamma: item?.gamma,
            decimals: item?.decimals
        }

        const amountOutPerPool = calculateAmountOut(amountInPerPool, item.type, item.reserve, otherParam)
        return {
            ...item,
            splicePercent: splicePercent,
            amountIn: amountInPerPool,
            amountOut: amountOutPerPool

        }
    })

    const totalAmountOut = okla.reduce((total, item) => total + (item.amountOut ? item.amountOut : 0), 0)

    return [totalAmountOut, okla]
}


const getIndexPoolCurve = (coins, coinsRoute) => {
    const addressCoins = coins.map(item => item.address.toUpperCase())
    const addressCoinsRoute = coinsRoute.map(item => item.address.toUpperCase())
    const i = addressCoins.indexOf(addressCoinsRoute[0].toUpperCase())
    const j = addressCoins.indexOf(addressCoinsRoute[1].toUpperCase())
    return {
        i, j
    }
}



export const main = async (tokenA, tokenB, amount = 10000000, chain) => {

    const allRouter = await findAllRoute(tokenA, tokenB, chain, listPoolCurveV1)
    console.log("🚀 ~ file: index.js:136 ~ main ~ listPoolCurveV1:", listPoolCurveV1)



    let queuePoolCurveV1 = await Promise.all(uniqBy(listPoolCurveV1, 'id').map(async it => {
        const detail = await getDetailPool(it.address, it.type, it.coins)
        return {
            ...it,
            ...detail
        }
    }))
    console.log("🚀 ~ file: index.js:146 ~ queuePoolCurveV1 ~ queuePoolCurveV1:", queuePoolCurveV1)



    const RoutePoolDetail = await Promise.all(allRouter.map(async item => {
        const route = await Promise.all(item.route.map(async routeItem => {
            const subRoute1 = await Promise.all(routeItem.subRoute.map(async it => {
                const coins = it.coins ? it.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const indexCurve = getIndexTokenCurve(coins, routeItem.coins[1].address)
                const detail = await getDetailPool(it.address, it.type, coins)
                console.log("🚀 ~ file: index.js:153 ~ subRoute1 ~ detail:", detail)
                const amountTradedEst = calculateAmountTraded(0.3, it.type, detail.reserve, coins, indexCurve)
                return {
                    ...it,
                    ...detail,
                    i: i,
                    j: j,
                    amountTradedEst: amountTradedEst
                }
            }))
            const totalAmountTradedest = subRoute1.reduce((a, b) => a + b.amountTradedEst, 0)

            return {
                subRoute: subRoute1,
                namePair: routeItem.namePair,
                coins: routeItem.coins,
                totalAmountTradedest: totalAmountTradedest
            }
        }))

        const addCurveV1 = route.map(routeItem => {
            const okla = queuePoolCurveV1.filter(item => {

                const addressCoins = item.coins.map(item => item.address.toUpperCase())
                const addressCoinsRoute = routeItem.coins.map(item => item.address.toUpperCase())
                const okla = intersection(addressCoins, addressCoinsRoute)
                const isSwapStableCoin = okla.length === 2
                return isSwapStableCoin
            }).map(item => {
                const indexCurve = getIndexTokenCurve(item.coins, routeItem.coins[1].address)
                const coins = item.coins ? item.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const rate = calcRateCurve(item, i, j)
                const amountTradedEst = calculateAmountTraded(0.3, item.type, item.reserve, item.coins, indexCurve)
                return {
                    ...item,
                    i: i,
                    j: j,
                    rate,
                    amountTradedEst: amountTradedEst
                }
            })
            return okla

        })


        const isRoute2Token = route.length === 1

        const routeHaveCurveV1 = route.map((routeItem, index) => {

            let poolCurveV1 = []
            if (true) {
                poolCurveV1 = [...addCurveV1[index]]

                const listId = poolCurveV1.map(item => {
                    return {
                        id: item.id
                    }
                })
                queuePoolCurveV1 = xorBy(listId, queuePoolCurveV1, 'id')
            }

            const newSubRoute = [
                ...routeItem.subRoute,
                ...poolCurveV1
            ]
            const totalAmountTradedest = newSubRoute.reduce((a, b) => a + b.amountTradedEst, 0)

            return {
                ...routeItem,
                subRoute: newSubRoute,
                totalAmountTradedest: totalAmountTradedest
            }

        })
        const spliceEst = routeHaveCurveV1.reduce((a, b) => a < b.totalAmountTradedest ? a : b.totalAmountTradedest, routeHaveCurveV1[0].totalAmountTradedest)
        return {
            route: routeHaveCurveV1,
            spliceEst: spliceEst
        }
    }))



    const total = RoutePoolDetail.reduce((a, b) => a + b.spliceEst, 0)

    const resultRoute = RoutePoolDetail.map(item => {
        let amountIn = item.spliceEst / total * amount
        let okla
        const routeItem = item.route

        for (let index = 0; index < routeItem.length; index++) {
            if (index !== 0) okla = routeItem[index - 1].amountOut
            else okla = amountIn
            const [amountOut, route] = spliceAndCalculateOutput(okla, routeItem[index].subRoute)
            routeItem[index].subRoute = route
            routeItem[index].amountIn = okla
            routeItem[index].amountOut = amountOut
        }

        const amountOut = routeItem[routeItem.length - 1].amountOut
        return {
            ...item,
            route: routeItem,
            splicePercent: item.spliceEst / total,
            amountIn: amountIn,
            amountOut: amountOut
        }
    })


    return resultRoute
}




