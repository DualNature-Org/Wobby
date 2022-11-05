import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';


function Header(props) {
  const [value, setValue]= useState();

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
        <Typography variant='h6' color={'#fff'} sx={{opacity: '0.9'}}>
          <AdbIcon fontSize='medium'/>WOBBY
        </Typography>
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
