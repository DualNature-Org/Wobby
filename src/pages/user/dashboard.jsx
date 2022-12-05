import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import Profile from "./profile";

export default function UserDashboard(){

    const [index, set_index]= useState(1)
    const [user, set_user]= useState([])

    const handle_list_item= (e, index)=> {
        set_index(index)
    }

    const rendering= ()=> {
        if(index === 1){
            return <Profile user={user} />
        }
        else{
            return null
        }
    }
    
    return(
        <Box sx={{marginTop: '4rem'}}>
            <Grid container>

                <Grid item xs={2} sx={{borderRight: 'solid black 1px'}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton selected={index === 0} onClick={(e)=> handle_list_item(e, 0)}>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton selected={index === 1} onClick={(e)=> handle_list_item(e, 1)}>
                                <ListItemText primary='Profile' />
                            </ListItemButton>
                        </ListItem>
                    </List>             
                </Grid>

                <Grid item xs={10}>
                    {rendering()}
                </Grid>
                
            </Grid>
        </Box>
    )
}