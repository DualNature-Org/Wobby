import { Alert, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserRegister(){

    const [email, set_email]= useState('')
    const [password, set_password]= useState('')
    const [response, set_response]= useState({'type': 'success', 'message': 'user logined'})
    const [open, set_open]= useState(false)

    const handle_email= (e)=> {
        set_email(e.target.value)
    }
    const handle_password= (e)=> {
        set_password(e.target.value)
    }
    const handle_register= ()=> {
        const req_opt= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({email: email, password: password})
        }
        fetch('http://127.0.0.1:5000/register', req_opt)
        .then(res => res.json())
        .then((data) => {
            set_response(data)
            set_open(true)
        })
    }
    const handle_close= ()=> {
        set_open(false)
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
                        Register
                    </Typography>
                    <hr></hr>
                    <Stack spacing={2}>
                        <TextField variant="outlined" label='Username' type={'text'}></TextField>
                        <TextField variant="outlined" label='Email' type={'email'}></TextField>
                        <TextField variant="outlined" label='Password' type={'password'}></TextField>
                        <Button variant="contained">Register</Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}