import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import Tasks from "./tasks";

export default function AdminDashboard() {

    const [page, setPage]= useState('dashboard')
    const pages= ['Dashboard', 'Tasks']


    return(
        <Grid container>
            <Grid item xs={2} sx={{borderRight: 'solid black 1px'}}>
                <List>
                    {pages.map((page) => (                       
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={page}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid> 
            
            <Grid item xs={10}>
                <Tasks/>
            </Grid>
        </Grid>
    )
}