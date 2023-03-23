
const ADDRESS_CONTRACT = {
    adpater: "0x3aBB59464Ec3E291EA67Bf1d7fb4c6f09f5F251B",

    executor: "0x45b582b0e3F2c5f698d8Ef09288051b64C71A748",

    uniswapV2: "0xe4D2394AEf495B1A3aeda413FBADda84f59F1698",

    stableSwap: "0x14019b6fec14cf6777954078917f8a239Aa1BE93",
}
const POOL_TYPE = {
    uniV2: 'uniV2',
    uniV3: 'uniV3',
    curveV1: 'curveV1',
    curveV2: 'curveV2',
    curveV2Fac: 'curveV2Fac',
    balancer: 'balancer'
}

const ABI = {
    "adapter": [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_weth",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "partner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tokenOut",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "partnerFee",
                    "type": "uint256"
                }
            ],
            "name": "ClaimPartnerFee",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "partner",
                    "type": "address"
                }
            ],
            "name": "DeactivePartner",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "partner",
                    "type": "address"
                }
            ],
            "name": "SetPartner",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_partnerFee",
                    "type": "uint256"
                }
            ],
            "name": "SetPartnerFee",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_protocolFee",
                    "type": "uint256"
                }
            ],
            "name": "SetProtocolFee",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "PARTNER_FEE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "PROTOCOL_FEE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "Partners",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "registrationTime",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_partner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "_isActive",
                    "type": "bool"
                }
            ],
            "name": "setPartner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_partnerFee",
                    "type": "uint256"
                }
            ],
            "name": "setPartnerFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_protocolFee",
                    "type": "uint256"
                }
            ],
            "name": "setProtocolFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "fromAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "fromToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "toToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "internalType": "contract IExecutor",
                    "name": "executor",
                    "type": "address"
                }
            ],
            "name": "swapRoutes",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "weth",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],

}


const Web3 = require("web3");
const Web3EthAbi = require('web3-eth-abi');
//const routeFake = require("./dataFake");
const web3 = new Web3("https://data-seed-prebsc-2-s3.binance.org:8545")

const account = web3.eth.accounts.privateKeyToAccount("b367c1164d4042b0a759d5df02c9604bad99b7b104e04bffd375dcdfdc4422b0")


const encodePairUniv2 = (dataPool) => {
    const { coins, address } = dataPool
    const [fromToken, toToken] = coins

    const swapparam2 = Web3EthAbi.encodeParameter({
        SwapParam: {
            fromToken: "address",
            toToken: "address",
            targetExchange: "address",
            payload: "bytes",
        },
    },
        {
            fromToken: fromToken.address,  //USDC
            toToken: toToken.address,
            targetExchange: address,
            payload: "0x",
        });
    return swapparam2
}

const encodePairCurveV1 = (dataPool) => {

    const { coins, address, i, j } = dataPool

    //console.log(coins[i],coins[j],i,j)

    const payload2 = Web3EthAbi.encodeParameter({
        CurveV2Data: {
            i: "uint256",
            j: "uint256",
            underlyingSwap: "bool",
        },
    },
        {
            i: i,
            j: j,
            underlyingSwap: 0,
        });

    const swapparam2 = Web3EthAbi.encodeParameter({
        SwapParam: {
            //index:"uint256",
            fromToken: "address",
            toToken: "address",
            targetExchange: "address",
            payload: "bytes",
            //networkFee: "uint256"
        },
    },
        {
            //index:1,
            fromToken: coins[i].address,  //USDC
            toToken: coins[j].address,
            targetExchange: address,
            payload: payload2,
            //networkFee: 11,
        });
    return swapparam2
}

const okla = (dataPool) => {
    const { amountIn, amountOut, coins, i, j } = dataPool

}

const encodePair = (dataPool) => {
    okla(dataPool)
    switch (dataPool.type) {
        case POOL_TYPE.uniV2:
            return encodePairUniv2(dataPool)
        case POOL_TYPE.curveV1:
            return encodePairCurveV1(dataPool)
        default:
            return "0x"
    }
}

