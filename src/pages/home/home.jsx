import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Button, Grid, Stack } from '@mui/material';
import {Link} from 'react-router-dom'

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <Box sx={{ bgcolor: '#cfe8fc', height: '85vh' }} >
        <Grid container>
            <Grid item xs= {12} sm={6}>
                <Box sx= {{marginTop: '8rem'}}>
                    <Container>
                        <Typography variant='h4'>
                            Providing Digital Content Solutions
                        </Typography>
                        <Typography variant='subtitle1' mt={1} mb={2}>
                            We provide Tools for creating Digital Content using Machine Learning and Services using these Tools with Manual Supervison.
                        </Typography>
                        <Stack direction= 'row' spacing= {2}>
                            <Link to= '/services' style={{textDecoration: 'none'}}>
                                <Button variant="contained">
                                    View Services
                                </Button>
                            </Link>
                            <Link to= '/tools' style={{textDecoration: 'none'}}>
                                <Button variant="contained">
                                    Explore Tools
                                </Button>
                            </Link>
                        </Stack>
                    </Container>
                </Box>
            </Grid>
            <Grid item xs= {6} sm= {12}>
                
            </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
