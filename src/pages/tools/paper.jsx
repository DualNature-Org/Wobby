import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';

import { Box } from "@mui/system";
// Components
import {
    Stack, 
    Paper, 
    Button, 
    Snackbar, 
    Alert, 
    Tooltip, 
    IconButton,
    Container,
    Typography,
    Fade,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem, 
    ListItemText,
    ListItemButton} from '@mui/material'
//  Icons
import {  
    DriveFileRenameOutline, 
    Image,
    Create,
    Notes,
    Code,
    ReceiptLong
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
            <IconButton color="primary" onClick={props.handler}>
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

function list_to_string(list){
    let output= ''
    if(Array.isArray(list)){
        list.forEach(line => {
            output+= line+ '\n'
        })
    }
    else{
        output= list
    }
    return output
}

export default function Paper_(){
    const [value, set_value] = useState('')
    const [selection, set_selection]= useState('')
    const [range, set_range]= useState('random')
    const [status, set_status]= useState(false)
    const [msg, set_msg]= useState(false)
    const [write_opts, set_write_opts]= useState(false)
    const [edit, set_edit]= useState(false)

    const [outline, set_outline]= useState([])

    // genreal selection and content functions
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

    const render_doc= (doc)=> {
        let output= ''
        doc['headings'].forEach((data)=> {
            output+= `<h1>${data['title']}</h1>`
            output+= `<p>${data['content']}</p>`
        })
        set_value(output)
    }

    const handle_status= (e)=> {
        set_msg(false)
        set_status(false)
    }

    const handle_range= (e)=> {
        set_range(e.target.value)
    }

    const check_selection= ()=>{
        if(selection == ''){
            set_msg(['warning', 'Invalid Selection'])
            return false
        }
        return true
    }

    // tools functions
    const handle_extend= (e)=> {
        set_status(true)
        if(selection == ''){
            set_msg(['warning', 'Invalid Selection'])
        }
        else{
            const request_option= {
                method: 'POST',
                headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
                body: JSON.stringify({prompt: selection})
            }
            fetch('https://dualnature.org/wobby/extend', request_option)
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
                set_status(false)
            })
        }
    }

    const handle_write_opts= ()=> {
        if(check_selection()){
            set_outline([])
            set_edit(false)
            set_write_opts(true)
        }
    }

    const handle_outline= ()=> {
        set_status(true)
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('https://dualnature.org/wobby/toc', request_option)
        .then(res => res.json())
        .then(data => {
            set_outline(data['toc'])
            set_msg(['success', 'Written'])
        })
    }

    const update_outline= ()=> {
        let list= outline.split('\n')
        list.splice(list.indexOf(''))
        set_outline(list)
        set_edit(false)
    }

    const handle_write= ()=> {
        set_status(true)
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({outline: {headings: outline, title: selection}})
        }
        fetch('https://dualnature.org/wobby/write', request_option)
        .then(res => res.json())
        .then(data => {
            set_write_opts(false)
            set_msg(['success', 'TOC generated'])
            render_doc(data['doc'])
        })
    }

    const handle_rephrase= (e)=> {
        set_status(true)
        if(selection == ''){
            set_msg(['warning', 'Invalid Selection'])
        }
        else{
            const request_option= {
                method: 'POST',
                headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
                body: JSON.stringify({prompt: selection})
            }
            fetch('https://dualnature.org/wobby/rephrase', request_option)
            .then(res => res.json())
            .then(data => {
                set_value(value+ data['content'])
            })
        }
    }

    const handle_image= ()=> {
        set_status(true)
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('https://dualnature.org/wobby/create', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            set_value(value+ `<img src="${data['url']}" />`)
            set_msg(['success', 'Image Created'])
        })
    }

    const handle_code= ()=> {
        set_status(true)
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('https://dualnature.org/wobby/code', request_option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            set_value(value+ `<code><pre>${data['content']}<pre/><code/>`)
            set_msg(['success', 'Code Written'])
        })
    }

    return(
        <Box sx={{marginTop: '4rem', bgcolor: '#d7d7ff', height: '85vh'}}>

            {/* progress of process */}
            <Fade
                in={status}
                style={{
                    transitionDelay: status ? '800ms' : '0ms',
                }}
                unmountOnExit
                >
                    <LinearProgress />
            </Fade>
                
            <Box 
            sx={{margin: '0 5rem', bgcolor: '#fff'}}
            onMouseUp={handle_selection} 
            >
                <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={value} 
                onChange={handle_value} 
                style={{height: '85vh',}}
                />
                <Box sx={{position: 'absolute', top: '8rem', right: '1.2rem', bgcolor: '#a8f3a8'}}>
                    <Paper elevation={3}>
                        <Stack spacing={2}>
                            <Tool title='extend' handler={handle_extend} icon={<Create />}/>
                            <Tool title='write' handler={handle_write_opts} icon={<DriveFileRenameOutline />} />
                            <Tool title='rephrase' handler={handle_rephrase} icon={<Notes />} />
                            <Tool title='image' handler={handle_image} icon={<Image />} />
                            <Tool title='code' handler={handle_code} icon={<Code />} />
                            <Tool title='references' handler={handle_code} icon={<ReceiptLong />} />
                        </Stack>
                    </Paper>
                </Box>
            </Box>

            {/* msg from responses */}
            <Snackbar open={msg} autoHideDuration={5000} onClose={handle_status}>
                <Alert onClose={handle_status} severity={msg[0]} sx={{width: '100%'}}>
                    {msg[1]}
                </Alert>
            </Snackbar>
            
            {/* write opts dialog window */}
            <Dialog open={write_opts} onClose={()=> {set_write_opts(false)}}>
                <DialogTitle>
                    <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    // alignItems={'center'}
                    spacing={5}>
                        <Typography variant='h5'>
                            Settings
                        </Typography>  
                        <TextField variant='standard' size='small' type={'number'} helperText='' placeholder='Wordcount (100+-10%) ' value={range} onChange={handle_range}></TextField>
                    </Stack>
                </DialogTitle>
                <hr style={{width: '90%'}}/>
                <DialogContent>
                    {
                         edit?
                         <Box sx={{marginTop: '-1rem'}}>
                             <Button variant='standard' onClick={update_outline}>Update</Button>
                             <br/>
                             <textarea value={list_to_string(outline)} type='text' onChange={(e)=> {set_outline(e.target.value)}} cols={50} rows={12}></textarea>
                         </Box>
                         :
                        <Box>
                            <Typography variant='h5' sx={{textAlign: 'center'}}>
                                {selection}
                            </Typography>
                            <List onClick={()=> {set_edit(true)}}>
                                {
                                outline.map((heading)=> {
                                    return(
                                        <ListItemButton>
                                            <ListItemText primary={heading}></ListItemText>
                                        </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    }
                </DialogContent>
                <hr style={{width: '90%'}}/>
                <DialogActions sx={{justifyContent: 'space-between'}}>
                        <Button variant='contained' size='small' onClick={handle_outline}>
                            Generate Outline
                        </Button>
                        <Button variant='contained' size='small' onClick={handle_write}>
                            Write
                        </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}