const getAddressAdapter = (type) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return ADDRESS_CONTRACT.uniswapV2
        case POOL_TYPE.curveV1:
            return ADDRESS_CONTRACT.stableSwap
        default:
            return "0x"
    }
}

const encodeAllPair = (dataRoute, subRoute) => {
    const { coins } = dataRoute
    const [fromToken, toToken] = coins

    const arrayAmountIn = subRoute.map(item => {
        const wei = Math.floor(item.amountIn / 10 ** 18)

        return BigInt(wei)
    })
    const arrayAmountOut = subRoute.map(item => {
        const wei = Math.floor(item.amountOut / 10 ** 18)

        return BigInt(wei)
    })

    const arrayAddressAdapter = subRoute.map(item => getAddressAdapter(item.type))
    const arrayDataEncode = subRoute.map(item => item.dataEncode)

    const encodeAmountIn1 = Web3EthAbi.encodeParameters(
        ['uint256[]'], [arrayAmountIn]
    );
    const encodeAmountOut1 = Web3EthAbi.encodeParameters(
        ['uint256[]'], [arrayAmountOut]
    );
    const encodeRouters1 = Web3EthAbi.encodeParameters(
        ['address[]'], [arrayAddressAdapter]
    );
    const encodePayload1 = Web3EthAbi.encodeParameters(
        ['bytes[]'], [arrayDataEncode]
    );
    var fromToken1 = fromToken.address
    const element1 = Web3EthAbi.encodeParameter({
        ElementSwap: {
            encodeRouters: "bytes",
            encodeAmountIn: "bytes",
            encodeAmountOut: "bytes",
            fromToken: "address",
            encodePayload: "bytes",
        },
    },
        {
            encodeRouters: encodeRouters1,
            encodeAmountIn: encodeAmountIn1,
            encodeAmountOut: encodeAmountOut1,
            fromToken: fromToken1,
            encodePayload: encodePayload1,
        });

    return element1
}

const encodePath = (routeInput) => {
    const arrayData = routeInput.map(item => item.dataEncodeAllPair)
    const chain1 = Web3EthAbi.encodeParameters(
        ['bytes[]'], [arrayData]
    );
    return chain1
}

const encodeRouter = (routeInput) => {
    const routeOutput = routeInput.map(item => {
        const route = item.route.map(routeItem => {

            const newSubRoute = routeItem.subRoute.map(it => {
                const encodeData = encodePair(it)
                return {
                    ...it,
                    dataEncode: encodeData
                }
            })

            const dataEncodeAllPair = encodeAllPair(routeItem, newSubRoute)



            return {
                ...routeItem,
                subRoute: newSubRoute,
                dataEncodeAllPair: dataEncodeAllPair
            }
        })

        const dataEncodePath = encodePath(route)

        return {
            ...item,
            route: route,
            dataEncodePath: dataEncodePath
        }
    })

    const arrayDatapath = routeOutput.map(item => item.dataEncodePath)


    const dataEncodeRoute = Web3EthAbi.encodeParameters(
        ['bytes[]'], [arrayDatapath]
    );

    return dataEncodeRoute
}

