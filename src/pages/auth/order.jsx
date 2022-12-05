import { Stack, Typography, Paper, Chip, Button } from "@mui/material"
import { Box, Container } from "@mui/system"
import Plan from '../../components/plan'
import InputSlider from '../../components/credit'
import { useState } from "react"

export default function OrderPage(){
    const [credits, set_credits]= useState(100)
    const [checked, setChecked] = useState([true, false]);

    const handle_credits= (e, value)=> {
        set_credits(value)
    }
    const handle_order= (e)=> {
        const request_options={
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token'+ localStorage.getItem('token')},
            body: JSON.stringify({credits: credits})
        }
        fetch('http://127.0.0.1:8000/api/auth/order', request_options)
        .then(res => res.json())
        .then(data => {
            
        })
    }
    
    return (
        <Box sx={{marginTop: '4rem'}}>
            <br></br>
            <Container>
                <Paper elevation={3} sx={{padding: '1rem'}}>
                    <Typography variant="h5">
                        Select Plan According to Your Needs
                    </Typography>
                    <Typography variant="body1">
                        Here you can choose between different options and we can calculate the right amount of price that you need to pay
                    </Typography>
                    <br/>
                    <Plan setChecked= {setChecked} checked= {checked} />
                    <br/>
                    <InputSlider onChange={handle_credits} credits={credits} checked= {checked[1]}/>
                    <br/>
                    <Typography variant="body1">
                        Estimated Price: Rs.<span style={{fontSize: '1.5rem'}}>{credits*5}</span>
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" onClick={handle_order}>Confirm Order</Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}