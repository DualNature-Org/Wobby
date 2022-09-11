import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";


export default function Playground(){
    const [showTools, setShowTools] = useState(0)
    let control_tools_x_cor= 0
    let control_tools_y_cor= 0

    const handleMouseUp= (e)=> {
        let text= window.getSelection().toString()
        control_tools_x_cor= e.clientX
        control_tools_y_cor= e.clientY
        if(text!= ''){
            setShowTools(1)
        }
    }

    const  control_tools_box= ()=> {
        if(showTools== 1){
            console.log(control_tools_x_cor)
            return (
                <Box sx={{
                    height: '5vh',
                    width: '50vw',
                    border: 'solid #333 1px',
                    padding: '.5rem',
                    position: 'absolute',
                    left: `${control_tools_x_cor}px`,
                    top: `${control_tools_y_cor}px`,
                    backgroundColor: 'blue'
                }} >
                    {/* <Stack spacing={2} direction= 'row'>
                        <div>Write</div>
                    </Stack> */}
                </Box>    
            )
        }
    } 

    return(
        <Box sx={{
            border: '1px solid black',
            position: 'relative'
        }}>
            {/* Editing tools */}
            <Box sx={{
                height: '10vh'
            }}>
            </Box>
            {/* Todo: Control tools */}
            {control_tools_box()}
            <textarea className="playground-text" placeholder="Enter text" onMouseUp={handleMouseUp}></textarea>
        </Box>
    )
}