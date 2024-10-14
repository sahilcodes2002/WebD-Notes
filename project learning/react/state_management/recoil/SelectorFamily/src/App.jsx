import { useEffect } from 'react';
import './App.css'
import { todosAtomFamily } from './atoms'
import { RecoilRoot, useRecoilState, useRecoilValue, useRecoilValueLoadable, useRecoilStateLoadable, useSetRecoilState} from 'recoil'

function App() {
  
  return (
    <div>
      <RecoilRoot>
        <UpdateLate></UpdateLate>
        <Todo id={1}></Todo>
        <Todo id={2}></Todo>
        <Todo id={2}></Todo>
        <Todo id={2}></Todo>
        <Todo id={2}></Todo>
        <Todo id={2}></Todo>
        <Todo id={2}></Todo>
      </RecoilRoot>
    </div>
  )
}

function UpdateLate(){
  const setValue = useSetRecoilState(todosAtomFamily(2));
  useEffect(()=>{
    setTimeout(function(){
      setValue({
        id:2,
        title:"changed",
        description:"changed"
      })
    },5000);
  },[])
  return null;
}


function Todo({id}){
  const todo = useRecoilValueLoadable(todosAtomFamily(id));
  if(todo.state==="loading"){
    return <div>
      Loading....
    </div>
  }else if(todo.state==="hasValue"){
    return <div>
    {todo.contents.title}
    <br/>
    {todo.contents.description}
  </div>
  }else if(todo.state==="hasError"){
    return <div>
      Error while getting data from Backend
    </div>
  }
}



 export default App


