import { useCallback, useMemo, useState } from "react"
import { useEffect } from "react"


function App() {
  
  const [counter , setCounter] = useState(0);

  const propFunction = useCallback(function(){
    console.log("hi there");
  },[])

  return <div>
    <ComponentNew propFunction={propFunction}></ComponentNew>
    <button onClick={function(){
      setCounter(function(c){
        return c+1;
      })
      setCounter(function(c){
        return c+1;
      })
    }}>Counter({counter})</button>
    
  </div>
  
}


function ComponentNew({propFunction}){
  console.log("render")
  return <button>
    do nothing
  </button>
}




export default App
