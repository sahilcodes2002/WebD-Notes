import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

function useTodos(){ //custom hook with laoding 
  const [todos, setTodos] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    async function getData(){
      axios.get("https://sum-server.100xdevs.com/todos").then(response=>{
        setTodos(response.data.todos);
        setLoading(false);
      })
    }
    setTimeout(() => {
      getData();
    }, 600);
  },[])
  return {todos,loading};
}


function useTodosAutoRefreshing(t){ //autorefreshing custom hook
  const [todos, setTodos] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    async function getData(){
      axios.get("https://sum-server.100xdevs.com/todos").then(response=>{
        setTodos(response.data.todos);
        setLoading(false);
      })
    }
    getData();
    const intveralvalue = setInterval(getData,t*1000);
    return ()=>{
      clearInterval(intveralvalue);
    }
  },[t])

  return {todos,loading};
}


function useOnline(){
  const [isonline, setIsonline] = useState(true);

  useEffect(()=>{
    window.addEventListener('online', ()=>{setIsonline(true)});
    window.addEventListener('offline',()=>{setIsonline(false)});


    return ()=>{
      window.removeEventListener('offline',()=>{setIsonline(false)});
      window.removeEventListener('online', ()=>{setIsonline(true)});
    }
  },[])
  return isonline;
}




function useMousePointer(){
  const [mousePointer, setMousePointer] = useState({x:0,y:0});
  function handleMouseMove(e){
    setMousePointer({x:e.clientX,y:e.clientY});
  }
  useEffect(()=>{
    window.addEventListener('mousemove',handleMouseMove);

    return ()=>{
      window.removeEventListener('mousemove',handleMouseMove)
    }
  },[])


  return mousePointer;
}




function useDimensions(){
  const [dimension, setDimension] = useState({h:window.innerHeight,w:window.innerWidth});
  function handleResize(e){
    setDimension({
      h:window.innerHeight,
      w:window.innerWidth
    })
  }
  useEffect(()=>{
    window.addEventListener('resize',handleResize);

    return ()=>{
      window.removeEventListener('resize',handleResize);
    }
  },[]);

  return dimension;
}


function useTimer(){
  const [time, setTimer] = useState(0);

  useEffect(()=>{
    function incTimer(){
      setTimer(time=>time+1);
    }

    //incTimer();
    const intervalValue =  setInterval(incTimer,1000);

    return ()=>{
      clearInterval(intervalValue);
    }
  },[])

  return time;
}


function useDebounced({value,k}){
  const [debouncedValue,setDebouncedValue] = useState(value);
  
  useEffect(()=>{
    const timeoutvalue = setTimeout(()=>{
      setDebouncedValue(value);
    },k)

    return ()=>{
      clearTimeout(timeoutvalue);
    }
  },[value])

  return debouncedValue;

}


function debounced2(value, t){
  const [debouncedVal, setDebouncedVal] = useState("");

  let lastTimeout = null;
  useEffect(()=>{
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(setDebouncedVal(value),t);
  },[value])

  return debouncedVal;
}




function App(){
  const [inputValue, setInputValue] = useState("");
  const {todos,loading}=useTodosAutoRefreshing(5);
  const online = useOnline();
  const {x,y} = useMousePointer();
  const {h,w} = useDimensions();
  const timeis  = useTimer();
  const debouncedValue = useDebounced({value:inputValue,k:1000});

  if(loading){
    return<div>
      {online?<>you are online yay</>:<>you are offline</>}
      loading ...................
    </div>
  }


  return <div>
    <div>
      debounced input :{debouncedValue} <br/>
      {inputValue} <br/>
      <input onChange={(e)=>{
        setInputValue(e.target.value);
      }} type="text" placeholder="search" ></input>
    </div>
    timer is : {timeis}<br/>
    H :  {h}<br/>
    W :  {w}<br/>
    Mouse pointer at: [{x}] [{y}]
    <br></br>
    {online?<>you are online yay</>:<>you are offline</>}
    {todos.map((todo)=>{
      return <Todo key={todo._id} title={todo.title} description={todo.description}></Todo>
    })}
  </div>
}

function Todo({title,description}){
  return<div>
    <h1>
      {title}
    </h1>
    {description}
  
  </div>
}

export default App
