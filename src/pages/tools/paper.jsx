import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';

import { Box } from "@mui/system";
// Components
import {
    Stack, 
    Paper, 
    Button, 
    Divider, 
    Snackbar, 
    Alert, 
    Tooltip, 
    IconButton} from '@mui/material'
//  Icons
import {  
    Download, 
    DriveFileRenameOutline, 
    Summarize, 
    Image,
    UnfoldMore, 
    Replay, 
    SaveAs, 
    Create
} from "@mui/icons-material";


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

function Tool(props){
    return(
        <Tooltip title={props.title}>
            <IconButton color="primary" onClick={props.handle_tool}>
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

export default function Paper_(){
    const [value, set_value] = useState('')
    const [selection, set_selection]= useState('')
    const [status, set_status]= useState(false)
    const [msg, set_msg]= useState([])

    const handle_value= (value)=>{
        set_value(value)
    }
    const handle_selection= (e)=> {
        let text= window.getSelection().toString()
        if(text != ''){
            set_selection(text)
        }
        else{
            set_selection('')
        }
    }

    const handle_extend= (e)=> {
        console.log('hello')
        if(selection == ''){
            set_msg(['warning', 'Invalid Selection'])
            set_status(true)
        }
        else{
            const request_option= {
                method: 'POST',
                headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
                body: JSON.stringify({prompt: selection})
            }
            fetch('http://127.0.0.1:8000/wobby/extend', request_option)
            .then(res => res.json())
            .then(data => {
                if(data['detail'] != null){
                    set_msg(['error', data['detail']])
                }
                else if(data['content'] != null){
                    set_value(value+ data['content'])
                    set_msg(['success','Written'])
                }
                else if(data['message'] != null){
                    set_msg(['error', data['message']])
                }
                else{
                    console.log(data)
                    set_msg(['error', 'Undefined'])
                }
                set_status(true)
            })
        }
    }

    const handle_rephrase= (e)=> {
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('http://127.0.0.1:8000/wobby/rephrase', request_option)
        .then(res => res.json())
        .then(data => {
            set_value(value+ data['content'])
        })
    }

    const handle_image= ()=> {
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('http://127.0.0.1:8000/wobby/create', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetch(`${data['url']}`)
            .then(res => res.blob())
            .then(img => console.log(img))
        })
    }

    const handle_status= (e)=> {
        set_status(false)
    }

    return(
        <Box sx={{marginTop: '4rem', bgcolor: '#d7d7ff', height: '85vh'}}>
            <Box sx={{margin: '0 5rem', bgcolor: '#fff'}}
            onMouseUp={handle_selection} >
                <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={value} 
                onChange={handle_value} 
                style={{height: '85vh',}}/>

                <Box sx={{position: 'absolute', top: '8rem', right: '1.2rem', bgcolor: '#a8f3a8'}}>
                    <Paper elevation={3}>
                        <Stack spacing={2}>
                            <Tool title='extend' handle_tool={handle_extend} icon={<UnfoldMore />} />
                            <Tool title='rephrase' handle_tool={handle_rephrase} icon={<DriveFileRenameOutline />} />
                            <Tool title='image' handle_tool={handle_image} icon={<Image />} />
                        </Stack>
                    </Paper>
                </Box>
                <Snackbar open={status} autoHideDuration={5000} onClose={handle_status}>
                    <Alert onClose={handle_status} severity={msg[0]} sx={{width: '100%'}}>
                        {msg[1]}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}