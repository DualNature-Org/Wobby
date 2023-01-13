import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { Fragment } from "react";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {pricingData} from '../../data/pricing-data.js'

const Pricing = () => {
  return (
    <Fragment>
      <Container
        maxWidth={false}
        sx={{
          padding: "12rem 0",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h4" marginBottom={4}>
            Pricing
          </Typography>
          <Box sx={{display:'flex', width:'100%', justifyContent:'center', flexWrap:'wrap', gap:'50px', marginY:'50px'}}>
            {pricingData.map(({id, title, description, price, color, backgroundColor}) => (
            <Card key={id} sx={{ maxWidth: 300, minHeight:300, padding:'20px', backgroundColor: backgroundColor }}>
              <CardContent>
                <MonetizationOnIcon sx={{fontSize:"60px", marginBottom:'20px', color:color}} />
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography color={color} gutterBottom variant="h4" component="div">
                ${price}/year
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="medium" sx={{width:'100%', marginTop:'20px', backgroundColor:color}}>Purchase now</Button>
              </CardActions>
            </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Pricing;
