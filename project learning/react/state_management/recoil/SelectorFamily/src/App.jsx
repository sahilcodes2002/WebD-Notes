import { useEffect } from 'react';
import './App.css'
import { todosAtomFamily } from './atoms'
import { RecoilRoot, useRecoilState, useRecoilValue, useRecoilValueLoadable, useRecoilStateLoadable} from 'recoil'

function App() {
  
  return (
    <div>
      <RecoilRoot>
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



// import './App.css'
// import { RecoilRoot, useRecoilState, useRecoilStateLoadable } from 'recoil';
// import { todosAtomFamily } from './atoms';

// function App() {
//   return <RecoilRoot>
//     <Todo id={1}/>
//     <Todo id={2} />
//   </RecoilRoot>
// }

// function Todo({id}){
//   const [todo,setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
//   if(todo.state==="loading"){
//     return <div>
//       Loading....
//     </div>
//   }else if(todo.state==="hasValue"){
//     return <div>
//     {todo.contents.title}
//     <br/>
//     {todo.contents.description}
//   </div>
//   }
// }

// export default App
