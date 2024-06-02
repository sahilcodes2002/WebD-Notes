import { useEffect, useState } from 'react'
import './App.css'
import {RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { render } from './atoms/render';

function App() {
  
  return<div>
    <RecoilRoot>
      <IndsideRecoilComponent></IndsideRecoilComponent>
    </RecoilRoot>
  </div>
}

function IndsideRecoilComponent(){
  const renders2= useRecoilValue(render);
  const [renders1 , setRender1] = useState(true);
  useEffect(()=>{
    const blink = setInterval(()=>{
      setRender1(renders1=>!renders1);
    },5000)
    return ()=> clearInterval(blink)
  },[])

  return <div>
      {renders1?<div>hi you </div>:<></>}
      <MyComponent></MyComponent>
      {renders2?<MyComponent2/>:<></>}
  </div>

}

function MyComponent(){
  const setRender2 = useSetRecoilState(render);

  function rerenderit(){
    setTimeout(()=>{
      setRender2(true);
    },2000)
  }

  function derenderIt(){
    setRender2(false);
    rerenderit()
  }


  return <div>
    <div>
      hi lets play
    </div>
    <div>
      <button onClick={derenderIt}>deRender</button>
    </div>
  </div>
}

function MyComponent2(){

  useEffect(()=>{
    console.log("component mounted");

    return ()=>{
      console.log("component un mounted")
    };
  },[])
  return<div>
    my component 2 rendered
  </div>
}

export default App
