import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Textarea from "../../components/textarea";

import { useState } from "react";

export default function Paraphraser(){
    const [prompt, set_prompt]= useState('')
    const [content, set_content]= useState('')

    
    const handle_click= (e)=> {
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: prompt})
        }
        fetch('http://127.0.0.1:8000/wobby/paraphrase', request_option)
        .then(res => res.json())
        .then(data => {
            set_content(data['content'])
        })
    }

    return(
        <Box sx={{
            marginTop: '4rem',
            padding: '0 4rem',
            height: '85vh',
            bgcolor: '#d7d7ff'
        }}>
            <br/>
            <Stack direction={'row'} spacing={2}>
                <Textarea value={prompt} set_value={set_prompt}/>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button variant="contaiined" onClick={handle_click}>Submit</Button>
                </Box>
                <Textarea value={content} set_value={set_content}/>
            </Stack>
        </Box>
    )
}