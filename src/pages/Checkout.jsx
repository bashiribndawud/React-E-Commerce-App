import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Toolbar from "@mui/material/Toolbar";
import AddressFrom from "../components/AddressFrom";
import Payment from "../components/Payment";
import ReviewOrder from "../components/ReviewOrder";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart-slice";
import { clearCheckout } from "../features/checkout-slice";
import { Link } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details", "Review Orders"];

function getStepContent(activeStep) {
  switch (activeStep) {
    case 0:
      return <AddressFrom />;
    case 1:
      return <Payment />;
    case 2:
      return <ReviewOrder />;
    default:
      throw new Error("Unknown Step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if(activeStep === steps.length){
      dispatch(clearCart());
      dispatch(clearCheckout())
      // navigate("/home")
    }
  }, [activeStep])
  function handleNext(){
    setActiveStep(activeStep + 1)
  }
  function handlePrev() {
    setActiveStep(activeStep - 1);
  }

  return (
    <Container component="section" maxWidth="lg" xs={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your order number is #12344 we have email you detail regarding
              your order
            </Typography>
            <Link href="/home">Shop More</Link>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button
                  variant="contained"
                  onClick={handlePrev}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
