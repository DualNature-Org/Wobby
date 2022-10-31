import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Rephraser(){
    const [content, set_content]= useState('')

    const handle_content= (e)=> {
        set_content(e.target.value)
    }
    const handle_click= (e)=> {
        
    }

    return(
        <Box sx={{
            background: '#E6DDD6',
            marginTop: '2rem'
        }}>
            <Grid container>
                <Grid item xs={5}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <textarea name='content' cols='40' rows='30' style={{outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}}></textarea>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px'}}>
                        <Button variant="contained" onClick={handle_click}>Submit</Button>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <textarea name="output" cols="40" rows="30" style={{outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'roboto'}}></textarea>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}