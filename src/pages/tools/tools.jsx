import { Button, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Playground from "./playground";
import './tools.css'


export default function Tools(){

    return(
        <Box sx={{
            padding: '4rem 2rem 0 2rem',
            bgcolor: '#E6DDD6'
        }}>
            <Playground/>
        </Box>
    )
}