import './index.css'

import {useState, useEffect} from 'react'
import Navbar from '../Navbar'

const Trading=({holdings,updateholdings})=>{
    const [symbol, setSymbol]=useState('')
    const [quantity, setQuantity]=useState(0)
    const [stockprice , setPrice]=useState(0)
    const [stockVolume, setStockVolume] = useState(0);
    const [error, seterror]=useState(null)

    useEffect(()=>{
        const fetchstocksdata=async ()=>{
            try{   
                const response=await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=demo`)
                if (!response.ok) {
                    throw new Error('Network not responded');
                }
                const data=await response.json()
                const lastrefreshed=data['Meta Data']['3. Last Refreshed']
                const stockdata=data['Time Series (5min)'][lastrefreshed]
                setPrice(parseFloat(stockdata['4. close']))
                setStockVolume(parseInt(stockdata['5. volume'], 10))
                seterror(null)
            }
            catch (err){
                seterror('error fetching stocks')
            }
        }

        if (symbol){
            fetchstocksdata()
        }
    }, [symbol])

    

    const handletrade=(value)=>{
        const newholdings=[...holdings]
        const stockidx=newholdings.findIndex(each=>each.symbol===symbol)
        
        if (value==='buy'){
            if ( quantity>0 &&quantity<=stockVolume){
                if (stockidx >=0){
                    newholdings[stockidx].quantity+=quantity
                }
                else{
                    newholdings.push({symbol, quantity, price:stockprice})
                }
            }
            else{
                alert(`exceeded available volume of ${stockVolume}`)
            }
        }

        if (value==='sell'){
            if (stockidx >= 0) {
                if (quantity <= newholdings[stockidx].quantity) {
                    newholdings[stockidx].quantity -= quantity;
                    if (newholdings[stockidx].quantity <= 0) {
                        newholdings.splice(stockidx, 1);
                    }
                } else {
                    alert(`You do not have enough stock to sell. Available: ${newholdings[stockidx].quantity}`);
                }
            } else {
                alert("You do not have this stock");
            }
        }

        updateholdings(newholdings)

    }

    return (
        <div className='tradecontainer'>
            <Navbar />
            <div className='tradecard'>
            <h1 className='trade-heading'>Trade latest Stocks </h1>
            <div className='inputs'>
                <input className='input-card' type='text' value={symbol} placeholder='Enter Stock Symbol'
                onChange={(e)=>setSymbol(e.target.value.toUpperCase())} />
                
                <input className='input-card' type='number' value={quantity}
                onChange={(e)=>setQuantity(parseInt(e.target.value, 10))} />
                
            </div>
            <button className='tradebutton' type='button' onClick={()=>handletrade('buy')}>BUY</button>
            <button className='tradebutton' type='button' onClick={()=>handletrade('sell')}>SELL</button>
            {stockprice !== null && <p className='pricepara'>Current Price of {symbol}: $ {stockprice}</p>}
            {error && <p className='errorpara'>{error}</p>}

            </div>
        </div>
    )
}

export default Trading