import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material';
import { Link } from 'react-router-dom';


function Header(props) {
  const [value, setValue]= useState();

  const handle_login= ()=> {
    if(props.logined){
      return props.username
    }
    return 'Login'
  }

  return(
    <AppBar sx= {{position: 'fixed'}}>
    <Toolbar>
      <Link to={'/'}>
        <Typography>WOBBY</Typography>
      </Link>

      <Tabs sx={{marginLeft: 'auto'}} onChange={(e, value)=> setValue(value)} value={value}>
        <Link to={'/tools'}>
          <Tab label= 'Tools'/>
        </Link>
        <Link to={'/auth/login'}>
          <Tab label= {handle_login()}/>
        </Link>
      </Tabs>
    </Toolbar>
    </AppBar>
  )
}

export default Header
