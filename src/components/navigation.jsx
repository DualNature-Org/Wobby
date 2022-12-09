import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, IconButton} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';


function Header(props) {
  const [value, setValue]= useState(0);

  const handle_login= ()=> {
    if(props.logined){
      return props.username
    }
    return 'Dashboard'
  }

  return(
    <AppBar sx= {{position: 'fixed'}}>
    <Toolbar>
      <Link to={'/'}>
        <IconButton sx={{color: '#fff'}}>
        <AdbIcon />
        <Typography variant='h6' sx={{opacity: '0.9'}}>WOBBY</Typography>
        </IconButton>
      </Link>

      <Tabs sx={{marginLeft: 'auto'}} onChange={(e, value)=> setValue(value)} value={value}>
        <Link to={'/tools'}>
          <Tab label= 'Tools' sx={{fontWeight: '600', color: '#fff', opacity: '.9'}}/>
        </Link>
        <Link to={'/auth/login'}>
          <Tab label= {handle_login()} sx={{fontWeight: '600', color: '#fff', opacity: '.9'}}/>
        </Link>
      </Tabs>
    </Toolbar>
    </AppBar>
  )
}

export default Header
