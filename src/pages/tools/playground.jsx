import { Button, Paper, Stack, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Playground(){
    const [prompt, setPrompt]= useState('')
    const [show_tools, set_show_tools]= useState(false)
    const [tools_cord, set_tools_cord]= useState([])
    const [text, set_text]= useState('')
    // for showing the status in playground toolbox
    const [status, set_status]= useState('Written')

    const handle_prompt= (e)=> {
        let text= window.getSelection().toString()
        if(text != ''){
            set_tools_cord([e.clientX, e.clientY])
            set_show_tools(true)
            setPrompt(text)
        }
    }

    const handle_tools= ()=> {
        set_show_tools(false)
    }

    const handle_write= ()=> {
        set_status('Writing')
        set_show_tools(false)

        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({prompt: prompt})
        }
        fetch('https://www.dualnature.org/tools/write', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            set_text(text+ '\n'+ data['user'])
        })
    }
    const handle_rephrase= (e)=> {
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({content: prompt})
        }
        fetch('http://127.0.0.1:8080/wobby/tools/rephrase', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(prompt)
            set_text(text+ '\n'+ data['content'])
        })
    }
    const handle_content= (e)=>{
        set_status('Written')
        set_text(e.target.value)
    }

    const handle_show_tools= ()=> {
        return(
            <Paper elevation={2}>
                <Stack direction={'row'} spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{position: "absolute", left: tools_cord[0], top: tools_cord[1], padding: '.1rem', border: 'solid black 1px', borderRadius: '5px', backgroundColor: '#E6DDD6'}}>
                    <Button variant="text" onClick={handle_write} sx={{color: '#000'}}>Write</Button>
                    <Button variant="text" onClick={handle_rephrase} sx={{color: '#000'}}>Rephrase</Button>
                    {/* <Button variant="text" onClick={handle_summarise} sx={{color: '#000'}}>Summaries</Button> */}
                </Stack>
            </Paper>
        )
    }

    return(
        <Box>
            <Paper elvation={1}>
                <Box sx={{bgcolor: '#fff', padding: '.8rem'}}>
                    <Stack direction='row' spacing={2}>
                        <Typography>
                            WordCount: 100
                        </Typography>
                        <Typography>
                            Status: {status}
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <textarea rows="30" cols='100' style={{outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}} placeholder='Enter the topic' value={text} onChange={handle_content} onMouseUp={handle_prompt} onMouseDown={handle_tools}></textarea>   
            {show_tools ? handle_show_tools(): <div></div>}
            </Box>
        </Box>
    )
}