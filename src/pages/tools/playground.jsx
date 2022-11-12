//  Mui compenents
import { 
    Button, 
    Paper, 
    Stack, 
    Divider, 
    Typography, 
    Snackbar, 
    Alert, 
    LinearProgress, 
    IconButton, 
    Fade, 
    Tooltip 
} from "@mui/material";
import { Box } from "@mui/system";
//  Icons
import {  
    Download, 
    DriveFileRenameOutline, 
    Summarize, 
    UnfoldMore, 
    Replay, 
    SaveAs, 
    Create
} from "@mui/icons-material";
//  react hooks
import { useState } from "react";


function Tool(props){
    return(
        <Tooltip title={props.title}>
            <IconButton color="primary" onClick={props.handle_tool}>
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

export default function Playground(){
    const [prompt, set_prompt]= useState('')
    const [show_tools, set_show_tools]= useState(false)
    const [tools_cord, set_tools_cord]= useState([])
    const [content, set_content]= useState()
    const [selection, set_selection]= useState()
    // for showing the status in playground toolbox
    const [writing, set_writing]= useState(false)
    const [word_count, set_word_count]= useState(0)
    // snackbars
    const [error, set_error]= useState(false)
    const [success, set_success]= useState(false)
    const [response, set_response]= useState('')

    const heading1= {
        fontWeigth: '700',
        fontSize: '1rem',
    }

    const handle_prompt= (e)=> {
        let text= window.getSelection().toString()
        if(text != ''){
            set_tools_cord([e.clientX, e.clientY])
            set_show_tools(true)
            set_prompt(text)
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
        fetch('http://127.0.0.1:8000/wobby/tools/write', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data['detail'] != null){
                set_response(data['detail'])
                set_error(true)
            }
            else if(data['content'] != null){
                set_content(content+ "\n"+ data['content'])
                set_response('writed')
                set_success(true)
            }
            else if(data['message'] != null){
                set_response(data['message'])
                set_error(true)
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
        fetch('https://dualnature.org/wobby/tools/rephrase', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(prompt)
            set_content(content+ '\n'+ data['content'])
        })
    }
    const handle_content_section= (text)=> {
        return (
            <div onClick={handle_selection}>
                {text}
            </div>
        )
    }
    const handle_selection= (e)=> {
        console.log(e.target.innerText)
        set_selection(e.target.innerText)
    }
    const handle_content= (e)=>{
        set_content(e.target.value)
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
    const handle_extend= ()=> {

    }
    const handle_summarise= ()=> {

    }
    const handle_heading= ()=>{
        console.log(content[0]['props'])
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
            <Paper elvation={2} sx={{position: 'fixed', width: '100%', marginTop: '-3rem'}}>
                <Box sx={{bgcolor: '#fff', padding: '.2rem'}}>

                    <Stack direction='row' spacing={2}>
                        {/* main tools */}
                        <Stack direction={'row'} spacing={0}>
                            <Tool title='write' handle_tool={handle_write} icon={<Create />} />
                            <Tool title='extend' handle_tool={handle_extend} icon={<UnfoldMore />} />
                            <Tool title='rephrase' handle_tool={handle_rephrase} icon={<DriveFileRenameOutline />} />
                            <Tool title='summarise' handle_tool={handle_summarise} icon={<Summarize />} />
                        </Stack>
                        
                        <Stack direction={'row'}>
                            <Tool title='heading1' handle_tool={handle_heading} icon={<div style={heading1}>H1</div>} />
                            <Typography variant="subtitle1">
                                {word_count}
                            </Typography>
                        </Stack>
                      
                    </Stack>

                    {/* progress of process */}
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

            <Box sx={{display: 'flex', justifyContent: 'center', bgcolor: '#efd7fa', marginTop: '7rem'}}>
                <textarea style={{
                    width: '50%', height: '100vh', 
                    backgroundColor: '#fff', padding: '1rem',
                    fontFamily: 'roboto',
                    border: 'none', outline: 'none'
                }}
                onMouseDown={handle_tools}
                onMouseUp={handle_prompt}
                onChange={handle_content}
                value={content}>
                </textarea>
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
