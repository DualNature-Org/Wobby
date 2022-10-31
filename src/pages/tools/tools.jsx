import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from 'react'
import Playground from "./playground";
import Rephraser from "./rephraser"
import './tools.css'


export default function Tools(){
    const [page, set_page]= useState('Playground')
    const pages= ['Playground', 'Rephraser', 'Summariser']

    const handle_page= (e)=> {
        set_page(e.target.name)
    }
    const render_tool= ()=> {
        console.log(page)
        if(page == 'Playground'){
            return <Playground/>
        }
        else if(page == 'Rephraser'){
            return <Rephraser/>
        }
        // else{
        //     return <Summariser/>
        // }
    }
    return(
        <Box sx={{
            padding: '4rem 0 0 0',
            bgcolor: '#E6DDD6'
        }}>
            <Grid container>
                <Grid item xs={2} sx={{borderRight: 'solid black 1px'}}>
                    <List>
                        {pages.map((page) => (                       
                            <ListItem disablePadding>
                                <ListItemButton onClick={(e) => set_page(page)}>
                                    <ListItemText primary={page}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs= {10}>
                    {render_tool()}
                </Grid>
            </Grid>
        </Box>
    )
}