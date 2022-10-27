import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Header(props) {
  const [value, setValue]= useState();

  return(
    <AppBar sx= {{background: '#918983', position: 'fixed', color: '#000'}}>
    <Toolbar>
      <Link to={'/'}>
        <Typography>WOBBY</Typography>
      </Link>
      <Tabs sx={{marginLeft: 'auto'}} onChange={(e, value)=> setValue(value)} value={value}>
        <Link to={'/tools'}>
          <Tab label= 'Tools'/>
        </Link>
        <Link to={'/auth/login'}>
          <Tab label= 'Login'/>
        </Link>
      </Tabs>
    </Toolbar>
    </AppBar>
  )
}

export default Header
