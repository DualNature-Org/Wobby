import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Box } from '@mui/material';

const modules = {
    toolbar: [
      ['bold', 'italic'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
    ],
  }

const formats = [
    'bold', 'italic',
    'list', 'bullet',
  ]

export default function Textarea(props){
    return(
        <Box sx={{bgcolor: '#fff'}}>
          <ReactQuill 
          theme="snow"
          modules={modules}
          formats={formats}
          value={props.value} 
          onChange={props.set_value} 
          style={{height: '75vh', width: '40vw'}}/>
        </Box>
    )
}