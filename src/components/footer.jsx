import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

export default function Footer() {
    return(
        <Box sx={{display: 'fixed', bottom: '0', background: '#9284e1', padding: '.5rem'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="subtitle2">
                    Copyright by dualnature.org @2022
                </Typography>
            </Container>
        </Box>
    )
}