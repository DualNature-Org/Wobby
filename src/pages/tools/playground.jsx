import { Button, Paper, Stack, Divider, Typography, Snackbar, Alert, LinearProgress, IconButton, Fade } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box } from "@mui/system";
import { useState } from "react";

export default function Playground(){
    const [prompt, setPrompt]= useState('')
    const [show_tools, set_show_tools]= useState(false)
    const [tools_cord, set_tools_cord]= useState([])
    const [text, set_text]= useState('')
    // for showing the status in playground toolbox
    const [writing, set_writing]= useState(false)
    // snackbars
    const [error, set_error]= useState(false)
    const [success, set_success]= useState(false)
    const [response, set_response]= useState('')

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
        set_writing(true)
        set_show_tools(false)

        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: prompt})
        }
        fetch('https://dualnature.org/tools/write', request_option)
        .then(res => res.json())
        .then(data => {
            if(data['detail'] != null){
                set_response(data['detail'])
                set_error(true)
            }
            else if(data['content'] != null){
                set_text(text+ "\n"+ data['content'])
                set_response('writed')
                set_success(true)
            }
            else{
                console.log(data)
            }
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
        set_writing(false)
        set_text(e.target.value)
    }

    const handle_show_tools= ()=> {
        return(
            <Paper elevation={1}>
                <Stack direction={'row'} spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{position: "absolute", left: tools_cord[0], top: tools_cord[1], padding: '.1rem', border: 'solid black 1px', borderRadius: '5px', background: '#edc0fc'}}>
                    <Button variant="text" onClick={handle_write} sx={{color: '#000'}} size='small'>Write</Button>
                    <Button variant="text" onClick={handle_rephrase} sx={{color: '#000'}} size="small">Rephrase</Button>
                    {/* <Button variant="text" onClick={handle_summarise} sx={{color: '#000'}}>Summaries</Button> */}
                </Stack>
            </Paper>
        )
    }

    const handle_error= ()=> {
        set_writing(false)
        set_error(false)
    }
    const handle_success= ()=> {
        set_writing(false)
        set_success(false)
    }

    return(
        <Box sx={{marginTop: '4rem'}}>
            <Paper elvation={1}>
                <Box sx={{bgcolor: '#fff', padding: '.4rem'}}>
                    <Stack direction='row' spacing={2}>
                        <IconButton color="primary" aria-label="save picture" component="label">
                            <SaveAsIcon />
                        </IconButton>
                        <IconButton color="primary" arial-label="undo picture" component="label">
                            <ReplayIcon />
                        </IconButton>
                    </Stack>
                    <Fade
                    in={writing}
                    style={{
                        transitionDelay: writing ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                    >
                        <LinearProgress />
                    </Fade>
                </Box>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'center', bgcolor: '#efd7fa'}}>
            <textarea rows="30" cols='100' style={{outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}} placeholder='Enter the topic' value={text} onChange={handle_content} onMouseUp={handle_prompt} onMouseDown={handle_tools}></textarea>   
            {show_tools ? handle_show_tools(): <div></div>}
            </Box>
            <Snackbar open={error} autoHideDuration={5000} onClose={handle_error}>
                <Alert onClose={handle_error} severity="warning" sx={{width: '100%'}}>
                    {response}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={1000} onClose={handle_success}>
                <Alert onClose={handle_success} severity="success" sx={{width: '100%'}}>
                    {response}
                </Alert>
            </Snackbar>
        </Box>
    )
}