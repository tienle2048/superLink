import { POOL_TYPE } from './constants'
import { calcAmountOutCurvev1, calcRateCurveV1, calculateAmountTradedCurveV1, getReservePoolCurveV1 } from './curveV1'
import { calcAmountOutCurvev2, calcRateCurveV2, calculateAmountTradedCurveV2, getReservePoolCurveV2, getReservePoolCurveV2Fac } from './curveV2'
import { findAllRoute } from './router'
import { calcAmountOutUniV2, calculateAmountTradedUniV2, getReservePoolUniV2 } from './uniV2'
import { calcAmountOutUniV3, getReservePoolUniV3 } from './uniV3'

const { uniqBy, add, xorBy, intersection, intersectionBy } = require('lodash')

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


const calculateAmountTraded = (priceImpactEst, dataPool) => {

    switch (dataPool.type) {
        case POOL_TYPE.uniV2:
            return calculateAmountTradedUniV2(priceImpactEst, dataPool)
        case POOL_TYPE.curveV1:
            return calculateAmountTradedCurveV1(priceImpactEst / 2, dataPool)
        case POOL_TYPE.uniV3:
            return 0
        case POOL_TYPE.curveV2:
            return calculateAmountTradedCurveV2(priceImpactEst / 2, dataPool)
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


    const okla = route.map(item => {
        const amountInPerPool = item.splicePercent * amountIn


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

        if (item.type === POOL_TYPE.curveV1) localStorage.setItem('okla', JSON.stringify(item));


        const amountOutPerPool = calculateAmountOut(amountInPerPool, item.type, item.reserve, otherParam)

        return {
            ...item,
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

const getDataRoute = async (routeInput) => {
    const routeOutput = await Promise.all(routeInput.map(async item => {
        const route = await Promise.all(item.route.map(async routeItem => {
            const subRoute1 = await Promise.all(routeItem.subRoute.map(async it => {
                const coins = it.coins ? it.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const detail = await getDetailPool(it.address, it.type, coins)
                return {
                    ...it,
                    ...detail,
                    i: i,
                    j: j,
                    coins: coins
                }
            }))
            return {
                subRoute: subRoute1,
                namePair: routeItem.namePair,
                coins: routeItem.coins,
            }
        }))

        return {
            route: route
        }
    }))

    return routeOutput
}

const addPoolMultiToken = (routeInput, queuePoolCurveV1) => {
    const queuePoolCurveV1Fake = [...queuePoolCurveV1]
    const routeOutput = routeInput.map(item => {
        const addCurveV1 = item.route.map(routeItem => {
            const okla = queuePoolCurveV1Fake.filter(item => {
                
                const addressCoins = item.coinsAddresses.map(item => item.toUpperCase())
                const addressCoinsRoute = routeItem.coins.map(item => item.address.toUpperCase())
                const okla = intersection(addressCoins, addressCoinsRoute)
                
                const isSwapStableCoin = okla.length === 2
                return isSwapStableCoin
            }).map(item => {
                const coins = item.coins ? item.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const rate = calcRateCurve(item, i, j)
                return {
                    ...item,
                    i: i,
                    j: j,
                    rate,
                }
            })
            return okla

        })
        console.log(addCurveV1)

        const routeHaveCurveV1 = item.route.map((routeItem, index) => {
            let poolCurveV1 = []
            if (true) {
                poolCurveV1 = intersectionBy(addCurveV1[index], queuePoolCurveV1, 'id')
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
            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            route: routeHaveCurveV1,
        }
    })

    return routeOutput
}

const setAmountTradedEst = (routeInput, priceImpactEst) => {
    const routeOutput = routeInput.map(item => {

        const priceImpact = item.route.length === 1 ? priceImpactEst : 1 - Math.sqrt(1 - priceImpactEst)


        const route = item.route.map(routeItem => {
            const newSubRoute = routeItem.subRoute.map(it => {
                const amountTradedEst = calculateAmountTraded(priceImpact, it)
                return {
                    ...it,
                    amountTradedEst: amountTradedEst,
                    priceImpact
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            ...item,
            route: route,
        }
    })
    return routeOutput
}

const splicePercent = (routeInput) => {
    const routeOutput0 = routeInput.map(item => {
        const route = item.route.map(routeItem => {
            const totalAmountTradedEst = routeItem.subRoute.reduce((a, b) => a + b.amountTradedEst, 0)
            const newSubRoute = routeItem.subRoute.map(it => {
                return {
                    ...it,
                    splicePercent: it.amountTradedEst / totalAmountTradedEst,
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
                totalAmountTradedEst
            }
        })

        const amountTradedEst = route.reduce((a, b) => a < b.totalAmountTradedEst ? a : b.totalAmountTradedEst, route[0].totalAmountTradedEst)

        return {
            ...item,
            route: route,
            amountTradedEst
        }
    })

    const totalAmountTradedEst = routeOutput0.reduce((a, b) => a + b.amountTradedEst, 0)

    const routeOutput = routeOutput0.map(item => {

        return {
            ...item,
            splicePercent: item.amountTradedEst / totalAmountTradedEst
        }
    })

    return routeOutput
}


const filterSmallPool = (routeInput, minPercent) => {
    const filterPath = routeInput.filter(item => item.splicePercent > minPercent)

    const routeOutput = filterPath.map(item => {
        const route = item.route.map(routeItem => {

            const newSubRoute = routeItem.subRoute.filter(item => item.splicePercent > minPercent)
            return {
                ...routeItem,
                subRoute: newSubRoute
            }
        })
        return {
            ...item,
            route: route
        }
    })
    return routeOutput
}

const calcAmountOutRoute = (routeInput, amountIn) => {
    const resultRoute = routeInput.map(item => {
        let amountIn1 = item.splicePercent * amountIn

        let okla
        const routeItem = item.route

        for (let index = 0; index < routeItem.length; index++) {
            if (index !== 0) okla = routeItem[index - 1].amountOut
            else okla = amountIn1

            const [amountOut, route] = spliceAndCalculateOutput(okla, routeItem[index].subRoute)
            routeItem[index].subRoute = route
            routeItem[index].amountIn = okla
            routeItem[index].amountOut = amountOut
        }

        const amountOut = routeItem[routeItem.length - 1].amountOut
        return {
            ...item,
            route: routeItem,
            amountIn: amountIn1,
            amountOut: amountOut
        }
    })

    return resultRoute
}

const sortRoute = (routeInput) => {
    const sortLogic = (a, b) => {
        const lengthRouteA = a.route.length
        const lengthRouteB = b.route.length

        const splicePercentA = a.splicePercent
        const splicePercentB = b.splicePercent

        return ((10 - lengthRouteB) * 100 + splicePercentB) - ((10 - lengthRouteA) * 100 + splicePercentA)

    }

    const routeOutput = routeInput.sort(sortLogic)
    return routeOutput
}



const maxAmountOut = (routeInput) => {
    const resultRoute = routeInput.map(item => {
        const routeItemLength = item.route.length

        const maxAmountOut = item.route[routeItemLength - 1].subRoute.reduce((a, b) => a + b.reserve[b.j], 0)
        console.log("🚀 ~ file: index.js:368 ~ resultRoute ~ maxAmountOut:", maxAmountOut)

    })

    return resultRoute
}



export const main = async (tokenA, tokenB, amount = 10000000, chain, callback) => {

    const allRouter = await findAllRoute(tokenA, tokenB, chain, listPoolCurveV1)
    console.log("🚀 ~ file: index.js:380 ~ main ~ listPoolCurveV1:", listPoolCurveV1)

    let queuePoolCurve = await Promise.all(uniqBy(listPoolCurveV1, 'id').map(async it => {
        const detail = await getDetailPool(it.address, it.type, it.coins)
        return {
            ...it,
            ...detail
        }
    }))
    console.log("🚀 ~ file: index.js:382 ~ queuePoolCurve ~ queuePoolCurve:", queuePoolCurve)

    const routeHaveData = await getDataRoute(allRouter)



    const routeHaveTradeEst = setAmountTradedEst(routeHaveData, 0.01)

    const routeHavePercent = splicePercent(routeHaveTradeEst)

    const sortRouteByPercent = sortRoute(routeHavePercent)

    const routeHavePoolMultiToken = addPoolMultiToken(sortRouteByPercent, queuePoolCurve)

    const routeHaveTradeEstLan2 = setAmountTradedEst(routeHavePoolMultiToken, 0.01)

    const routeHavePercentLan2 = splicePercent(routeHaveTradeEstLan2)

    //const filterRoute = filterSmallPool(routeHavePercentLan2, 0.02)

    let maxOut = [0, 0, 0]

    for (let i = 1; i < 200; i++) {

        const routeHaveTradeEst = setAmountTradedEst(routeHavePercentLan2, 0.005 * i)

        const routeHavePercent1 = splicePercent(routeHaveTradeEst)
        //console.log("🚀 ~ file: index.js:411 ~ main ~ routeHavePercent1:", routeHavePercent1)

       const filterRoute1 = filterSmallPool(routeHavePercent1, 0.01)

       const ecec1 = splicePercent(filterRoute1)

        const okla = calcAmountOutRoute(ecec1, amount)
        const out = okla.reduce((a, b) => a + b.amountOut, 0) / (10 ** 36)
        const amountIn = okla.reduce((a, b) => a + b.amountIn, 0) / (10 ** 36)

        if (maxOut[0] < out) {
            maxOut[0] = out
            maxOut[1] = 0.005 * i
            maxOut[2] = okla
        }
        //console.log(okla,out , amountIn,0.01 * i)

        /* setTimeout(()=>{
            
        },[i*500])
     */

    }
    callback(maxOut[2], maxOut[0])
    console.log(maxOut)

    const ecec = maxAmountOut(maxOut[2])
}




