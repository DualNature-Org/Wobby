import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import AdminLogin from "./login";
import Tasks from "./tasks";

export default function AdminDashboard() {

    const [page, set_page]= useState('Dashboard')
    const [logined, set_logined]= useState(false)  

    const pages= ['Dashboard', 'Tasks', 'Settings']

    const handle_page= (e)=> {
        set_page(e.target.value)
    }
    const handle_login= ()=> {
        set_logined(true)
    }

    return(
        logined
        ?
        <Grid container>
            <Grid item xs={2} sx={{borderRight: 'solid black 1px'}}>
                <List>
                    {pages.map((page) => (                       
                        <ListItem disablePadding>
                            <ListItemButton onClick={handle_page}>
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
        :
        <AdminLogin onChange={handle_login}/>
    )
}