import { title } from "./store/atoms/title"
import { desc } from "./store/atoms/desc"
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { todos } from "./store/atoms/todos"
import { key } from "./store/atoms/key"
import { filterKey } from "./store/atoms/filterKey"
import { selectedTodo } from "./store/selectors/todoSelector"
import './App.css';

function App() {

  return (
    <div className="container">
      <RecoilRoot>
        <div className="left-section">
          <h1 id="heading">Enter Your Todos</h1>
          <div id="title"><Tinput /></div>
          
          <div id ="desc"><Dinput /></div>
          
          <div id="btn"><Button /></div>
          
          <div id="allt"><AllTodos /></div>
          
        </div>
        <div className="right-section">
        <h1 id="heading">Search Your Todos</h1>
          <div id="filter"><FilterInput /></div>
          
          <div id="filtered"><AllFilterdTodos  /></div>
          
        </div>
      </RecoilRoot>
    </div>
  );
}

function Tinput(){
  const [t,setTitle] = useRecoilState(title);
  return <div id="t1">
    <input onChange={function(e){
      setTitle(e.target.value)
    }} placeholder="Title of Todo"></input>
  </div>
}

function Dinput(){
  const [d,setDesc] = useRecoilState(desc);
  return <div>
    <input onChange={function(e){
      setDesc(e.target.value)
    } }placeholder="Description of Todo"></input>
  </div>
}

function FilterInput(){
  const [f,setFilter] = useRecoilState(filterKey);
  return <div>
    <input onChange={function(e){
      if(e.target.value==""){
        setFilter("/n%")
      }
      else{
        setFilter(e.target.value)
      }
    } } placeholder="Search"></input>
  </div>
}



function Button(){
  const t = useRecoilValue(title);
  const d = useRecoilValue(desc);
  const [todo,setTodoList] = useRecoilState(todos);
  const [k,setK] = useRecoilState(key);
  return <div>
    <button onClick={function(){
      setTodoList([...todo,[t,d,k]]);
      setK(k=>k+1);
      
    }}>
      Submit
    </button>
  </div>

}

function AllTodos(){
  const t = useRecoilValue(todos);

  return <div>
    {t.map(function(mp){
      return <TodoPrint key={mp[2]} title={mp[0]} desc={mp[1]}></TodoPrint>
    })}
  </div>
}
function AllFilterdTodos(){
  const t = useRecoilValue(selectedTodo);

  return <div>
    {t.map(function(mp){
      return <TodoPrint key={mp[2]} title={mp[0]} desc={mp[1]}></TodoPrint>
    })}
  </div>
}

function TodoPrint({title, desc}){
  
  return <div>
    <h1>{title}</h1>
    <h3>{desc}</h3>
  </div>
}



export default App
