
const ADDRESS_CONTRACT = {
    adpater: "0x3aBB59464Ec3E291EA67Bf1d7fb4c6f09f5F251B",

    executor: "0x45b582b0e3F2c5f698d8Ef09288051b64C71A748",

    uniswapV2: "0xe4D2394AEf495B1A3aeda413FBADda84f59F1698",

    stableSwap: "0x14019b6fec14cf6777954078917f8a239Aa1BE93",
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
const { POOL_TYPE } = require("../curvev1/constants");
const web3 = new Web3("https://data-seed-prebsc-2-s3.binance.org:8545")

const account = web3.eth.accounts.privateKeyToAccount("b367c1164d4042b0a759d5df02c9604bad99b7b104e04bffd375dcdfdc4422b0")


var swapparam1 = Web3EthAbi.encodeParameter({
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
        fromToken: "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498", //A
        toToken: "0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D", //USDC
        targetExchange: "0x41E0f861EF8eCdb4d45aCf69e0f9B8ec8600c2e4", //Pair A/USDC
        payload: "0x",
        //networkFee: 11,
    });

// console.log(swapparam1);
var amountIn = Web3.utils.toWei('100', 'ether');
var amountOut = Web3.utils.toWei('25', 'ether');

const encodeAmountIn1 = Web3EthAbi.encodeParameters(
    ['uint256[]'], [[amountIn, amountIn]]
);
const encodeAmountOut1 = Web3EthAbi.encodeParameters(
    ['uint256[]'], [[amountOut, amountOut]]
);
const encodeRouters1 = Web3EthAbi.encodeParameters(
    ['address[]'], [["0xe4D2394AEf495B1A3aeda413FBADda84f59F1698", "0xe4D2394AEf495B1A3aeda413FBADda84f59F1698"]]
);
const encodePayload1 = Web3EthAbi.encodeParameters(
    ['bytes[]'], [[swapparam1, swapparam1]]
);
var fromToken1 = "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498"; //A
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

const payload2 = Web3EthAbi.encodeParameter({
    CurveV2Data: {
        i: "uint256",
        j: "uint256",
        underlyingSwap: "bool",
    },
},
    {
        i: 1,
        j: 0,
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
        fromToken: "0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D",  //USDC
        toToken: "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7", //BUSD
        targetExchange: "0xd5e56cd4c8111643a94ee084df31f44055a1ec9f",  //StableSwap USDC/BUSD
        payload: payload2,
        //networkFee: 11,
    });
var amountIn = Web3.utils.toWei('50', 'ether');
var amountOut = Web3.utils.toWei('0', 'ether');
const encodeAmountIn2 = Web3EthAbi.encodeParameters(
    ['uint256[]'], [[amountIn]]
);
const encodeAmountOut2 = Web3EthAbi.encodeParameters(
    ['uint256[]'], [[amountOut]]
);
const encodeRouters2 = Web3EthAbi.encodeParameters(
    ['address[]'], [["0x14019b6fec14cf6777954078917f8a239Aa1BE93"]]
);
const encodePayload2 = Web3EthAbi.encodeParameters(
    ['bytes[]'], [[swapparam2]]
);
var fromToken2 = "0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D"; //USDC
const element2 = Web3EthAbi.encodeParameter({
    ElementSwap: {
        encodeRouters: "bytes",
        encodeAmountIn: "bytes",
        encodeAmountOut: "bytes",
        fromToken: "address",
        encodePayload: "bytes",
    },
},
    {
        encodeRouters: encodeRouters2,
        encodeAmountIn: encodeAmountIn2,
        encodeAmountOut: encodeAmountOut2,
        fromToken: fromToken2,
        encodePayload: encodePayload2,
    });

const chain1 = Web3EthAbi.encodeParameters(
    ['bytes[]'], [[element1, element2]]
);

const total = Web3EthAbi.encodeParameters(
    ['bytes[]'], [[chain1]]
);
// console.log(total);
//const dataChain1 = Web3EthAbi.decodeParameters(['bytes[]'],total)[0];

var fromAmount = Web3.utils.toWei('200', 'ether');
var fromToken = "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498"; //A
var toToken = "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7"; //BUSD
var data = total;
var executor = "0x45b582b0e3F2c5f698d8Ef09288051b64C71A748";

const contractAdapter = new web3.eth.Contract(
    ABI.adapter,
    ADDRESS_CONTRACT.adpater
);


//console.log("🚀 ~ file: index.js:45 ~ main ~ gas", gas)

//const signedTransaction = await account.signTransaction(rawTransaction)

//const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction) ;


const approve = async () => {

    const data = "0x095ea7b30000000000000000000000003aBB59464Ec3E291EA67Bf1d7fb4c6f09f5F251B00000000000000000000000000000000000000000000002086ac351052600000"

    const rawTransaction = {
        from: account.address,
        to: "0xD67aC77AF1Aa020Ed3D169daB78Cf70aFe1f2498",
        data: data
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
    console.log("🚀 ~ file: testTransaction.js:617 ~ approve ~ receipt:", receipt)

}

// approve()

const main = async () => {
    const dataApprove = await approve()
    console.log("🚀 ~ file: testTransaction.js:605 ~ main ~ approve:", dataApprove)


    const dataRaw = contractAdapter.methods.swapRoutes(fromAmount, fromToken, toToken, data, executor).encodeABI()


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




main()


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
            payload: payload2,
        });
    return swapparam2
}

const encodePairCurveV1 = (dataPool) => {

    const { coins, address ,i,j} = dataPool
    const [fromToken, toToken] = coins
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
            fromToken: fromToken.address,  //USDC
            toToken: toToken.address,
            targetExchange: address,
            payload: payload2,
            //networkFee: 11,
        });
}

const encodePair = (dataPool)=>{
    switch (dataPool.type) {
        case POOL_TYPE.uniV2:
            return encodePairUniv2(dataPool)
        case POOL_TYPE.curveV1:
            return encodePairCurveV1(dataPool)
        default:
            return "0x"
    }
}


export const encodeRouter = (routeInput) => {
    const routeOutput = routeInput.map(item => {
        const route = item.route.map(routeItem => {
            
            const newSubRoute = routeItem.subRoute.map(it => {
                const encodeData = encodePair(it)

                return {
                    ...it,
                    dataEncode:encodeData
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute
            }
        })

        return {
            ...item,
            route: route,
        }
    })
    console.log("🚀 ~ file: index.js:643 ~ routeOutput ~ routeOutput:", routeOutput)
    

    return routeOutput
}