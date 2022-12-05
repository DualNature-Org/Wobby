import { Box, Container } from "@mui/system";
import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";


export default function Profile(props){
    return (
        <Container>
            <br/>
            <Typography variant='h5'>
                Hello, {props.username}
            </Typography>
            <br/>
            
        </Container>
    )
}