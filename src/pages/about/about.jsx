import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Footer from "../../components/footer";

export default function About(){
    return(
        <React.Fragment>

            <Box sx={{display: 'flex', justifyContent: 'center', padding: '3rem 0', alignItems: 'center', flexDirection: 'column', background: '#f9eaff'}}>
                <Typography variant='h5' marginBottom={2}>About</Typography>
                <Typography variant="b1" sx={{padding: '0 5rem', textAlign: 'center'}}>
                    WOBBY is a project that provides tools for creating digital content using artificial intelligence. The project is developed by DualNature, a company that specializes in artificial intelligence and machine learning. The goal of the project is to make it easier for people to create digital content, such as articles and blogs. The project is still in its early stages, but the company is already working on a number of features that will make it easier for users to create and manage their content.
                </Typography>
            </Box>

        </React.Fragment>
    )
}