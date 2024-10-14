
import { allAtom } from './atoms'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { sumSelector } from './selector'



function App() {
  return <RecoilRoot>
    <TitleBar></TitleBar>
  </RecoilRoot>
}

function TitleBar(){
  const allAtoms=useRecoilValue(allAtom);
  const sum = useRecoilValue(sumSelector)
  return (
    <div>
      <button>Home</button>
      <button>My network ({allAtoms.network > 99 ? "99+": allAtoms.network})</button>
      <button>Jobs ({allAtoms.jobs > 99 ? "99+": allAtoms.jobs})</button>
      <button>Messages ({allAtoms.messaging > 99 ? "99+": allAtoms.messaging})</button>
      <button>Notifications ({allAtoms.notifications > 99 ? "99+": allAtoms.notifications})</button>
      <button>Me({sum})</button>
    </div>
  )
}

export default App
