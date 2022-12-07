import { CardActions, CardContent, Container, Grid, Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Card from '../../components/tools_card'


export default function Tools(){
    return(
        <Box sx={{
            marginTop: '4rem',
            height: '82vh',
            bgcolor: '#d7d7ff'
        }}>
            <br/>
            <Container>
                <Typography variant="h5">
                    Tools
                </Typography>
                <br/>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row'}} width={'100%'}>
                    <Card name="Paper" description="An autonomous text editor, suppports most of the tools." link='/tools/paper'></Card>
                </Stack>
                <br/>
                <Typography variant="h6">
                    In progress, Coming soon...
                </Typography>
                <br/>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row'}} width={'100%'}>
                    <Card name="Paraphraser" description="For repharing large chunks of content." link='/tools/paraphraser'></Card>
                    <Card name="Summariser" description="For summarise large chunk of content." link='/tools/playground'></Card>
                    <Card name="Referencer" description="Search and generate references and citations in different format." link='/tools/playground'></Card>
                </Stack>
            </Container>
            <br/>
        </Box>
    )
}