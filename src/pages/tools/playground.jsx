import { Button, Paper, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Playground(){
    const [prompt, setPrompt]= useState('')
    const [is_prompt_valid, set_is_prompt_valid]= useState(false)
    const [tools_cord, set_tools_cord]= useState([])

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

    const show_tools= ()=> {
        return(
            <Paper elevation={2}>
                <Stack direction={'row'} spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{position: "absolute", left: tools_cord[0], top: tools_cord[1], padding: '.3rem', border: 'solid black 1px', borderRadius: '5px'}}>
                    <Button variant="text">Write</Button>
                    <Button variant="text">Rephrase</Button>
                    <Button variant="text">Plagrism</Button>
                </Stack>
            </Paper>
        )
    }

    return(
        <Box sx={{height: 500}}>
            {is_prompt_valid ? show_tools(): <div></div>}
            <textarea style={{width: '99%', height: '99%', outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}} placeholder='Enter the topic' onMouseUp={handle_prompt} onMouseDown={handle_tools}></textarea>   
        </Box>
    )
}