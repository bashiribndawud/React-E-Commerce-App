import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardContent, Rating, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getCartSubTotal } from "../utils/utils";
import { addToCart, removeFromCart } from "../features/cart-slice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const subtotal = getCartSubTotal(cartItems).toFixed(2)
  const navigate = useNavigate()
  const theme = useTheme();
  const dispatch = useDispatch()
  const updateQuantity = (e, { product, quantity }) => {
    const updatedQuantity = e.target.valueAsNumber;
    if(updatedQuantity < quantity){
      // remove from cart
      dispatch(removeFromCart({product}))
    }else{
      dispatch(addToCart({product}))
    }
  };

  const goToHome = () => {
    navigate('/home')
  }
  const checkOutItem = () => {
    navigate('/checkout')
  }
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item spacing={2} md={8}>
          {cartItems.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} sx={12}>
                <Card sx={{ display: "flex", py: 2, marginBottom: 3 }}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt="Product Image"
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(2),
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form action="">
                        <TextField
                          sx={{ width: theme.spacing(8) }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                          onChange={(e) =>
                            updateQuantity(e, { product, quantity })
                          }
                        />
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getCartSubTotal([{ product, quantity }])}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" md={4}>
                Subtotal
              </Typography>
              <Typography variant="h6" md={4}>
                {subtotal}
              </Typography>
              {subtotal > 0 ? (
                <Button variant="contained" onClick={checkOutItem}>
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  Shop Product
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
