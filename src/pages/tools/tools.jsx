import { Button, Grid, Stack } from "@mui/material";
import Playground from "./playground";
import './tools.css'


export default function Tools(){

    return(
        <Grid container>

            {/* sidebar */}
            <Grid item xs= {2} sx={{background: '#eaecf2'}}>
                <Stack spacing={1}>
                    <Button>Playground</Button>
                    <Button>Parapharse</Button>
                </Stack>
            </Grid>

            {/* main area */}
            <Grid item xs= {10}>
                <Playground/>
            </Grid>
            
        </Grid>
    )
}