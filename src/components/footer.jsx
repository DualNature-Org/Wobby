import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

export default function Footer() {
    return(
        <Box sx={{position: 'fixed', bottom: '0', width: '100%', background: '#6b5cbd', padding: '.1rem'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="subtitle2" sx={{color: '#fff'}}>
                    ...
                </Typography>
            </Container>
        </Box>
    )
}