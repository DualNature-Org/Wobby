import Navigation from './components/navigation'
import Home from './pages/home/home'
import Tools from './pages/tools/tools'
import Playground from './pages/tools/playground'
import Services from './pages/services/services'
import About from './pages/about/about'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import UserLogin from './pages/user/login'
import UserRegister from './pages/user/register'
import UserDashboard from './pages/user/dashboard'
import AdminDashboard from './pages/admin/dashboard'
import Footer from './components/footer'
import OrderPage from './pages/payment/order'
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
        <Route path= '/user' element={<UserDashboard />} />
        <Route path= '/order' element={<OrderPage />} />
        <Route path= '/auth/login' element= {<UserLogin onChange={handle_login} logined={logined} handle_username={handle_username}/>} />
        <Route path= '/auth/register' element= {<UserRegister onChange={handle_login} logined={logined} handle_username={handle_username}/>} />
        <Route path= '/admin' element={<AdminDashboard />} />
        <Route path= '/tools' element={<Tools />} />
        <Route path= '/tools/playground' element={<Playground />} />
        <Route path= '/about' element={<About />} />
        <Route path= '/services' element={<Services />} />
      </Routes>

      <Footer/>

    </Router>
  )
}
