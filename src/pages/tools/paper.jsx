import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';
import '../../asset/styles/paper.css'
import wordIcon from '../../asset/icons/wordLogo.png'
import EditorToolbar, { modules, formats } from "./EditorToolbar";

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
    ReceiptLong,
    ConstructionOutlined,
    TrendingUpOutlined
} from "@mui/icons-material";

import { Navigate } from 'react-router-dom';
import UserLogin from '../auth/login'
import { useRef } from 'react';

// const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, false] }],
//       ['bold', 'italic', 'underline','strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//       ['link', 'image'],
//       ['clean']
//     ],
//   }

// const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ]

function Tool(props){
    return(
        <Tooltip title={props.title}>
            <IconButton color="primary" disabled={props.status} onClick={props.handler}>
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

function convert_to_html(s){
    let output= ''
    s.split('\n').forEach(p=> {
        output+= `<p>${p}</p>`
    })
    return output
}

export default function Paper_(props){
    const [value, set_value] = useState('')
    const [selection, set_selection]= useState('')
    const [range, set_range]= useState('')
    const [status, set_status]= useState(false)
    const [msg, set_msg]= useState(false)
    const [write_opts, set_write_opts]= useState(false)
    const [edit, set_edit]= useState(false)
    const [outline, set_outline]= useState([])
    const [wordcount, set_wordcount] = useState(0)

    // Function for letting users download word file
    function Export2Word(html_input, filename = ''){
        const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        const postHtml = "</body></html>";
        const html = preHtml+html_input+postHtml;
    
        const blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        
        const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

        filename = filename?filename+'.doc':'document.doc';
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }
        
        document.body.removeChild(downloadLink);
    }
    

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
        let temp= []
        outline.forEach(x=> {
            temp.push([x[0], parseInt(e.target.value/outline.length)])
        })
        set_outline(temp)
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
                    set_msg(['error', 'Login First'])
                }
                else if(data['content'] != null){
                    set_value(value+ convert_to_html(data['content']))
                    set_msg(['success','Written'])
                }
                else if(data['message'] != null){
                    set_msg(['error', 'Login First'])
                }
                else{
                    set_msg(['error', 'Undefined'])
                }
                set_status(false)
            })
            .catch((error) => {
                set_msg(['warning', 'An error ocurred'])
                console.log(error)
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
            try{
                let outline= []
                data['toc'].forEach((heading)=> {
                    outline.push([heading, range/data['toc'].length])
                })
                set_outline(outline)
                set_msg(['success', 'TOC Generated'])
            }
            catch{
                set_msg(['warning', 'An error ocurred'])
            }
        })
        .catch((error) => {
            set_msg(['warning', 'An error ocurred'])
            console.log(error)
        })
    }

    const update_outline= ()=> {
        try{
            let list= outline.split('\n')
            list.splice(list.indexOf(''))
            let temp= []
            list.forEach((line)=> {
                temp.push(line.split(','))
            })
            set_outline(temp)
        }
        catch{
            set_outline(outline)
        }
        set_edit(false)

    }

    const handle_write= ()=> {
        set_status(true)
        let headings= []
        outline.forEach(x=> {
            headings.push({
                title: x[0],
                wordcount: parseInt(x[1])
            })
        })
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({outline: {headings: headings, title: selection}})
        }
        fetch('https://dualnature.org/wobby/write', request_option)
        .then(res => res.json())
        .then(data => {
            try{
                set_write_opts(false)
                set_msg(['success', 'Article Written'])
                render_doc(data['doc'])
            }
            catch{
                set_msg(['warning', 'An error ocurred'])
            }
        })
        .catch((error) => {
            set_msg(['warning', 'An error ocurred'])
            console.log(error)
        })
    }

    const handle_list= (e)=> {
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
            fetch('https://dualnature.org/wobby/list', request_option)
            .then(res => res.json())
            .then(data => {
                try{
                    set_value(value+ convert_to_html(data['content']))
                    set_msg(['success', 'Written'])
                }
                catch{
                    set_msg(['warning', 'An error occured'])
                }
            })
            .catch((error) => {
                set_msg(['warning', 'An error ocurred'])
                console.log(error)
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
            set_value(value+ `<img src="${data['url']}" />`)
            set_msg(['success', 'Image Created'])
        })
        .catch((error) => {
            set_msg(['warning', 'An error ocurred'])
            console.log(error)
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
            set_value(value+ `<code><pre>${data['content']}<pre/><code/>`)
            set_msg(['success', 'Code Written'])
        })
        .catch((error) => {
            set_msg(['warning', 'An error ocurred'])
            console.log(error)
        })
    }

    const handle_references= ()=> {
        set_status(true)
        const request_option= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json', 'Authorization': 'Token '+ localStorage.getItem('token')},
            body: JSON.stringify({prompt: selection})
        }
        fetch('https://dualnature.org/wobby/references', request_option)
        .then(res => res.json())
        .then(data => {
            try{
                set_value(value+ convert_to_html(data['content']))
                set_msg(['success', 'References Written'])
            }
            catch{
                set_msg(['warning', 'An error ocurred'])
            }
        })
        .catch((error) => {
            set_msg(['warning', 'An error ocurred'])
            console.log(error)
        })
    }
    useEffect(() => {
        set_wordcount(value.split(' ').length - 1)
        console.log(wordcount)
      }, [value])

    return(
        <Box sx={{marginTop: '3rem', bgcolor: '#d7d7ff', height: '85vh'}}>

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
            sx={{bgcolor: '#fff'}}
            onMouseUp={handle_selection} 
            >
                <Box sx={{position: 'absolute', right:'120px', top:'58px', fontSize:'14px', color:'#444444'}}>{wordcount} Words</Box>
                <Button variant='outlined' size='small' sx={{position:'absolute', right:'10px', top:'53px'}} onClick={() => Export2Word(value, 'content')} endIcon={<img src={wordIcon} alt='word' width='20px' />}>Export</Button>
                <EditorToolbar value={value} />
                <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={value} 
                onChange={handle_value} 
                style={{height: '90vh', width:'100%'}}
                />
                <Box sx={{position: 'absolute', top: '8rem', right: '1.2rem', bgcolor: '#a8f3a8'}}>
                    <Paper elevation={3}>
                        <Stack spacing={2}>
                            <Tool title='extend' handler={handle_extend} icon={<Create />} status={status}/>
                            <Tool title='write' handler={handle_write_opts} icon={<DriveFileRenameOutline status={status}/>} />
                            <Tool title='list' handler={handle_list} icon={<Notes />} status={status}/>
                            <Tool title='image' handler={handle_image} icon={<Image />} status={status}/>
                            <Tool title='code' handler={handle_code} icon={<Code />} status={status}/>
                            <Tool title='references' handler={handle_references} icon={<ReceiptLong status={status}/>} />
                        </Stack>
                    </Paper>
                </Box>
            </Box>

            {/* msg from responses */}
            <Snackbar open={msg} autoHideDuration={1000} onClose={handle_status}>
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
                        <Button variant='contained' size='small' disabled={status} onClick={handle_outline}>
                            Generate Outline
                        </Button>
                        <Button variant='contained' size='small' disabled={status} onClick={handle_write}>
                            Write
                        </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}