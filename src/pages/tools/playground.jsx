import { Button, Paper, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Playground(){
    const [prompt, setPrompt]= useState('')
    const [is_prompt_valid, set_is_prompt_valid]= useState(false)
    const [tools_cord, set_tools_cord]= useState([])
    const [text, set_text]= useState('')

    const handle_prompt= (e)=> {
        let text= window.getSelection().toString()
        if(text != ''){
            set_tools_cord([e.clientX, e.clientY])
            set_is_prompt_valid(true)
            setPrompt(text)
        }
    }
    const handle_tools= ()=> {
        set_is_prompt_valid(false)
    }
    const handle_write= ()=> {
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({prompt: prompt})
        }
        fetch('http://52.66.53.159:5000/tools/text', request_option)
        .then(res => res.json())
        .then(data => set_text(text+ data['text']))
    }
    const handle_content= (e)=>{
        set_text(e.target.value)
    }

    const show_tools= ()=> {
        return(
            <Paper elevation={2}>
                <Stack direction={'row'} spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{position: "absolute", left: tools_cord[0], top: tools_cord[1], padding: '.3rem', border: 'solid black 1px', borderRadius: '5px'}}>
                    <Button variant="text" onClick={handle_write}>Write</Button>
                    <Button variant="text">Rephrase</Button>
                    <Button variant="text">Plagrism</Button>
                </Stack>
            </Paper>
        )
    }

    return(
        <Box sx={{height: 500}}>
            {is_prompt_valid ? show_tools(): <div></div>}
            <textarea style={{width: '99%', height: '99%', outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}} placeholder='Enter the topic' value={text} onChange={handle_content} onMouseUp={handle_prompt} onMouseDown={handle_tools}></textarea>   
        </Box>
    )
}