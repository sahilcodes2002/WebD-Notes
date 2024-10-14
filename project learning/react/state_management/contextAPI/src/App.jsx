import { useState, useContext } from 'react'
import { countContext } from './context'


function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <countContext.Provider value={{count, setCount}}>
        <Count></Count>
      </countContext.Provider>
    </div>
  )
}

function Count(){
  return <div>
    <Rendercount></Rendercount>
    <Button></Button>
  </div>
}

function Rendercount(){
  const count = useContext(countContext).count;
  return <div>
    {count}
  </div>
}

function Button(){
  const {count, setCount} = useContext(countContext);
  return <div>
    <button onClick={function(){
      setCount(count=>count+1)
    }}> Increment </button>
    <button onClick={function(){
      setCount(count=>count-1)
    }}> decrement</button>
  </div>
}

export default App
