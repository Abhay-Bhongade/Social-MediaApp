import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserSignUp from './Components/User/UserSignUp'
import { BrowserRouter,Routes,Route,Outlet} from "react-router-dom"
import UserLogin from './Components/User/UserLogin'
import DisplayUserProfiles from "./Components/User/DisplayUserProfiles"
import FriendRequestListData from "./Components/User/FriendRequestListData"



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path='/' element={<UserSignUp />} />
  <Route path='/login' element={<UserLogin />} />
  <Route path="/user-profile" element={<DisplayUserProfiles />} />
  <Route   path="/friend-requests" element={<FriendRequestListData />} />




</Routes>
</BrowserRouter>
    </>
  )
}

export default App
