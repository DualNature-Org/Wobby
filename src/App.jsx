import Navigation from './components/navigation'
import Home from './pages/home/home'
import Tools from './pages/tools/tools'
import Services from './pages/services/services'
import About from './pages/about/about'
import Dashboard from './pages/user/dashboard'
import Profile from './pages/user/profile'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import AdminLogin from './pages/admin/admin_login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


export default function App(){
  return(
    <Router>

      <Navigation/>

      <Routes>
        <Route path= '/admin' element={<AdminLogin />} />
        <Route path= '/services' element={<Services />} />
        <Route path= '/tools' element={<Tools />} />
        <Route path= '/about' element={<About />} />
        <Route path= '/login' element={<Login />} />
        <Route path= '/register' element={<Register />} />
        <Route path= '/dashboard' element={<Dashboard />} />
        <Route path= '/profile' element={<Profile />} />
        <Route path= '/' element={<Home />} />
      </Routes>

    </Router>
  )
}
