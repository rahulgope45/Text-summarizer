import './App.css'
import { Router,Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import Navbar2 from './components/Navbar2'
import History from './pages/History'
import { useAuth } from './context/authcontext'

function App() {
  const {user , loading} =useAuth();

  if(loading) return <div>Loading...</div>
  

  return (
    <>
    { user ? <Navbar/> : <Navbar2/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    
     
    </>
  )
}

export default App
