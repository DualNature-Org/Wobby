import React from "react";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';


class Home extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Container>
                    <Grid container>
                        <Grid item xs={6}>
                            <Container>
                                <Stack spacing={2}>
                                    <p>Hello</p>
                                </Stack>
                            </Container>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>            
        )
    }
}

export default Home