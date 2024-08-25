import './App.css'
import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Trading from './components/Trading'
const App=()=>{
  const [holdings, setHoldings]=useState([])

  const updateholdings=(holds)=>{
    setHoldings(holds)
  }

 return (<Routes>
    <Route path='/' element={<Dashboard holdings={holdings}/>} />
    <Route exact path='/trade' element={<Trading holdings={holdings} updateholdings={updateholdings}/>} />
  </Routes>)
  
}



export default App;
