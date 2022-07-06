import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Button } from '@mui/material';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
            <Typography variant='h4'>
                Providing Digital Content Solutions
            </Typography>
            <Typography variant='subtitle1'>
                We provide Tools for creating Digital Content using Machine Learning and Services using these Tools with Manual Supervison.
            </Typography>
            <Button variant="contained" href="#outlined-buttons">
                View Services
            </Button>
            <Button variant="contained" href="#outlined-buttons">
                Explore Tools
            </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
