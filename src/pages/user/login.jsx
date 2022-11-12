import { Alert, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function UserLogin(props){
    const [password, set_password]= useState('')
    const [username, set_username]= useState('')
    const [error, set_error]= useState(false)
    const [success, set_success]= useState(false)
    const [response, set_response]= useState(false)

    const handle_password= (e)=> {
        set_password(e.target.value)
    }
    const handle_username= (e)=> {
        set_username(e.target.value)
    }
    const handle_login= (e)=>{
        const request_object= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({username: username, password: password})
        }
        fetch('http://127.0.0.1:8000/api/auth/login', request_object)
        .then(res => res.json())
        .then(data => {
            if(data['non_field_errors'] != null){
                set_response(data['non_field_errors'])
                set_error(true)
            }
            else if(data['token'] != null){
                localStorage.setItem('token', data['token'])
                set_response(username+ ' Logined')
                props.handle_username(username)
                set_success(true)
            }
            else{
                console.log(data)
            }
        })
        .catch(err => console.error(err))
    }
    const handle_error= (e)=> {
        set_password('')
        set_username('')
        set_error(false)
    }
    const handle_success= ()=> {
        set_success(false)
        props.onChange(true)
    }
    const redirect= ()=> {
        if(props.logined){
            return (<Navigate to='/' replace={true}/>)
        }
    }

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
                        <TextField variant="outlined" label='Username' type={'text'} value={username} onChange={handle_username}></TextField>
                        <TextField variant="outlined" label='Password' type={'password'} value={password} onChange={handle_password}></TextField>
                        <Stack direction='row' spacing={2}>
                            <Link to={'/auth/register'}>
                                <Button variant='standard'>Register</Button>
                            </Link>
                            <Link to={'/auth/forgot_password'}>
                                <Button variant='standard'>Forgot Password</Button>
                            </Link>
                        </Stack>
                        <Button variant="contained" onClick={handle_login}>Login</Button>
                    </Stack>
                </Box>
            </Paper>
            <Snackbar open={error} autoHideDuration={5000} onClose={handle_error}>
                <Alert onClose={handle_error} severity="warning" sx={{width: '100%'}}>
                    {response}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={1000} onClose={handle_success}>
                <Alert onClose={handle_success} severity="success" sx={{width: '100%'}}>
                    {response}
                </Alert>
            </Snackbar>
            {redirect()}
        </Box>
    )
}