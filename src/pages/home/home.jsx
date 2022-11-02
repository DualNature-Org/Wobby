import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom'
import logo from './logo_wobby.png'
import About from '../about/about';

export default function SimpleContainer() {
  return (
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
            <Button variant='contained' sx={{marginTop: '2rem', backgroundColor: '#5B3629'}}>Try For Free ...</Button>
        </Container>
      </Box>

      <About/>
    </React.Fragment>
  );
}
