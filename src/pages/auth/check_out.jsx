import { Button, Paper, Table, TableBody, TableCell, TableContainer, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function CheckOut(props){
    return (
        <Container sx={{marginTop: '4rem'}}>
            <Paper elevation={3} sx={{padding: '1rem'}}>
                <Typography variant="h5">Check Out Your Purchase</Typography>
                <br></br>
                <TableContainer component={'paper'}>
                    <Table aria-label='simple table'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Order_Id</TableCell>
                                <TableCell>{props.order['id']}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>{props.order['amount']/100}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Currency</TableCell>
                                <TableCell>{props.order['currency']}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained">Pay</Button>
                </Box>
            </Paper>
        </Container>
    )
}