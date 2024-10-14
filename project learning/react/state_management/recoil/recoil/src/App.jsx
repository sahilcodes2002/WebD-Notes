
import { countAtom } from './atoms/countAtom'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';


function App() {
  return (
    <div>
      <RecoilRoot>
        <Count></Count>
      </RecoilRoot>
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
  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
}

function Button(){
  const setCount = useSetRecoilState(countAtom);
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
