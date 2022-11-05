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
            <Box sx={{ bgcolor: '#efd7fa', textAlign: 'center', padding: '3rem'}}>
                <Container>
                    <Typography variant='h4'>
                        Play with 5000 Words for Free
                    </Typography>
                    <br/>
                    <Button variant="contained">Upgrade to Premium</Button>
                </Container>            
            </Box>
            <br/>
            <Container>
                <Typography variant="h5">
                    Tools
                </Typography>
                <br/>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row'}} width={'100%'}>
                    <Card name="Playground" description="Most of the tools are present here for little use."></Card>
                    <Card name="Paraphraser" description="For repharing large chunks of content."></Card>
                    <Card name="Summariser" description="For summarise large chunk of content."></Card>
                </Stack>
            </Container>
            <br/>
        </Box>
    )
}