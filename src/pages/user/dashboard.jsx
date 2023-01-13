import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import OrderPage from "../auth/order";
import Profile from "./profile";
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserDashboard(props){

    const [index, set_index]= useState(1)
    const [user, set_user]= useState([])

    const handle_list_item= (e, index)=> {
        set_index(index)
    }

    const rendering= ()=> {
        if(index === 1){
            return <Profile username={props.username} />
        }
        else if(index === 2){
            return <OrderPage />
        }
        else{
            return null
        }
    }
    
    return(
        <Box sx={{marginTop: '4rem'}}>
            <Grid container>

                <Grid item xs={2} sx={{borderRight: 'solid #B7B9BA 1px', height:'100vh'}}>
                    <List>
                        {/* <ListItem disablePadding>
                            <ListItemButton selected={index === 0} onClick={(e)=> handle_list_item(e, 0)}>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </ListItem> */}
                        <ListItem disablePadding>
                            <ListItemButton selected={index === 1} onClick={(e)=> handle_list_item(e, 1)}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary='Profile' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton selected={index === 2} onClick={(e)=> handle_list_item(e, 2)}>
                                <ListItemIcon>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText primary='Payment' />
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