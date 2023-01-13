import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

export default function Footer() {
    return(
        <Box sx={{position: 'fixed', bottom: '0', width: '100%', padding: '.1rem', backgroundColor:'#1976d2'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="subtitle2" sx={{color: '#fff'}}>
                    ...
                </Typography>
            </Container>
        </Box>
    )
}