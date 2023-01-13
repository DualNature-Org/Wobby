import React, { Fragment } from "react";
import { Box, Container } from "@mui/system";
import logo from "../../asset/icons/logo_wobby.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Fragment>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "250px",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0px 20px 0px",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor:'#E2E8FD'
        }}
      >
        <Box sx={{ display: "inline-flex" }}>
          <img src={logo} alt="logo" width="40px" />
          <Typography variant='h4' sx={{ marginLeft: "10px", fontWeight: "600" }}>
            Wobby
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "500px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            fontWeight: "500",
            color: "GrayText",
          }}
        >
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/privacy">
            Policy
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/terms">
            Terms
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/refund">
            Refund
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/shipping">
            Delivery
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/contact_us">
            Contact
          </a>
        </Box>
        <Box
          sx={{
            maxWidth: "500px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            fontWeight: "500",
          }}
        >
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/privacy">
            <InstagramIcon color="primary" />
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/terms">
            <FacebookIcon color="primary" />
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/refund">
            <TwitterIcon color="primary" />
          </a>
          <a href="https://merchant.razorpay.com/policy/KcWGeJQrPKn8Gz/shipping">
            <LinkedInIcon color="primary" />
          </a>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Footer;
