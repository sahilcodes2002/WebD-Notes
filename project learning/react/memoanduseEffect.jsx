import { useState } from "react"
import { memo } from "react"
import { useEffect } from "react"
import { Fragment } from "react"

function App() {
  const [todos , setTodos] = useState([])

  useEffect(function(){
    setInterval(function(){
      fetch("https://sum-server.100xdevs.com/todos")
      .then(async function(response){
      const json = await response.json();
      console.log(json)
      setTodos(json.todos);
    })
    },2000)
  },[])

  return <div>
      {todos.map(function(todo){
        return <CardWrapper key={todo.id}>
        <Todo id={todo.id} title={todo.title} description={todo.description}></Todo>
        </CardWrapper>
      })}
  </div>
  
}



const Todo = memo(function(props){
  return <Fragment>
    <h2>{props.id}</h2> 
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </Fragment>
})


function CardWrapper({children}){
  return <div style={{border:"2px solid black",padding:20,margin:2}}>
    {children}
  </div>
}




export default App
