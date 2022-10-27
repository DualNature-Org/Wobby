import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";

export default function UserDashboard(){

    const [index, set_index]= useState(0)

    const handle_list_item= (e, index)=> {
        set_index(index)
    }

    return(
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
                    <ListItem disablePadding>
                        <ListItemButton selected={index === 2} onClick={(e)=> handle_list_item(e, 2)}>
                            <ListItemText primary='Settings' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={index === 3} onClick={(e)=> handle_list_item(e, 3)}>
                            <ListItemText primary='Log Out' />
                        </ListItemButton>
                    </ListItem>
                </List>             
            </Grid>

            <Grid item xs={10}>
                <Container>
                    <div>hello user</div>
                </Container>
            </Grid>
            
        </Grid>
    )
}