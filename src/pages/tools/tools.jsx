import { CardActions, CardContent, Container, Grid, Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from 'react'
import Playground from "./playground";
import Rephraser from "./rephraser"
import Card from '../../components/tools_card'
import './tools.css'


export default function Tools(){
    const [page, set_page]= useState('Playground')
    const pages= ['Playground', 'Rephraser', 'Summariser']

    const handle_page= (e)=> {
        set_page(e.target.name)
    }
    const render_tool= ()=> {
        console.log(page)
        if(page == 'Playground'){
            return <Playground/>
        }
        else if(page == 'Rephraser'){
            return <Rephraser/>
        }
        
    }
    return(
        <Box sx={{
            marginTop: '4rem'
        }}>
            <Box sx={{height: '20vh', bgcolor: '#efd7fa', textAlign: 'center', padding: '3rem'}}>
                <Container>
                    <Typography variant="h2">
                    Try First 5000 words Free
                    </Typography>
                    <br/>
                    <Button variant="contained">Upgrade to Premium</Button>
                </Container>            
            </Box>
            <br/>
            <Container>
                <Typography variant="h4">
                    Tools
                </Typography>
                <br/>
                <Stack spacing={2} direction="row" width={'100%'}>
                    <Card name="Playground" description="Most of the feture are applicable here."></Card>
                    <Card name="Paraphraser" description="Most of the feture are applicable here."></Card>
                    <Card name="Sumariser" description="Most of the feture are applicable here."></Card>
                </Stack>
            </Container>
            <br/>
        </Box>
    )
}