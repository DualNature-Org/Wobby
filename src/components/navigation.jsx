import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, IconButton, createTheme, ThemeProvider} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';


function Header(props) {
  const [value, setValue]= useState(0);
  const [is_paper, set_is_paper] = useState(false);

  // For dynamic height of navbar
  const location = useLocation()
    useEffect(() => {
      if(location.pathname==='/tools/paper'){
        set_is_paper(true)
      }
      else{
        set_is_paper(false)
      }
    }, [location])

  const handle_login= ()=> {
    if(props.logined){
      return props.username
    }
    return 'Dashboard'
  }

  const theme = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                dense: is_paper ? {minHeight: '48px'} : {minHeight: '64px'}
            }
        }
    },
})

  return(
    <ThemeProvider theme={theme}>
    <AppBar sx= {{position: 'fixed', height: is_paper ? '48px' : 'auto', boxShadow: 0}}>
    <Toolbar variant='dense'>
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
    </ThemeProvider>
  )
}

export default Header
