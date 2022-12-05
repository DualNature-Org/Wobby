import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Container, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import logo from './logo_wobby.png'
import { useState } from 'react';

export default function SimpleContainer() {
  const [redirect, set_redirect]= useState(false)
  
  const handle_redirect= ()=> {
    set_redirect(true)
  }
  
  return (
    redirect? <Navigate to='/tools'/>: 
    <React.Fragment>

      <Box sx={{ padding: '4rem 0', marginTop: '3rem', textAlign: 'center'}} >
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={logo} style={{width: '100px', height: '120px'}}></img>
            <Typography variant='h5'>
                Provide Digital Content Solution
            </Typography>
            <Typography variant='body1'>
                We provide Tools for creating Digital Content using Artificial Intelligence.
            </Typography>
            <Button variant='contained' sx={{marginTop: '2rem'}} onClick={handle_redirect}>
              Try For Free ...
            </Button>
        </Container>
      </Box>

      <Box sx={{ padding: '3rem 0',background: '#d7f2ff', textAlign: 'center'}}>
        <Container>
          <Typography variant='h5' marginBottom={2}>About</Typography>
          <Typography variant="body1">
            WOBBY is a project that provides tools for creating digital content using artificial intelligence. The project is developed by DualNature, a company that specializes in artificial intelligence and machine learning. The goal of the project is to make it easier for people to create digital content, such as articles and blogs. The project is still in its early stages, but the company is already working on a number of features that will make it easier for users to create and manage their content.
          </Typography>
        </Container>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <a href='https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/privacy'>Policy</a>
        <a href='https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/terms'>Terms</a>
        <a href='https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/refund'>Refund</a>
        <a href='https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/shipping'>Dilevery</a>
        <a href='https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/contact_us'>Contact</a>
      </Box>

    </React.Fragment>
  );
}
