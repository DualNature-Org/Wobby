import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack';

import NavBtn from './nav-btn'

class Navigation extends React.Component{
    render(){
        return(
            <Router>
            <Box sx={{height: 50, backgroundColor: "#333" }}>
                <Grid container >
                    <Grid item xs={6}>
                        <p>WOBBY</p>
                    </Grid>
                    <Grid item xs={6}>
                        <NavBtn name='home' link='/home'/>
                    </Grid>
                </Grid>
            </Box>
            </Router>
        )
    }
}

export default Navigation