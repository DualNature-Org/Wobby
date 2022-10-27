import Navigation from './components/navigation'
import Home from './pages/home/home'
import Tools from './pages/tools/tools'
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
import { useState } from 'react'

export default function App(){
  const [login_status, set_login_status]= useState(false)

  return(
    <Router>

      <Navigation/>

      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path= '/user' element={<UserDashboard />} />
        <Route path= '/auth/login' element= {<UserLogin />} />
        <Route path= '/auth/register' element= {<UserRegister />} />
        <Route path= '/admin' element={<AdminDashboard />} />
        <Route path= '/tools' element={<Tools />} />
        <Route path= '/about' element={<About />} />
        <Route path= '/services' element={<Services />} />
      </Routes>

      <Footer/>

    </Router>
  )
}
