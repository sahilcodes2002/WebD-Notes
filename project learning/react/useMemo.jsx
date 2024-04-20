import { useMemo, useState } from "react"
import { useEffect } from "react"


function App() {
  console.log("rerender")
  
  const [num , setNum] = useState(0);
  const [counter , setCounter] = useState(0);

  let finalsum = useMemo(function(){
    let n=parseFloat(num);
    let sum = n*(n+1)/2;
    return sum.toString();
  },[num]);

  return <div>
    <input onChange={function(e){
      let n = e.target.value;
      
      setNum(n);
      
    }}></input>
    <div>
      {finalsum}
    </div>
    <button onClick={function(){
      setCounter(counter+1);
    }}>Counter({counter})</button>
    
  </div>
  
}


function Todo({id}){
  const [todos , setTodos] = useState({})

  useEffect(function(){
    fetch("https://sum-server.100xdevs.com/todo?id="+id)
    .then(async function(res){
      const json = await res.json()
      setTodos(json.todo);
    })
  },[id])

  return <CardWrapper>
    <p>ID: {id}</p>
    <h1>{todos.title}</h1>
    <h2>{todos.description}</h2>
  </CardWrapper>
}

function CardWrapper({children}){
  return <div style={{border:"2px solid black", padding:20 , margin: 20}}>
    {children}
  </div>
}




export default App
