import { POOL_TYPE } from './constants'
import { calcAmountOutCurvev1, calculateAmountTradedCurveV1, getReservePoolCurveV1 } from './curveV1'
import { calcAmountOutCurvev2, getReservePoolCurveV2 } from './curveV2'
import { findAllRoute } from './router'
import { calcAmountOutUniV2, calculateAmountTradedUniV2, getReservePoolUniV2 } from './uniV2'
import { calcAmountOutUniV3, getReservePoolUniV3 } from './uniV3'

const { uniqBy, add, xorBy } = require('lodash')

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
            case POOL_TYPE.uniV3:
                return await getReservePoolUniV3(address, coins)
            default:
                return []
        }
    }
    catch (err) {
        console.log(address)
    }
}


const calculateAmountTraded = (priceImpactEst, type, dataPool, coins, indexTokenCurve) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return calculateAmountTradedUniV2(priceImpactEst, dataPool, coins)
        case POOL_TYPE.curveV1:
            return calculateAmountTradedCurveV1(priceImpactEst, dataPool, coins, indexTokenCurve)
        case POOL_TYPE.uniV3:
            return 1
        case POOL_TYPE.curveV2:
            return 1
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
        case POOL_TYPE.uniV3:
            return calcAmountOutUniV3(amountIn, reserve, otherParam)
        case POOL_TYPE.curveV2:
            return calcAmountOutCurvev2(amountIn, reserve, otherParam)
        default:
            return 0
    }
}

const spliceAndCalculateOutput = (amountIn, route) => {
    const poolCurve = route.filter(item => item.type === POOL_TYPE.curveV1).reduce((a, b) => a + b.amountTradedEst, 0)

    const totalUniV2 = route.filter(item => item.type === POOL_TYPE.uniV2).reduce((a, b) => a + b.amountTradedEst, 0)
    const totalCurve = route.filter(item => item.type === POOL_TYPE.curveV1).reduce((a, b) => a + b.amountTradedEst, 0)

    const phandu = amountIn - poolCurve
    let phantramCurve
    let phantramV2
    if (phandu < 0) {
        phantramCurve = 1
    }
    else {
        phantramCurve = poolCurve / amountIn
        phantramV2 = 1 - phantramCurve
    }

    const okla = route.map(item => {

        const ecec = item.type === POOL_TYPE.uniV2 ? phantramV2 : phantramCurve

        const ecec1 = item.type === POOL_TYPE.uniV2 ? totalUniV2 : totalCurve

        const splicePercent = ecec * item.amountTradedEst / ecec1

        const amountInPerPool = splicePercent * amountIn

        const otherParam = {
            i: 0,
            j: 2,
            A:item?.A,
            fee: item?.fee,
            coins: item.coins,
            D: item?.D,
            priceScale: item?.priceScale,
            gamma: item?.gamma,

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




export const main = async (tokenA, tokenB, amount = 10000000, chain) => {

    const allRouter = await findAllRoute(tokenA, tokenB, chain, listPoolCurveV1)

    let queuePoolCurveV1 = await Promise.all(uniqBy(listPoolCurveV1, 'id').map(async it => {
        const detail = await getDetailPool(it.address, it.type, it.coins)
        return {
            ...it,
            ...detail
        }
    }))

    const RoutePoolDetail = await Promise.all(allRouter.map(async item => {
        const route = await Promise.all(item.route.map(async routeItem => {
            const subRoute1 = await Promise.all(routeItem.subRoute.map(async it => {
                const coins = it.coins ? it.coins : routeItem.coins


                const indexCurve = getIndexTokenCurve(coins, routeItem.coins[1].address)
                const detail = await getDetailPool(it.address, it.type, coins)
                const amountTradedEst = calculateAmountTraded(0.3, it.type, detail.reserve, coins, indexCurve)
                return {
                    ...it,
                    ...detail,
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
                const listIsSwapStableCoin = routeItem.coins.map(it => item.coinsAddresses.map(addressItem => addressItem.toUpperCase()).includes(it.address.toUpperCase()))
                const isSwapStableCoin = listIsSwapStableCoin.reduce((a, b) => a && b, true)
                return isSwapStableCoin
            }).map(item => {
                const indexCurve = getIndexTokenCurve(item.coins, routeItem.coins[1].address)
                const amountTradedEst = calculateAmountTraded(0.3, item.type, item.reserve, item.coins, indexCurve)
                return {
                    ...item,
                    amountTradedEst: amountTradedEst
                }
            })
            return okla

        })

        const isRoute2Token = route.length === 1

        const routeHaveCurveV1 = route.map((routeItem, index) => {
            let poolCurveV1 = []
            if (isRoute2Token) {
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

    console.log(queuePoolCurveV1)

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




