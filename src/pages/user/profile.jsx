import { Box, Container } from "@mui/system";
import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";


export default function Profile(props){

    const handle_logout= ()=> {

    }
    return (
        <Container>
            <br/>
            <Typography variant='h5'>
                Hello, {props.username}
            </Typography>
            <br/>
            <Button variant="contained" onClick={handle_logout}>Logout</Button>
        </Container>
    )
}