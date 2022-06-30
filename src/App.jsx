import Navigation from './components/navigation'
import Home from './pages/home/home'
import React  from 'react'


class App extends React.Component{
  render(){
    return(
      <div>
        <Navigation/>
        <Home/>
        {/* <MainContainer/> */}
        {/* <Footer/> */}
      </div>
    )
  }
}

export default App
