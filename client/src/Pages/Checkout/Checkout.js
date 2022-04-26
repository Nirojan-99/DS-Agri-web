import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Header from "../../Components/Header";
import { useState } from "react";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Review handleNext={handleNext} handleBack={handleBack} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box component={Paper} py={0.1} square elevation={1} minHeight="83vh">
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography
              component="h1"
              variant="h3"
              align="center"
              sx={{ color: "#62BB46" }}
            >
              Checkout
            </Typography>
            <Stepper
              activeStep={activeStep}
              sx={{ my: 3, py: 3, border: "2px solid #62BB46" }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.`}
                  </Typography>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  ></Box>
                </>
              )}
            </>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
