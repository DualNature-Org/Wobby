import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

// MUI components
import Box from '@mui/material/Box';
import { Typography, Button, Container, Stack } from '@mui/material';
import logo from '../../asset/icons/logo_wobby.png'
import Footer from '../../components/home/footer';
import Pricing from '../../components/home/pricing';
import Reviews from '../../components/home/reviews';
import Bot from 'react-chat-bot-joy-2';

export default function SimpleContainer() {
  // states
  const [redirect, set_redirect]= useState(false)
  
  const handle_redirect= ()=> {
    set_redirect(true)
  }
  
  return (
    redirect? <Navigate to='/tools'/>: 
    <React.Fragment>

      <Bot />
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', textAlign:'center', height:'100vh'}} >
        <Box sx={{display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <img src={logo} style={{width: '100px', height: '120px'}}></img>
            <Typography variant='h5'>
                Provide Digital Content Solution
            </Typography>
            <Typography variant='body1'>
                We provide Tools for creating Digital Content using Artificial Intelligence.
            </Typography>
            <Button variant='contained' sx={{marginTop: '1rem'}} onClick={handle_redirect}>
              Try For Free ...
            </Button>
        </Box>
      </Container>

      <Container maxWidth={false} sx={{ padding: '12rem 0',background: '#d7f2ff', textAlign: 'center', display:'flex', justifyContent:'center'}}>
        <Box sx={{maxWidth:'800px'}}>
          <Typography variant='h4' marginBottom={3}>About</Typography>
          <Typography variant="body1">
            WOBBY is a project that provides tools for creating digital content using artificial intelligence. The project is developed by DualNature, a company that specializes in artificial intelligence and machine learning. The goal of the project is to make it easier for people to create digital content, such as articles and blogs. The project is still in its early stages, but the company is already working on a number of features that will make it easier for users to create and manage their content.
          </Typography>
        </Box>
      </Container>

      <Pricing />

      <Reviews />

      <Footer />

    </React.Fragment>
  );
}
