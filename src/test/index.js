


const Web3 = require('web3')
//const web3 = new Web3("https://nd-568-863-669.p2pify.com/2dfeb3634054cc14d8a64a528431a652")
const web3 = new Web3("https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570")
const web3duphong = new Web3("https://singapore.rpc.blxrbdn.com	")
const { getCreate2Address } = require('@ethersproject/address')
const { pack, keccak256 } = require('@ethersproject/solidity')
const { Trade, JSBI, Token, Pair, Percent, CurrencyAmount, TokenAmount } = require('@uniswap/sdk')

const factoryAddress = {
    binanceSmart: [
        {
            "tradeType": "pancakeSwap",
            "chain": "binanceSmart",
            "name": "PancakeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7186-zUssGAbXlB6ZqsJ0.png",
            "router": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "factory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",

        },

        {
            "tradeType": "apeswap",
            "chain": "binanceSmart",
            "name": "ApeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1281-LpBefLmAJ7vbzkdC.png",
            "router": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
            "factory": "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
            "initCode": "0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b",
            "graphQl": "https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph",

        },

        {
            "tradeType": "unifi",
            "chain": "binanceSmart",
            "name": "Unifi Protocol",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7077-QNvTgviWs1bOCQiR.png",
            "router": "0xBE930734eDAfc41676A76d2240f206Ed36dafbA2",
            "factory": "0xA5Ba037Ec16c45f8ae09e013C1849554C01385f5",
            "initCode": "0xa90f5671e014e72743ed3bfd909b833a46f2fcaa856692b76f87181abc8fdaff",
            "graphQl": "",

        },

        {
            "tradeType": "cheeseswap",
            "chain": "binanceSmart",
            "name": "CheeseSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8217-rmokTXHfEtdXKayH.png",
            "router": "0x3047799262d8D2EF41eD2a222205968bC9B0d895",
            "factory": "0xdd538E4Fd1b69B7863E1F741213276A6Cf1EfB3B",
            "initCode": "0xf52c5189a89e7ca2ef4f19f2798e3900fba7a316de7cef6c5a9446621ba86286",
            "graphQl": "https://api.thegraph.com/subgraphs/name/blockartist/cheesesub",

        },

        {
            "tradeType": "jetswap",
            "chain": "binanceSmart",
            "name": "JetSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10810-NwaK28M0oVIdW922.png",
            "router": "0xBe65b8f75B9F20f4C522e0067a3887FADa714800",
            "factory": "0x0eb58E5c8aA63314ff5547289185cC4583DfCBD5",
            "initCode": "0x3125d0a15fa7af49ce234ba1cf5f931bad0504242e0e1ee9fcd7d1d7aa88c651",
            "graphQl": "https://api.thegraph.com/subgraphs/name/smartcookie0501/jetswap-subgraph",

        },

        {
            "tradeType": "mdex",
            "chain": "binanceSmart",
            "name": "Mdex",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8335-03v0I7vzncLi2RTW.png",
            "router": "0x0384E9ad329396C3A6A401243Ca71633B2bC4333",
            "factory": "0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8",
            "initCode": "0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093",
            "graphQl": null,

        },

        {
            "tradeType": "waultFinance",
            "chain": "binanceSmart",
            "name": "Wault Finance",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8588-BD5fgBZxf4MgyM6c.png",
            "router": "0xD48745E39BbED146eEC15b79cBF964884F9877c2",
            "factory": "0xB42E3FE71b7E0673335b3331B3e1053BD9822570",
            "initCode": "0x9599db1eaa37ab366bf260f51beefce9296eb6197de387c533d905e9b82debe9",
            "graphQl": "https://api.thegraph.com/subgraphs/name/waultfinance/waultswap-bsc",

        },

        {
            "tradeType": "biswap",
            "chain": "binanceSmart",
            "name": "Biswap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10746-kMHr2LKOuXuwWhDy.png",
            "router": "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
            "factory": "0x858E3312ed3A876947EA49d572A7C42DE08af7EE",
            "initCode": "0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf",
            "graphQl": "https://api.thegraph.com/subgraphs/name/biswapcom/exchange5",

        },

        {
            "tradeType": "babyswap",
            "chain": "binanceSmart",
            "name": "BabySwap",
            "chainId": 56,
            "logo": "https://coin98.s3.amazonaws.com/gIJIAXKzGTsNNVVW",
            "router": "0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd",
            "factory": "0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da",
            "initCode": "0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5",
            "graphQl": null,

        },

        {
            "tradeType": "autoshark",
            "chain": "binanceSmart",
            "name": "Auto Shark",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10303-AQO7ekiPpM5KsfpI.png",
            "router": "0xB0EeB0632bAB15F120735e5838908378936bd484",
            "factory": "0xe759Dd4B9f99392Be64f1050a6A8018f73B53a13",
            "initCode": "0x024c8482358faf5eeea4ff7f0a18734bc482bf2e61ec04711fcee726756287ee",
            "graphQl": "https://api.thegraph.com/subgraphs/name/autoshark-finance/exchange-v1",

        },

        {
            "tradeType": "cafeswap",
            "chain": "binanceSmart",
            "name": "CafeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1317-GaOVirXEhlqW75fq.png",
            "router": "0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A",
            "factory": "0x3e708FdbE3ADA63fc94F8F61811196f1302137AD",
            "initCode": "0x90bcdb5d0bf0e8db3852b0b7d7e05cc8f7c6eb6d511213c5ba02d1d1dbeda8d3",
            "graphQl": "https://api.thegraph.com/subgraphs/name/autoshark-finance/exchange",

        },

        {
            "tradeType": "JustLiquidityRouter",
            "chain": "binanceSmart",
            "name": "JustLiquidity",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/6937-NSxpYYrQ2KZAuH4I.png",
            "router": "0xbd67d157502A23309Db761c41965600c2Ec788b2",
            "factory": "0x553990F2CBA90272390f62C5BDb1681fFc899675",
            "initCode": "0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18",
            "graphQl": null,

        },

        {
            "tradeType": "HyperJump",
            "chain": "binanceSmart",
            "name": "HyperJump",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/14658-HyaRbwLpp87hhfBA.png",
            "router": "0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec",
            "factory": "0xaC653cE27E04C6ac565FD87F18128aD33ca03Ba2",
            "initCode": "0x0b3961eeccfbf746d2d5c59ee3c8ae3a5dcf8dc9b0dfb6f89e1e8ca0b32b544b",
            "graphQl": "https://api.thegraph.com/subgraphs/name/angry-mech/hyperjump-bsc-main",

        },

        {
            "tradeType": "JulSwap",
            "chain": "binanceSmart",
            "name": "JulSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8164-aMUIoHIGeNxtrjxz.png",
            "router": null,
            "factory": "0x553990F2CBA90272390f62C5BDb1681fFc899675",
            "initCode": "0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18",
            "graphQl": "",

        },

        {
            "tradeType": "plannet",
            "chain": "binanceSmart",
            "name": "Plannet",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1489-945BR21MmqW2Fnxf.png",
            "router": null,
            "factory": "0xa053582601214FEb3778031a002135cbBB7DBa18",
            "initCode": "0xe59afd81a2bf00e2528a56d56c1c6e9fc9768e49872e603ee0d5ab6374e175e1",
            "graphQl": "https://api.thegraph.com/subgraphs/name/makemyideatech/planet-finance",

        },

        {
            "tradeType": "plearnclub",
            "chain": "binanceSmart",
            "name": "Plearnclub",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/ta%CC%89i%20xuo%CC%82%CC%81ng-pvQv2jadBuQqPx2X.png",
            "router": null,
            "factory": "0x4750A965f72E09c434b7a40f1735144c983440D2",
            "initCode": "0x047caab6a82a0dad4b77f15197f50d4673b220a10d06fda5691d41b18e687adb",
            "graphQl": "https://api.thegraph.com/subgraphs/name/jozzee-ookbee/plearn-exchange",

        },

        {
            "tradeType": "LatteSwap",
            "chain": "binanceSmart",
            "name": "LatteSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/12324-40et2aCIAUJLwAP6.png",
            "router": null,
            "factory": "0x4DcE5Bdb81B8D5EdB66cA1b8b2616A8E0Dd5f807",
            "initCode": "0xd186cd0235b0839707c25b5e4a518a7e67159a1c74f36680d920c0d82097db36",
            "graphQl": "https://api.thegraph.com/subgraphs/name/latteswap-official/exchange",

        },

        {
            "tradeType": "JSwap",
            "chain": "binanceSmart",
            "name": "JSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1476-kr4qzcVi1gNVmjnd.png",
            "router": null,
            "factory": "0xd654CbF99F2907F06c88399AE123606121247D5C",
            "initCode": "0x6e68534dd22358c18cfccdcd5fe2f0e76764cfa79fb8b77f9fc12b5e1625a2b5",
            "graphQl": "",

        },

        {
            "tradeType": "definix",
            "chain": "binanceSmart",
            "name": "Definix",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10661-W2XoicryzRNcs5Rc.png",
            "router": null,
            "factory": "0x43eBb0cb9bD53A3Ed928Dd662095aCE1cef92D19",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": null,

        },

        {
            "tradeType": "Warden",
            "chain": "binanceSmart",
            "name": "Warden",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8981-FG3xLrx2mxaF7GJy.png",
            "router": null,
            "factory": "0x3657952d7bA5A0A4799809b5B6fdfF9ec5B46293",
            "initCode": "0xfbbcb3ce9944dd53a7ef447076d0e4e4811911365339bab292e4733d5b37a120",
            "graphQl": "https://api.thegraph.com/subgraphs/name/wardenluna/warden-pool",

        },

        {
            "tradeType": "ELK",
            "chain": "binanceSmart",
            "name": "ELK",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10095%20(1)-vrqvnF5yQrhVZI3K.png",
            "router": "0xA63B831264183D755756ca9AE5190fF5183d65D6",
            "factory": "0x31aFfd875e9f68cd6Cd12Cee8943566c9A4bBA13",
            "initCode": "0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31",
            "graphQl": "https://api.thegraph.com/subgraphs/name/elkfinance/elkdex-bsc",

        },

        {
            "tradeType": "BARY",
            "logo": "https://coin98.s3.amazonaws.com/f5ULNjbOGYBeFwBR",
            "name": "Baryon",
            "chain": "binanceSmart",
            "chainId": 56,
            "router": "",
            "factory": "0x03879E2a3944FD601e7638DfCBC9253fb793b599",
            "initCode": "0xaa6de7108cd6c8de3a445fd2e61ac164d0c2556eaf6fbb132cb70a2e75f5e5c7",
            "graphQl": "",
        }


    ],
    eth: [
        {
            name: "DXswapRouter",
            route: "0xB9960d9bcA016e9748bE75dd52F02188B9d0829f",
            factory: "0xd34971bab6e5e356fd250715f5de0492bb070452",
            initCode: "0xd306a548755b9295ee49cc729e13ca4a45e00199bbd890fa146da43a50571776"
        },
        {
            name: "Unifi",
            route: "0x79F12D68631eC6396aAB3CdF31F07C90D0023c9A",
            factory: "0x08e7974cacf66c5a92a37c221a15d3c30c7d97e0",
            initCode: "0x44684722f15fdeed2f020712b87ff5db6e63b732cb8ad12777180fb094fee9e1"
        },
        {
            name: "LuaSwap",
            route: "0x1d5C6F1607A171Ad52EFB270121331b3039dD83e",
            factory: "0x0388c1e0f210abae597b7de712b9510c6c36c857",
            initCode: "0xf176ce2ef2ec9c3333f7ab282e4269fdd75024da47415e2c7c6e04272fc1bfab"
        },
        {
            name: "Defi swap",
            route: "0xCeB90E4C17d626BE0fACd78b79c9c87d7ca181b3",
            factory: "0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d",
            initCode: "0x69d637e77615df9f235f642acebbdad8963ef35c5523142078c9b8f9d0ceba7e"
        },
        {
            name: "Convx",
            route: "0x8Cda39226daf33ae1Aba0C92C34d1a1982Cf0210",
            factory: "0x4eef5746ed22a2fd368629c1852365bf5dcb79f1",
            initCode: "0x9fb44e670c5e09087865a6e5c85ae0fc3e365ede68ae928445f8a92971c11eb6"
        },
        {
            name: "UniswapV2",
            route: "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            factory: "0x115934131916c8b277dd010ee02de363c09d037c",
            initCode: "0x65d1a3b1e46c6e4f1be1ad5f99ef14dc488ae0549dc97db9b30afe2241ce1c7a"
        },
        {
            name: "SushiSwap",
            route: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
            factory: "0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac",
            initCode: "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303"
        }
    ]
}

