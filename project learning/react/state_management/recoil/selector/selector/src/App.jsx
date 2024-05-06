
import { countAtom } from './store/atoms/countAtom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { countSelector } from './store/selectors/selector';


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
    <Even></Even>
  </div>
}

function Rendercount(){
  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
}

function Even(){
  
  const isEven = useRecoilValue(countSelector)
    return <div>
      {isEven==0 ? "Even" : null}
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
