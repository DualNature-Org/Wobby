import { Alert, Button, Grid, Paper, Stack, TextField, Typography, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Home from '../home/main'
import { Link, Navigate } from "react-router-dom";

export default function UserRegister(props){

    const [email, set_email]= useState('')
    const [password, set_password]= useState('')
    const [username, set_username]= useState('')
    const [response, set_response]= useState('')
    const [error, set_error]= useState(false)
    const [success, set_success]= useState(false)

    const handle_email= (e)=> {
        set_email(e.target.value)
    }
    const handle_username= (e)=> {
        set_username(e.target.value)
    }
    const handle_password= (e)=> {
        set_password(e.target.value)
    }
    const handle_register= ()=> {
        const req_opt= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({email: email, password: password, username: username})
        }
        fetch('https://dualnature.org/api/auth/register', req_opt)
        .then(res => res.json())
        .then((data) => {
            if(data['username'] != null){
                set_response(data['username'])
                set_error(true)
            }
            else if(data['email'] != null){
                set_response(data['email'])
                set_error(true)
            }
            else if(data['token'] != null){
                localStorage.setItem('token', data['token'])
                set_response(username)
                props.handle_username(username)
                set_success(true)
            }
            else{
                console.log(data)
            }
        })
    }
    const handle_error= ()=> {
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
            background: '#d7d7ff',
            height: '75vh'
        }}>
            <Paper elevation={1}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem'
                }}>
                    <Typography variant="h5" marginBottom={2}>
                        Register
                    </Typography>
                    <hr></hr>
                    <Stack spacing={2}>
                        <TextField variant="outlined" label='Username' type={'text'} value={username} onChange={handle_username}></TextField>
                        <TextField variant="outlined" label='Email' type={'email'} value={email} onChange={handle_email}></TextField>
                        <TextField variant="outlined" label='Password' type={'password'} value={password} onChange={handle_password}></TextField>
                        <Button variant="contained" onClick={handle_register}>Register</Button>
                    </Stack>
                </Box>
            </Paper>
            <Snackbar open={error} autoHideDuration={5000} onClose={handle_error}>
                <Alert onClose={handle_error} severity="warning" sx={{width: '100%'}}>
                    {response}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={5000} onClose={handle_success}>
                <Alert onClose={handle_success} severity="success" sx={{width: '100%'}}>
                    {response+ ' Registered Successfuly'}
                </Alert>
            </Snackbar>
            {redirect()}
        </Box>
    )
}