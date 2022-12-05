import Navigation from './components/navigation'
import Home from './pages/home/main'
import Tools from './pages/tools/tools'
import Services from './pages/services/services'
import About from './pages/home/about'
import UserLogin from './pages/auth/login'
import UserRegister from './pages/auth/register'
import UserDashboard from './pages/user/dashboard'
import AdminDashboard from './pages/admin/dashboard'
import Footer from './components/footer'
import OrderPage from './pages/auth/order'
import Paraphraser from './pages/tools/paraphrase'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// testing tools are here
import Paper from './pages/tools/paper'

import { useState } from 'react'

export default function App(){
  const [username, set_username]= useState('')
  const [logined, set_logined]= useState(false)

  const handle_login= ()=> {
    set_logined(true)
  }
  const handle_username= (username)=> {
    set_username(username)
  }

  return(
    <Router>

      <Navigation username={username} logined={logined}/>

      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path= '/user' element={<UserDashboard/>} />
        <Route path= '/auth/login' element= {<UserLogin onChange={handle_login} logined={logined} handle_username={handle_username}/>} />
        <Route path= '/auth/register' element= {<UserRegister onChange={handle_login} logined={logined} handle_username={handle_username}/>} />
        <Route path= '/auth/order' element={<OrderPage />} />
        <Route path= '/tools' element={<Tools />} />
        <Route path= '/tools/paper' element={<Paper />} />
        <Route path= '/tools/paraphraser' element={<Paraphraser />} />
        <Route path= '/about' element={<About />} />
        <Route path= '/services' element={<Services />} />
        <Route path= '/admin' element={<AdminDashboard />} />
      </Routes>

      <Footer/>

    </Router>
  )
}
