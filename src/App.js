import logo from './logo.svg';
import './App.css';
import { main } from './curvev1';
import { useEffect, useState } from 'react'
import { POOL_TYPE } from './curvev1/constants';


const SubPool = ({ dataSubRoute }) => {

  const colorOfType = {
    [POOL_TYPE.uniV2]:'red',
    [POOL_TYPE.uniV3]:'green',
    [POOL_TYPE.curveV1]:'blue',
    [POOL_TYPE.curveV2]:'yellow'
  }

  return (
    <div className='subpool'>
      <div>
        {dataSubRoute.namePair
        }
      </div>
      <div className='poolbody'>
        {dataSubRoute.subRoute.map(item => {
          return (
            <div className='item-pool'>
              <span className='namePool'>
                <a href={`https://etherscan.io/address/${item.address}`} target="_blank">
                  {item.namePool ? item.namePool : item.name}
                </a>


                <span style={{ color: `${colorOfType[item.type]}` }}>  {item.type}</span>
              </span>
              {/* <span>{item.maxAmount}</span> */}


              <span>{item.splicePercent * 100}%</span>
              <span>{item?.rate}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}



const PoolCard = ({ dataRoute, percent }) => {
  return (
    <>

      <div className='poolcard'>
        {dataRoute.map(item => <SubPool dataSubRoute={item} />)}
      </div>
      <div>{`${percent * 100}%`}</div>
    </>
  )
}



function App() {


  const usdt = { "chainId": 56, "decimals": 6, "address": "0xdac17f958d2ee523a2206206994597c13d831ec7", "symbol": "usdt" ,usdPrice:1}
  const dai = { "chainId": 56, "decimals": 18, "address": "0x6b175474e89094c44da98b954eedeac495271d0f", "symbol": "dai" ,usdPrice:1}
  const frax ={ "chainId": 56, "decimals": 18, "address": "0x853d955aCEf822Db058eb8505911ED77F175b99e", "symbol": "frax" ,usdPrice:1}
  const usdc={ chainId: 1, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, symbol: 'USDC', name: 'USD//C', usdPrice: 1 }

  const cake ={ address:"0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82","chainId": 56, "decimals": 18, "symbol": "CAKE"}
  const dodo ={ address:"0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2","chainId": 56, "decimals": 18, "symbol": "DODO"}
  const bnb ={ address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c","chainId": 56, "decimals": 18, "symbol": "BNB"}
  const busd ={ address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56","chainId": 56, "decimals": 18, "symbol": "BUSD"}
  

  const token1V2 ={ address:"0xBf5140A22578168FD562DCcF235E5D43A02ce9B1","chainId": 56, "decimals": 18, "symbol": "UNI"}


  const [dataRoute, setDataRoute] = useState([])
  const [input,setInput] = useState(0)
  const [outPut,setOutPut] =useState(0)
  const [percentLimit,setPercentLimit] = useState(0)

  const init = async () => {
    const data = await main(usdt, dai,input*(10**36),percentLimit)
    console.log("🚀 ~ file: App.js:59 ~ init ~ data", data)
    setDataRoute(data)
    const out = data.reduce((a,b)=>a+b.amountOut,0)/(10**36)
    setOutPut(out)
  }

  
  const handleClick =()=>{

    const percent = percentLimit>0 ? 0:0.01
    setPercentLimit(percent)
  }

  useEffect(() => {
    const a = setTimeout(()=>{
      init()
    },200)

    return ()=>{
      clearTimeout(a)
    }
  }, [input,percentLimit])

  return (
    <div className="supper-link">
      <div className='router'>
        {dataRoute.map(item => <PoolCard dataRoute={item.route} percent={item.splicePercent} />)}
      </div>
      <div className='input-amount'>
        
        <div className='input-amount_card'>
          <div className='input'>
            <input value={input} onChange={e=>setInput(e.target.value)}></input>
          </div>
          <div className='input'>
            <input value={outPut}></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