const AbiBinanceSmart = [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [], "name": "INIT_CODE_PAIR_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
// const AbiEth =[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint32","name":"_swapFee","type":"uint32"}],"name":"setSwapFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const AbiPool = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]

const AbiPoolCurve = [{ "name": "TokenExchange", "inputs": [{ "type": "address", "name": "buyer", "indexed": true }, { "type": "int128", "name": "sold_id", "indexed": false }, { "type": "uint256", "name": "tokens_sold", "indexed": false }, { "type": "int128", "name": "bought_id", "indexed": false }, { "type": "uint256", "name": "tokens_bought", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "TokenExchangeUnderlying", "inputs": [{ "type": "address", "name": "buyer", "indexed": true }, { "type": "int128", "name": "sold_id", "indexed": false }, { "type": "uint256", "name": "tokens_sold", "indexed": false }, { "type": "int128", "name": "bought_id", "indexed": false }, { "type": "uint256", "name": "tokens_bought", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "AddLiquidity", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "invariant", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidity", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidityOne", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256", "name": "token_amount", "indexed": false }, { "type": "uint256", "name": "coin_amount", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidityImbalance", "inputs": [{ "type": "address", "name": "provider", "indexed": true }, { "type": "uint256[3]", "name": "token_amounts", "indexed": false }, { "type": "uint256[3]", "name": "fees", "indexed": false }, { "type": "uint256", "name": "invariant", "indexed": false }, { "type": "uint256", "name": "token_supply", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "CommitNewAdmin", "inputs": [{ "type": "uint256", "name": "deadline", "indexed": true }, { "type": "address", "name": "admin", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "NewAdmin", "inputs": [{ "type": "address", "name": "admin", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "CommitNewFee", "inputs": [{ "type": "uint256", "name": "deadline", "indexed": true }, { "type": "uint256", "name": "fee", "indexed": false }, { "type": "uint256", "name": "admin_fee", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "NewFee", "inputs": [{ "type": "uint256", "name": "fee", "indexed": false }, { "type": "uint256", "name": "admin_fee", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RampA", "inputs": [{ "type": "uint256", "name": "old_A", "indexed": false }, { "type": "uint256", "name": "new_A", "indexed": false }, { "type": "uint256", "name": "initial_time", "indexed": false }, { "type": "uint256", "name": "future_time", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "StopRampA", "inputs": [{ "type": "uint256", "name": "A", "indexed": false }, { "type": "uint256", "name": "t", "indexed": false }], "anonymous": false, "type": "event" }, { "outputs": [], "inputs": [{ "type": "address", "name": "_owner" }, { "type": "address[3]", "name": "_coins" }, { "type": "address[3]", "name": "_underlying_coins" }, { "type": "address", "name": "_pool_token" }, { "type": "uint256", "name": "_A" }, { "type": "uint256", "name": "_fee" }, { "type": "uint256", "name": "_admin_fee" }], "stateMutability": "nonpayable", "type": "constructor" }, { "name": "A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 5199 }, { "name": "A_precise", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 5161 }, { "name": "get_virtual_price", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 1198966 }, { "name": "calc_token_amount", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "amounts" }, { "type": "bool", "name": "is_deposit" }], "stateMutability": "view", "type": "function", "gas": 4731095 }, { "name": "add_liquidity", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "_amounts" }, { "type": "uint256", "name": "_min_mint_amount" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "add_liquidity", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "_amounts" }, { "type": "uint256", "name": "_min_mint_amount" }, { "type": "bool", "name": "_use_underlying" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "get_dy", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }], "stateMutability": "view", "type": "function", "gas": 2814151 }, { "name": "get_dx", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dy" }], "stateMutability": "view", "type": "function", "gas": 2814012 }, { "name": "get_dy_underlying", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }], "stateMutability": "view", "type": "function", "gas": 2813991 }, { "name": "get_dx_underlying", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dy" }], "stateMutability": "view", "type": "function", "gas": 2813825 }, { "name": "exchange", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }, { "type": "uint256", "name": "min_dy" }], "stateMutability": "nonpayable", "type": "function", "gas": 6347170 }, { "name": "exchange_underlying", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "int128", "name": "i" }, { "type": "int128", "name": "j" }, { "type": "uint256", "name": "dx" }, { "type": "uint256", "name": "min_dy" }], "stateMutability": "nonpayable", "type": "function", "gas": 6354444 }, { "name": "remove_liquidity", "outputs": [{ "type": "uint256[3]", "name": "" }], "inputs": [{ "type": "uint256", "name": "_amount" }, { "type": "uint256[3]", "name": "_min_amounts" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "remove_liquidity", "outputs": [{ "type": "uint256[3]", "name": "" }], "inputs": [{ "type": "uint256", "name": "_amount" }, { "type": "uint256[3]", "name": "_min_amounts" }, { "type": "bool", "name": "_use_underlying" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "remove_liquidity_imbalance", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "_amounts" }, { "type": "uint256", "name": "_max_burn_amount" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "remove_liquidity_imbalance", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256[3]", "name": "_amounts" }, { "type": "uint256", "name": "_max_burn_amount" }, { "type": "bool", "name": "_use_underlying" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "calc_withdraw_one_coin", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }], "stateMutability": "view", "type": "function" }, { "name": "calc_withdraw_one_coin", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }, { "type": "bool", "name": "_use_underlying" }], "stateMutability": "view", "type": "function" }, { "name": "remove_liquidity_one_coin", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }, { "type": "uint256", "name": "_min_amount" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "remove_liquidity_one_coin", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "_token_amount" }, { "type": "int128", "name": "i" }, { "type": "uint256", "name": "_min_amount" }, { "type": "bool", "name": "_use_underlying" }], "stateMutability": "nonpayable", "type": "function" }, { "name": "ramp_A", "outputs": [], "inputs": [{ "type": "uint256", "name": "_future_A" }, { "type": "uint256", "name": "_future_time" }], "stateMutability": "nonpayable", "type": "function", "gas": 151984 }, { "name": "stop_ramp_A", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 148745 }, { "name": "commit_new_fee", "outputs": [], "inputs": [{ "type": "uint256", "name": "new_fee" }, { "type": "uint256", "name": "new_admin_fee" }], "stateMutability": "nonpayable", "type": "function", "gas": 110581 }, { "name": "apply_new_fee", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 97362 }, { "name": "revert_new_parameters", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 22015 }, { "name": "commit_transfer_ownership", "outputs": [], "inputs": [{ "type": "address", "name": "_owner" }], "stateMutability": "nonpayable", "type": "function", "gas": 74753 }, { "name": "apply_transfer_ownership", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 60830 }, { "name": "revert_transfer_ownership", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 22105 }, { "name": "admin_balances", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "i" }], "stateMutability": "view", "type": "function", "gas": 3601 }, { "name": "withdraw_admin_fees", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 12875 }, { "name": "kill_me", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 38088 }, { "name": "unkill_me", "outputs": [], "inputs": [], "stateMutability": "nonpayable", "type": "function", "gas": 22225 }, { "name": "coins", "outputs": [{ "type": "address", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2310 }, { "name": "underlying_coins", "outputs": [{ "type": "address", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2340 }, { "name": "balances", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2370 }, { "name": "previous_balances", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "uint256", "name": "arg0" }], "stateMutability": "view", "type": "function", "gas": 2400 }, { "name": "block_timestamp_last", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2321 }, { "name": "fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2351 }, { "name": "admin_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2381 }, { "name": "owner", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2411 }, { "name": "lp_token", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2441 }, { "name": "initial_A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2471 }, { "name": "future_A", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2501 }, { "name": "initial_A_time", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2531 }, { "name": "future_A_time", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2561 }, { "name": "admin_actions_deadline", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2591 }, { "name": "transfer_ownership_deadline", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2621 }, { "name": "future_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2651 }, { "name": "future_admin_fee", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2681 }, { "name": "future_owner", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 2711 }]

const AbiWapperToken = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "cashPrior", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "error", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "info", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "reservesFee", "type": "uint256" }], "name": "Flashloan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "liquidator", "type": "address" }, { "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "minter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "mintAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newCap", "type": "uint256" }], "name": "NewCollateralCap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract ComptrollerInterface", "name": "oldComptroller", "type": "address" }, { "indexed": false, "internalType": "contract ComptrollerInterface", "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract InterestRateModel", "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "internalType": "contract InterestRateModel", "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "redeemer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "benefactor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "addAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "admin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newCollateralTokens", "type": "uint256" }], "name": "UserCollateralChanged", "type": "event" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "addAmount", "type": "uint256" }], "name": "_addReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "_becomeImplementation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "_resignImplementation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newCollateralCap", "type": "uint256" }], "name": "_setCollateralCap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract ComptrollerInterface", "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract InterestRateModel", "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address payable", "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "accountCollateralTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "collateralCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "internalType": "contract ComptrollerInterface", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "change", "type": "uint256" }, { "internalType": "bool", "name": "repay", "type": "bool" }], "name": "estimateBorrowRatePerBlockAfterChange", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "change", "type": "uint256" }, { "internalType": "bool", "name": "repay", "type": "bool" }], "name": "estimateSupplyRatePerBlockAfterChange", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "flashFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "flashFeeBips", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract ERC3156FlashBorrowerInterface", "name": "receiver", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "flashLoan", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "gulp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "implementation", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "underlying_", "type": "address" }, { "internalType": "contract ComptrollerInterface", "name": "comptroller_", "type": "address" }, { "internalType": "contract InterestRateModel", "name": "interestRateModel_", "type": "address" }, { "internalType": "uint256", "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint8", "name": "decimals_", "type": "uint8" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract ComptrollerInterface", "name": "comptroller_", "type": "address" }, { "internalType": "contract InterestRateModel", "name": "interestRateModel_", "type": "address" }, { "internalType": "uint256", "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint8", "name": "decimals_", "type": "uint8" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "internalType": "contract InterestRateModel", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "internalCash", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isCollateralTokenInit", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "internalType": "contract CTokenInterface", "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "maxFlashLoan", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "mintAmount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "registerCollateral", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "repayBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "repayBorrowBehalf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalCollateralTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "underlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "unregisterCollateral", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]

//const AbiPoolCurve =[{"name":"TokenExchange","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"int128","name":"sold_id","indexed":false},{"type":"uint256","name":"tokens_sold","indexed":false},{"type":"int128","name":"bought_id","indexed":false},{"type":"uint256","name":"tokens_bought","indexed":false}],"anonymous":false,"type":"event"},{"name":"TokenExchangeUnderlying","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"int128","name":"sold_id","indexed":false},{"type":"uint256","name":"tokens_sold","indexed":false},{"type":"int128","name":"bought_id","indexed":false},{"type":"uint256","name":"tokens_bought","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[4]","name":"token_amounts","indexed":false},{"type":"uint256[4]","name":"fees","indexed":false},{"type":"uint256","name":"invariant","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[4]","name":"token_amounts","indexed":false},{"type":"uint256[4]","name":"fees","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityImbalance","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[4]","name":"token_amounts","indexed":false},{"type":"uint256[4]","name":"fees","indexed":false},{"type":"uint256","name":"invariant","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitNewAdmin","inputs":[{"type":"uint256","name":"deadline","indexed":true,"unit":"sec"},{"type":"address","name":"admin","indexed":true}],"anonymous":false,"type":"event"},{"name":"NewAdmin","inputs":[{"type":"address","name":"admin","indexed":true}],"anonymous":false,"type":"event"},{"name":"CommitNewParameters","inputs":[{"type":"uint256","name":"deadline","indexed":true,"unit":"sec"},{"type":"uint256","name":"A","indexed":false},{"type":"uint256","name":"fee","indexed":false},{"type":"uint256","name":"admin_fee","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewParameters","inputs":[{"type":"uint256","name":"A","indexed":false},{"type":"uint256","name":"fee","indexed":false},{"type":"uint256","name":"admin_fee","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address[4]","name":"_coins"},{"type":"address[4]","name":"_underlying_coins"},{"type":"address","name":"_pool_token"},{"type":"uint256","name":"_A"},{"type":"uint256","name":"_fee"}],"constant":false,"payable":false,"type":"constructor"},{"name":"get_virtual_price","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1570535},{"name":"calc_token_amount","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256[4]","name":"amounts"},{"type":"bool","name":"deposit"}],"constant":true,"payable":false,"type":"function","gas":6103471},{"name":"add_liquidity","outputs":[],"inputs":[{"type":"uint256[4]","name":"amounts"},{"type":"uint256","name":"min_mint_amount"}],"constant":false,"payable":false,"type":"function","gas":9331701},{"name":"get_dy","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"}],"constant":true,"payable":false,"type":"function","gas":3489637},{"name":"get_dy_underlying","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"}],"constant":true,"payable":false,"type":"function","gas":3489467},{"name":"exchange","outputs":[],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"},{"type":"uint256","name":"min_dy"}],"constant":false,"payable":false,"type":"function","gas":7034253},{"name":"exchange_underlying","outputs":[],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"},{"type":"uint256","name":"min_dy"}],"constant":false,"payable":false,"type":"function","gas":7050488},{"name":"remove_liquidity","outputs":[],"inputs":[{"type":"uint256","name":"_amount"},{"type":"uint256[4]","name":"min_amounts"}],"constant":false,"payable":false,"type":"function","gas":241191},{"name":"remove_liquidity_imbalance","outputs":[],"inputs":[{"type":"uint256[4]","name":"amounts"},{"type":"uint256","name":"max_burn_amount"}],"constant":false,"payable":false,"type":"function","gas":9330864},{"name":"commit_new_parameters","outputs":[],"inputs":[{"type":"uint256","name":"amplification"},{"type":"uint256","name":"new_fee"},{"type":"uint256","name":"new_admin_fee"}],"constant":false,"payable":false,"type":"function","gas":146045},{"name":"apply_new_parameters","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":133452},{"name":"revert_new_parameters","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":21775},{"name":"commit_transfer_ownership","outputs":[],"inputs":[{"type":"address","name":"_owner"}],"constant":false,"payable":false,"type":"function","gas":74452},{"name":"apply_transfer_ownership","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":60508},{"name":"revert_transfer_ownership","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":21865},{"name":"withdraw_admin_fees","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":23448},{"name":"kill_me","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":37818},{"name":"unkill_me","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":21955},{"name":"coins","outputs":[{"type":"address","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"constant":true,"payable":false,"type":"function","gas":2130},{"name":"underlying_coins","outputs":[{"type":"address","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"constant":true,"payable":false,"type":"function","gas":2160},{"name":"balances","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"constant":true,"payable":false,"type":"function","gas":2190},{"name":"A","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2021},{"name":"fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2051},{"name":"admin_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2081},{"name":"owner","outputs":[{"type":"address","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2111},{"name":"admin_actions_deadline","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2141},{"name":"transfer_ownership_deadline","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2171},{"name":"future_A","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2201},{"name":"future_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2231},{"name":"future_admin_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2261},{"name":"future_owner","outputs":[{"type":"address","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2291}]



/* const tokenTrungGian = [
    { chainId: 56, address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', decimals: 18, symbol: 'WBNB', name: 'Wrapped BNB' },
    { chainId: 56, address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', decimals: 18, symbol: 'BUSD', name: 'Binance USD' },
    { chainId: 56, address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, symbol: 'USDT', name: 'Tether USD' },
    { chainId: 56, address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, symbol: 'USDC', name: 'Binance-Peg USD Coin' }
] */

const tokenTrungGian = [
    { chainId: 1, address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, symbol: 'ETH', name: 'Ether', usdPrice: 1662.68 },
    { chainId: 1, address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, symbol: 'DAI', name: 'Dai Stablecoin', usdPrice: 1 },
    { chainId: 1, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, symbol: 'USDC', name: 'USD//C', usdPrice: 1 },
    { chainId: 1, address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, symbol: 'USDT', name: 'Tether USD', usdPrice: 1 },
    { chainId: 1, address: '0xc00e94Cb662C3520282E6f5717214004A7f26888', decimals: 18, symbol: 'COMP', name: 'Compound', usdPrice: 50 },
    { chainId: 1, address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', decimals: 18, symbol: 'MKR', name: 'Maker}', usdPrice: 50 }
]


const POOL_TYPE = {
    uniV2: 'uniV2',
    curveV1: 'curveV1'
}

const PRICE_IMPACT = 0.01
let listDataPool
const feeAllPoll = 0.003

const getAddressPoolV2 = (facAddress, initCode, DataTokenA, DataTokenB) => {
    const { symbol: symbolA, decimals: decimalsA, chainId: chainIdA, name: nameA, address: addressA } = DataTokenA
    const { symbol: symbolB, decimals: decimalsB, chainId: chainIdB, name: nameB, address: addressB } = DataTokenB

    const tokenA = new Token(chainIdA, addressA, decimalsA, symbolA, nameA)
    const tokenB = new Token(chainIdB, addressB, decimalsB, symbolB, nameB)
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

    return getCreate2Address(
        facAddress,
        keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
        initCode
    )
}

const getUnderlyingAddressCurve = async (address, coins) => {
    const contract = new web3duphong.eth.Contract(
        AbiPoolCurve,
        address
    );
    const listAddress = Promise.all(coins.map(async (item, index) => {
        return await contract.methods.underlying_coins(index).call()
    })).then(res => res)
        .catch(res => [])
    return listAddress
}

const getAddressPoolCurveV1 = async (DataTokenA, DataTokenB, listDataPool) => {
    if (DataTokenA.address.toUpperCase() === DataTokenB.address.toUpperCase()) return []

    const listPoolforPair = listDataPool.filter(item => {
        const upperCaseItem = item.coinsAddresses.map(item => item.toUpperCase())
        return upperCaseItem.includes(DataTokenA.address.toUpperCase()) &&
            upperCaseItem.includes(DataTokenB.address.toUpperCase())
    })
        .filter(item => item.assetTypeName === 'usd')
        .map(item => { return { ...item, type: POOL_TYPE.curveV1, name: item.name ? item.name : "noName" } })
    return listPoolforPair
}

const calcAmountOutUniV2 = (amountIn, reserveIn, reserveOut) => {
    const amountInWithFee = amountIn * 0.9975
    const numerator = amountInWithFee * reserveOut
    const denominator = reserveIn + amountIn
    return numerator / denominator
}

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

const getListAddressPool = async (addressTokenA, addressTokenB) => {
    const arrAddressPool = await Promise.all(
        factoryAddress.eth.map(async (item) => {
            const contract = new web3.eth.Contract(
                AbiBinanceSmart,
                item.factory
            );
            return await contract.methods.getPair(addressTokenA.address, addressTokenB.address).call().then(res => {
                return {
                    namePool: item.name,
                    address: res,
                }
            })
        })
    )
    let resultArr = arrAddressPool.filter(item => parseInt(item.address, 16) !== 0).map(item => { return { ...item, type: "uniV2" } })
    const arrAddressPoolCurve = await getAddressPoolCurveV1(addressTokenA, addressTokenB, listDataPool)
    resultArr = [...resultArr, ...arrAddressPoolCurve]
    return resultArr
}

const getReservePoolUniV2 = async (address, coins) => {
    const contract = new web3.eth.Contract(
        AbiPool,
        address
    );
    const token0 = await contract.methods.token0().call()
    const detailPool = await contract.methods.getReserves().call()

    let { _reserve0, _reserve1 } = detailPool

    if (token0 !== coins[0].address) {
        [_reserve0, _reserve1] = [_reserve1, _reserve0]
    }
    const [decimal0, decimal1] = [10 ** (36 - coins[0].decimals), 10 ** (36 - coins[1].decimals)]
    return [_reserve0 * decimal0, _reserve1 * decimal1]
}

const getReservePoolCurveV1 = async (address, coins) => {
    const contract = new web3.eth.Contract(
        AbiPoolCurve,
        address
    );

    const balances = await Promise.all(coins.map(async (item, index) => {
        return await contract.methods.balances(index).call()
    })).then(res => res)
        .catch(res => {
            return coins.map(item => 0)
        })

    const exchangeRate = await Promise.all(coins.map(async item => {
        const contractWapperToken = new web3.eth.Contract(
            AbiWapperToken,
            item.address
        );
        return await contractWapperToken.methods.exchangeRateStored().call()
    }))
        .then(res => res)
        .catch(res => {
            return coins.map(item => 1)
        })

    const realBalances = balances.map((item, index) => item * exchangeRate[index] * 10 ** (36 - coins[index].decimals))
    return realBalances
}

const findAllRoute = async (tokenA, tokenB, chain) => {
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

    await Promise.all(tokenTrungGian.map(async item => {

        if (item.address === tokenA.address || item.address === tokenB.address) return {}
        const AtoC = await getListAddressPool(tokenA, item)
        if (AtoC.length === 0) return {}
        const CtoB = await getListAddressPool(item, tokenB)
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

    const AtoB = await getListAddressPool(tokenA, tokenB)
    allRoute.push({
        route: [
            {
                subRoute: AtoB,
                namePair: `${tokenA.symbol} ---> ${tokenB.symbol}`,
                coins: [tokenA, tokenB]
            },
        ]
    })
    return allRoute
}

const getDetailPool = async (address, type, coins) => {
    try {
        switch (type) {
            case POOL_TYPE.uniV2:
                return await getReservePoolUniV2(address, coins)
            case POOL_TYPE.curveV1:
                return await getReservePoolCurveV1(address, coins)
            default:
                return []
        }
    }
    catch (err) {
        console.log(address)
    }
}

const calculateAmountTradedUniV2 = (priceImpactEst, dataPool, coins) => {

    const _reserve0 = dataPool[0]
    const amountTraded = (_reserve0 * priceImpactEst) / ((1 - priceImpactEst) * (1 - 0.0025))

    return amountTraded * coins[0].usdPrice
}

const calculateAmountTradedCurveV1 = (priceImpactEst, dataPool, coins, indexCurve) => {
    let amount

    try {
        amount = dataPool[indexCurve] * 0.96 * coins[indexCurve].usdPrice
    } catch (error) {
        console.log(coins, indexCurve)
    }
    return amount
}

const calculateAmountTraded = (priceImpactEst, type, dataPool, coins, indexTokenCurve) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return calculateAmountTradedUniV2(priceImpactEst, dataPool, coins)
        case POOL_TYPE.curveV1:
            return calculateAmountTradedCurveV1(priceImpactEst, dataPool, coins, indexTokenCurve)
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
            j: 1,
            A: item?.amplificationCoefficient,
            fee: item?.fee
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


const getDataPoolCurveV1 = async () => {
    const dataApi = await fetch('https://api.curve.fi/api/getPools/ethereum/main')
        .then((response) => response.json())

    const data = await Promise.all(dataApi.data.poolData.map(async item => {
        const underlyingAddress = []// await getUnderlyingAddressCurve(item.address, item.coins)
        const readAddress = []//item.underlyingCoins? item.underlyingCoins.map(item=>item.address):[]

        const contract = new web3.eth.Contract(
            AbiPoolCurve,
            item.address
        );

        const fee = await contract.methods.fee().call()

        return {
            ...item,
            amplificationCoefficient: parseInt(item.amplificationCoefficient),
            fee: parseInt(fee),
            coinsAddresses: [...item.coinsAddresses, ...underlyingAddress, ...readAddress]
        }
    }))

    return data

}

export const main = async (tokenA, tokenB, amount = 10000000) => {

    listDataPool = await getDataPoolCurveV1()

    const allRouter = await findAllRoute(tokenA, tokenB)

    const RoutePoolDetail = await Promise.all(allRouter.map(async item => {
        const route = await Promise.all(item.route.map(async routeItem => {
            const subRoute1 = await Promise.all(routeItem.subRoute.map(async it => {
                const coins = it.type === POOL_TYPE.uniV2 ? routeItem.coins : it.coins
                const indexCurve = getIndexTokenCurve(coins, routeItem.coins[1].address)
                const reserve = await getDetailPool(it.address, it.type, coins)
                const amountTradedEst = calculateAmountTraded(0.3, it.type, reserve, coins, indexCurve)
                return {
                    ...it,
                    reserve: reserve,
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

        const spliceEst = route.reduce((a, b) => a < b.totalAmountTradedest ? a : b.totalAmountTradedest, route[0].totalAmountTradedest)
        return {
            route: route,
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

        const amountOut = routeItem[routeItem.length-1].amountOut
        return {
            ...item,
            route: routeItem,
            splicePercent: item.spliceEst / total,
            amountIn: amountIn,
            amountOut:amountOut
        }
    })
    return resultRoute
}




