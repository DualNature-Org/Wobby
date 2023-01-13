import { Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

export default function CheckOut(props){
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:5000/payment/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const handleModal = () => {
        props.setModal(!props.modal)
    }

    return (
        <Modal open={props.modal} sx={{marginTop: '4rem'}}>
            <Paper elevation={3} sx={{padding: '1rem', height:'100vh'}}>
                <Typography variant="h5">Check Out Your Purchase</Typography>
                <IconButton sx={{position:'absolute', right:'5%'}} onClick={() => handleModal()}><BackspaceOutlinedIcon fontSize="50px" /></IconButton>
                <br></br>
                <TableContainer component={'paper'}>
                    <Table aria-label='simple table'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Order_Id</TableCell>
                                {/* <TableCell>{props.order['id']}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                {/* <TableCell>{props.order['amount']/100}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell>Currency</TableCell>
                                {/* <TableCell>{props.order['currency']}</TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{display: 'flex', justifyContent: 'center', marginY:'40px'}}>
                    <Button variant="contained" onClick={displayRazorpay}>Pay</Button>
                </Box>
            </Paper>
        </Modal>
    )
}