const decodeRoute = (data) => {
    const dataChain1 = Web3EthAbi.decodeParameters(['bytes[]'], data)[0][0];
    const adaptor1 = Web3EthAbi.decodeParameters(['bytes[]'], dataChain1)[0][1];
    const ele1 = Web3EthAbi.decodeParameter(
        {
            "ElementSwap": {
                "encodeRouters": "bytes",
                "encodeAmountIn": "bytes",
                "encodeAmountOut": "bytes",
                "fromToken": "address",
                "encodePayload": "bytes",
            },
        }, adaptor1);

    //console.log(ele1);

    const router = Web3EthAbi.decodeParameters(['address[]'], ele1.encodeRouters)[0];
    const amountIn = Web3EthAbi.decodeParameters(['uint256[]'], ele1.encodeAmountIn)[0];
    const amountOut = Web3EthAbi.decodeParameters(['uint256[]'], ele1.encodeAmountOut)[0];
    const fromToken = ele1.fromToken
    const payloadele1 = Web3EthAbi.decodeParameters(['bytes[]'], ele1.encodePayload)[0]


    payloadele1.map((item, index) => {
        const swapele1 = Web3EthAbi.decodeParameter(
            {
                "SwapParam": {
                    //"index":"uint256",
                    "fromToken": "address",
                    "toToken": "address",
                    "targetExchange": "address",
                    "payload": "bytes",
                    //"networkFee": "uint256"
                },
            }, item);



        console.log("router ", router[index])
        console.log("amountIn ", amountIn[index])
        console.log("amountOut ", amountOut[index])
        console.log("fromToken ", fromToken)
        console.log("swapele1 ", swapele1);

        if(swapele1.payload!=="0x"){

        const curve = Web3EthAbi.decodeParameter(
            {
                "CurveV2Data:": {
                    "i": "uint256",
                    "j": "int256",
                    "underlyingSwap": "bool"

                },
            }, swapele1.payload);
        console.log("curve", curve);
        }


    })





}


export const swap = async (routeFake) => {
    //const dataApprove = await approve()


    var executor = "0x45b582b0e3F2c5f698d8Ef09288051b64C71A748";

    const contractAdapter = new web3.eth.Contract(
        ABI.adapter,
        ADDRESS_CONTRACT.adpater
    );


    const data = encodeRouter(routeFake)
    //console.log("🚀 ~ file: testTransaction.js:540 ~ main ~ data:", data)x
    const tokenA = "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498"
    const tokenBusd = "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7"
    const usdt ="0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96"
    const fromAmount = Web3.utils.toWei('100', 'ether');

    const AmountOut = routeFake.reduce((total, item) => total + BigInt(Math.round(item.amountOut / 10 ** 18)), 0n)


    //decodeRoute(data)
    const dataRaw = contractAdapter.methods.swapRoutes(fromAmount,  tokenBusd,tokenA, data, executor).encodeABI()


    const rawTransaction = {
        from: account.address,
        to: ADDRESS_CONTRACT.adpater,
        data: dataRaw
    }



    const gas = await web3.eth.estimateGas(rawTransaction)
    console.log("🚀 ~ file: testTransaction.js:55 ~ main ~ gas", gas)


    const gasPrice = await web3.eth.getGasPrice()
    const networkId = await web3.eth.net.getId()
    const nonce = await web3.eth.getTransactionCount(account.address)

    rawTransaction.gasPrice = gasPrice
    rawTransaction.nonce = nonce
    rawTransaction.chainId = networkId
    rawTransaction.gas = gas

    const signedTransaction = await account.signTransaction(rawTransaction)

    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log("🚀 ~ file: testTransaction.js:640 ~ main ~ receipt:", receipt)
}


const approve = async () => {
    const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }], "name": "initialMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialMinted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "merkleClaim", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "redemptionReceiver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "setMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
    const contractAdapter = new web3.eth.Contract(
        abi,
        "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498",
    );

    const fromAmount = Web3.utils.toWei('10000000000000', 'ether');

    const dataRaw = contractAdapter.methods.approve(ADDRESS_CONTRACT.adpater, fromAmount).encodeABI()


    const rawTransaction = {
        from: account.address,
        to: "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498",
        data: dataRaw
    }

    const gasPrice = await web3.eth.getGasPrice()
    const networkId = await web3.eth.net.getId()
    const nonce = await web3.eth.getTransactionCount(account.address)
    const gas = await web3.eth.estimateGas(rawTransaction)

    rawTransaction.gasPrice = gasPrice
    rawTransaction.nonce = nonce
    rawTransaction.chainId = networkId
    rawTransaction.gas = gas

    const signedTransaction = await account.signTransaction(rawTransaction)

    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log("🚀 ~ file: testTransaction.js:747 ~ transfer ~ receipt:", receipt)
}
//approve()

