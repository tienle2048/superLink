/*const Web3 = require('web3')
const abiDecoder = require('abi-decoder')

const web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545")


const abi =[{"inputs":[],"name":"get","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"data","type":"string"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// 27233668

const getTransactionsInBlock=async(numberBlock)=>{
    return await web3.eth.getBlock(numberBlock)
    .then(res=>res.transactions);
}

const getLastNumberBlock = async () => {
    return await web3.eth.getBlockNumber()
        .then(res=>res);
}

const getToTransaction=async (tsx)=>{
    return await web3.eth.getTransaction(tsx)
    .then(res=>
        res.input)
}

const main = async ()=>{

    abiDecoder.addABI(abi);

    const okla =await getTransactionsInBlock(27233668)

    const ecec =await Promise.all(okla.map(async item=>{
        const toAddress =await getToTransaction(item)
        const decodedData = abiDecoder.decodeMethod(toAddress);
        return decodedData?.params[0].value
    }))
    

    // const filter = ecec.filter(item=>item==="0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a")

    console.log(ecec)
}
main() */


const Web3 = require('web3')
//const web3 = new Web3("https://nd-568-863-669.p2pify.com/2dfeb3634054cc14d8a64a528431a652")
const web3 = new Web3("https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570")

const POOL_CURVE_V2 = [{ "name": "TokenExchange", "inputs": [{ "type": "address", "name": "buyer", "indexed": true }, { "type": "int128", "name": "sold_id", "indexed": false }, { "type": "uint256", "name": "tokens_sold", "indexed": false }, { "type": "int128", "name": "bought_id", "indexed": false }, { "type": "uint256", "name": "tokens_bought", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "AddLiquidity", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "invariant", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidity", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidityOne", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256", "name": "token_amount", "indexed": false }, { "type": "uint256", "name": "coin_amount", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidityImbalance", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "invariant", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "CommitNewAdmin", "inputs": [{ "type": "uint256", "name": "deadline", "indexed": true }, { "type": "address", "name": "admin", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "NewAdmin", "inputs": [{ "type": "address", "name": "admin", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "CommitNewFee", "inputs": [{ "type": "uint256", "name": "deadline", "indexed": true }, { "type": "uint256", "name": "fee", "indexed": false }, { "type": "uint256", "name": "admin_fee", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "NewFee", "inputs": [{ "type": "uint256", "name": "fee", "indexed": false }, { "type": "uint256", "name": "admin_fee", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RampA", "inputs": [{ "type": "uint256", "name": "old_A", "indexed": false }, { "type": "uint256", "name": "new_A", "indexed": false }, { "type": "uint256", "name": "initial_time", "indexed": false }, { "type": "uint256", "name": "future_time", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "StopRampA", "inputs": [{ "type": "uint256", "name": "A", "indexed": false }, { "type": "uint256", "name": "t", "indexed": false }], "anonymous": false, "type": "event" }, { "outputs": [], "inputs": [{ "type": "address", "name": "_owner" }, { "type": "address[3]", "name": "_coins" }, { "type": "address", "name": "_pool_token" }, { "type": "uint256", "name": "_A" }, { "type": "uint256", "name": "_fee" }, { "type": "uint256", "name": "_admin_fee" }], "stateMutability": "nonpayable", "type": "constructor" }, { "name": "A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 5227 }, { "name": "get_virtual_price", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 1133537 }, { "name": "calc_token_amount", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "amounts" }, { "type": "bool", "name": "deposit" }], "stateMutability": "view", "type": "function", "gas": 4508776 }, { "name": "add_liquidity", "outputs": [], "inputs": [{ "type": "uint256[3]", "name": "amounts" }, { "type": "uint256", "name": "min_mint_amount" }], "stateMutability": "nonpayable", "type": "function", "gas": 6954858 }, { "name": "get_dy", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }], "stateMutability": "view", "type": "function", "gas": 2673791 }, { "name": "get_dy_underlying", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }], "stateMutability": "view", "type": "function", "gas": 2673474 }, { "name": "exchange", "outputs": [], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }, { "type": "uint256", "name": "min_dy" }], "stateMutability": "nonpayable", "type": "function", "gas": 2818066 }, { "name": "remove_liquidity", "outputs": [], "inputs": [{ "type": "uint256", "name": "_amount" }, { "type": "uint256[3]", "name": "min_amounts" }], "stateMutability": "nonpayable", "type": "function", "gas": 192846 }, { "name": "remove_liquidity_imbalance", "outputs": [], "inputs": [{ "type": "uint256[3]", "name": "amounts" }, { "type": "uint256", "name": "max_burn_amount" }], "stateMutability": "nonpayable", "type": "function", "gas": 6951851 }, { "name": "calc_withdraw_one_coin", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }], "stateMutability": "view", "type": "function", "gas": 1102 }, { "name": "remove_liquidity_one_coin", "outputs": [], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }, { "type": "uint256", "name": "min_amount" }], "stateMutability": "nonpayable", "type": "function", "gas": 4025523 }, { "name": "ramp_A", "outputs": [], "inputs": [{ "type": "uint256", "name": "_future_A" }, { "type": "uint256", "name": "_future_time" }], "stateMutability": "nonpayable", "type": "function", "gas": 151919 }, { "name": "stop_ramp_A", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 148637 }, { "name": "commit_new_fee", "outputs": [], "inputs": [{ "type": "uint256", "name": "new_fee" }, { "type": "uint256", "name": "new_admin_fee" }], "stateMutability": "nonpayable", "type": "function", "gas": 110461 }, { "name": "apply_new_fee", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 97242 }, { "name": "revert_new_parameters", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 21895 }, { "name": "commit_transfer_ownership", "outputs": [], "inputs": [{ "type": "address", "name": "_owner" }], "stateMutability": "nonpayable", "type": "function", "gas": 74572 }, { "name": "apply_transfer_ownership", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 60710 }, { "name": "revert_transfer_ownership", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 21985 }, { "name": "admin_balances", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "i" }], "stateMutability": "view", "type": "function", "gas": 3481 }, { "name": "withdraw_admin_fees", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 21502 }, { "name": "donate_admin_fees", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 111389 }, { "name": "kill_me", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 37998 }, { "name": "unkill_me", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 22135 }, { "name": "coins", "outputs": [{ "type": "address", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2220 }, { "name": "balances", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2250 }, { "name": "fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2171 }, { "name": "admin_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2201 }, { "name": "owner", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2231 }, { "name": "initial_A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2261 }, { "name": "future_A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2291 }, { "name": "initial_A_time", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2321 }, { "name": "future_A_time", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2351 }, { "name": "admin_actions_deadline", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2381 }, { "name": "transfer_ownership_deadline", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2411 }, { "name": "future_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2441 }, { "name": "future_admin_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2471 }, { "name": "future_owner", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2501 }]

const calcAmountOutCurvev1 = (amountIn, reserve, otherParam) => {

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


const okla = {"id":"0","address":"0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7","coinsAddresses":["0x6B175474E89094C44Da98b954EedeAC495271d0F","0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0xdAC17F958D2ee523a2206206994597C13D831ec7","0x0000000000000000000000000000000000000000"],"decimals":["18","6","6","0"],"virtualPrice":"1025157413452918271","amplificationCoefficient":2000,"assetType":"0","totalSupply":"378683831046632399217510122","lpTokenAddress":"0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490","name":"Curve.fi DAI/USDC/USDT","symbol":"3Crv","priceOracle":0,"poolUrls":{"swap":["https://curve.fi/#/ethereum/pools/3pool/swap","https://classic.curve.fi/3pool"],"deposit":["https://curve.fi/#/ethereum/pools/3pool/deposit","https://classic.curve.fi/3pool/deposit"],"withdraw":["https://curve.fi/#/ethereum/pools/3pool/withdraw","https://classic.curve.fi/3pool/withdraw"]},"implementation":"","assetTypeName":"usd","coins":[{"address":"0x6B175474E89094C44Da98b954EedeAC495271d0F","usdPrice":0.998707,"decimals":"18","isBasePoolLpToken":false,"symbol":"DAI","poolBalance":"179328730921943547592908400"},{"address":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","usdPrice":0.999196,"decimals":"6","isBasePoolLpToken":false,"symbol":"USDC","poolBalance":"184817753032195"},{"address":"0xdAC17F958D2ee523a2206206994597C13D831ec7","usdPrice":1.005,"decimals":"6","isBasePoolLpToken":false,"symbol":"USDT","poolBalance":"24174338171224"}],"usdTotal":388061228.29369867,"isMetaPool":false,"usdTotalExcludingBasePool":388061228.29369867,"gaugeAddress":"0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a","gaugeRewards":[],"gaugeCrvApy":[0.6855746669813294,1.7139366674533236],"fee":1000000,"type":"curveV1","A":2000,"reserve":[1.789362270942915e+44,1.88420780351672e+44,2.8175097407123003e+43],"i":2,"j":0,"rate":1.0046710798501997,"amountTradedEst":1.7155666805055225e+44,"splicePercent":1}




const main = (priceImpactEst,param) => {
    const { reserve, i, j, rate } = okla

    let cantren = reserve[j] * 10 / rate
    let canduoi = 0.01 * 10 ** 36

    let isLoop = true
    let index = 0


    while (isLoop) {
        const amountIn = (cantren + canduoi) / 2
        const amountOut = calcAmountOutCurvev1(amountIn, reserve, okla)
        const priceMarket = amountOut / amountIn
        const priceImpact = 1 - priceMarket / rate
        console.log(
            amountIn, canduoi, cantren, priceImpact, index)

        if (Math.abs(priceImpact - priceImpactEst) < 0.00001) {
            isLoop = false
            console.log(amountIn/(10**36), priceImpact)
        }
        if (priceImpact - priceImpactEst > 0) cantren = amountIn
        if (priceImpact - priceImpactEst < 0) canduoi = amountIn
    }
    return 
}

main(0.01)