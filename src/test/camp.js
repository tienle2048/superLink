const Web3 = require('web3')
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
main()