import  { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Landing } from './components/Landing'

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Landing/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  )
}

function Appbar(){
  const navigate = useNavigate();
  return <div id="topbar" style={{backgroundColor:"black", color:"white", padding:7, display:'flex', justifyContent:'space-evenly'}}>
          <button style={{backgroundColor:"black", color:"white",marginright:100, padding:5}} onClick={function(){
            navigate("/")
          }}>dashboard</button>
          <button style={{backgroundColor:"black", color:"white",marginLeft:100, padding:5}} onClick={function(){
            navigate("/dashboard")
          }}>landing</button>
    </div>
}

export default App
