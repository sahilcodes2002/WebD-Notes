import  { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import React, { Suspense } from 'react'
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Landing= React.lazy(() => import('./components/Landing'))  


function App() {
   
  return (
    <div>
      <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route path="/dashboard" element={<Suspense fallback={"loading.."}><Dashboard/></Suspense>}/>
        <Route path="/" element={<Suspense fallback={"loading.."}><Landing/></Suspense>}/>
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
