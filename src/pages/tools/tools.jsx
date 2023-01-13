import { CardActions, CardContent, Container, Grid, Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Card from '../../components/tools_card'
import toolImg from '../../asset/images/toolImg.jpg'


export default function Tools(){
    return(
        <Box sx={{
            marginTop: '4rem',
            height: '90vh'
        }}>
            <br/>
            <Container>
                <Typography variant="h4" marginBottom={5} sx={{textAlign:'center'}}>
                    Tools
                </Typography>
                <br/>
                <Box sx={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap'}}>
                    <Card name="Paper" description="An autonomous text editor, suppports most of the tools." link='/tools/paper'></Card>
                    <img src={toolImg} alt="tools" width="60%" />
                </Box>
            </Container>
            <br/>
        </Box>
    )
}