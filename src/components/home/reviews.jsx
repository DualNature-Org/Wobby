import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Paper,
    Rating,
    Stack,
    Typography,
  } from "@mui/material";
  import { Box, Container } from "@mui/system";
  import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
  import { reviewsData } from "../../data/reviews-data";
  
  const Reviews = () => {
    return (
      <Fragment>
        <Container
          maxWidth={false}
          sx={{
            padding: "0 0 6rem 0",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="column" spacing={5} justifyContent="center" width="70%">
            <Typography variant="h4" marginBottom={4}>
              Reviews
            </Typography>
            <Carousel sx={{maxWidth:'100%',}}>
            {
                reviewsData.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
          </Stack>
        </Container>
      </Fragment>
    );
  };
  
  export default Reviews;

  function Item(props)
{
    return (
        <Paper sx={{paddingBlock:'20px'}}>
            <h2>{props.item.name}</h2>
            <Rating name="read-only" value={props.item.value} readOnly />
            <p>{props.item.description}</p>
        </Paper>
    )
}
  