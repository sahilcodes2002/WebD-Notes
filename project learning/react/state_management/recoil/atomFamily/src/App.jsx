import { useEffect, useState } from 'react'
import './App.css'
import { todosAtomFamily } from './atoms'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'

function App() {
  
  return (
    <div>
      <RecoilRoot>
        <UpdateTodo></UpdateTodo>
        <Todo id={1}></Todo>
        <br/>
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

function UpdateTodo(){
  const updateTodo2 = useSetRecoilState(todosAtomFamily(2));
  useEffect(()=>{
    setTimeout(()=>{
      updateTodo2({
        id: 2,
        title: "more DSA",
        desc: "practice"
      })
    },5000)
  },[])
}

function Todo({id}){
  const currentTodo = useRecoilValue(todosAtomFamily(id));
  return <div>
    {currentTodo.title}
    <br/>
    {currentTodo.desc}
  </div>
}
export default App
