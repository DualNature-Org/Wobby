import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function UserLogin(){
    return(
        <Box sx={{
            marginTop: '3rem', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '2rem 0', 
            background: '#E6DDD6',
            height: '75vh'
        }}>
            <Paper elevation={1}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem'
                }}>
                    <Typography variant="h5" marginBottom={2}>
                        LOG IN
                    </Typography>
                    <hr></hr>
                    <Stack spacing={2}>
                        <TextField variant="outlined" label='Email' type={'email'}></TextField>
                        <TextField variant="outlined" label='Password' type={'password'}></TextField>
                        <Stack direction='row' spacing={2}>
                            <Link to={'/auth/register'}>
                                <Button variant='standard'>Register</Button>
                            </Link>
                            <Link to={'/auth/forgot_password'}>
                                <Button variant='standard'>Forgot Password</Button>
                            </Link>
                        </Stack>
                        <Button variant="contained">Login</Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}