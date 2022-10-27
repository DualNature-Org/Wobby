import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";

export default function TaskDescription() {
    return(
        <Container sx={{margin: '2rem 0'}}>
            <Paper sx={{padding: '1rem'}}>
                <Grid container justifyContent={'space-between'} marginBottom='1rem'>
                    <Grid item>
                        <Typography variant="h5">Task Description</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handle_back}><ArrowBackIcon></ArrowBackIcon></IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}