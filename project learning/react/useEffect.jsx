import { useState } from "react"
import { useEffect } from "react"


function App() {
  const [idx , setIDX] = useState(1)
  return <div>
     <div>
      <button onClick={function(){
          setIDX(1);
      }}>1</button>
      <button onClick={function(){
          setIDX(2);
      }}>2</button>
      <button onClick={function(){
          setIDX(3);
      }}>3</button>
      <button onClick={function(){
          setIDX(4);
      }}>4</button>
      <button onClick={function(){
          setIDX(5);
      }}>5</button>
    </div>
      <Todo id={idx}></Todo>
  </div>
  
}


function Todo({id}){
  const [todos , setTodos] = useState({})
  

  useEffect(function(){
    fetch("https://sum-server.100xdevs.com/todo?id="+id)
    .then(async function(res){
      const json = await res.json();
      console.log(json)
      setTodos(json.todo);
    })
  },[id])

  return <CardWrapper>
       
    <h1>{todos.title}</h1>
    <h1>{todos.description}</h1>
  </CardWrapper>
}


function CardWrapper({children}){
  return <div style={{border:"2px solid black",padding:20,margin:2}}>
    {children}
  </div>
}




export default App





// OR





import { useState } from "react"
import { useEffect } from "react"


function App() {
  
  return <div>
      <Todo id={1}></Todo>
  </div>
  
}


function Todo({id}){
  const [todos , setTodos] = useState({})
  const [idx , setIDX] = useState(id)

  useEffect(function(){
    fetch("https://sum-server.100xdevs.com/todo?id="+idx)
    .then(async function(res){
      const json = await res.json();
      console.log(json)
      setTodos(json.todo);
    })
  },[idx])

  return <CardWrapper>
        <div>
      <button onClick={function(){
          setIDX(1);
      }}>1</button>
      <button onClick={function(){
          setIDX(2);
      }}>2</button>
      <button onClick={function(){
          setIDX(3);
      }}>3</button>
      <button onClick={function(){
          setIDX(4);
      }}>4</button>
      <button onClick={function(){
          setIDX(5);
      }}>5</button>
    </div>
    <h1>{todos.title}</h1>
    <h1>{todos.description}</h1>
  </CardWrapper>
}


function CardWrapper({children}){
  return <div style={{border:"2px solid black",padding:20,margin:2}}>
    {children}
  </div>
}




export default App
