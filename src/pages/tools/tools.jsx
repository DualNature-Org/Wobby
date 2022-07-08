import { Button, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


export default function Tools(){

    return(
        <Grid container>

            <Grid item xs= {2}>
                <Stack>
                    <Button>Playground</Button>
                    <Button>Parapharse</Button>
                </Stack>
            </Grid>

            <Grid item xs= {10}>
                <Box sx={{
                    width: 200,
                    height: 400,
                    borderLeft: "solid black 2px",                        
                }}>
                </Box>
            </Grid>
            
        </Grid>
    )
}