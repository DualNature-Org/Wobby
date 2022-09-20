import { Button, Grid, Paper, TextField } from "@mui/material"
import { Box, Container } from "@mui/system"
import React, { useState } from "react"
import AdminDashboard from "./dashboard"

export default function AdminLogin() {

    const [username, setUsername]= useState('abby')
    const [password, setPassword]= useState('abby@swag')
    const [logined, setLogin]= useState(false)

    const handle_password = (e)=> {
        setPassword(e.target.value)
    }
    const handle_username= (e)=> {
        setUsername(e.target.value)
    }
    const handle_submit= (e)=> {
        const requestOption= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({username: username, password: password})
        }
        fetch('http://127.0.0.1:5000/admin/login', requestOption)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            if(data['code'] == 200){
                setLogin(true)
            }
            else{
                alert(data['message'])
            }
        })
    }

    return(
        <React.Fragment>
            {
                logined ? <AdminDashboard/> :
                <Container>
                    <Paper>
                        <Grid container alignItems={'center'} spacing={2} flexDirection='column' sx={{height: '80vh'}}>
                            <Grid item>
                                <TextField value={username} onChange={handle_username} type='text' sx={{display: 'block'}}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField type="password" onChange={handle_password} value={password}></TextField>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handle_submit}>{'submit'}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            }
        </React.Fragment>
    )
}