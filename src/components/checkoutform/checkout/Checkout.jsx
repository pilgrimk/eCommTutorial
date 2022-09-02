import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Button,
  CircularProgress
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/Commerce'

const Checkout = ({ cart, order, onCaptureCheckout, errorMessage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const steps = ['Shipping address', 'Payment details'];

  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(
          cart.id,
          { type: 'cart' });

        setCheckoutToken(token);
      } catch (error) {
        console.log(error.data.error.message);
        navigate('/');
      }
    }

    generateToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
  const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    (!errorMessage) ? (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </div>
    ) : (
      <>
        <div>
          <Typography variant="h5">Error: {errorMessage}</Typography>
          <Divider sx={{ margin: '20px 0' }} />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    )
  ));

  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm
      checkoutToken={checkoutToken}
      shippingData={shippingData}
      nextStep={nextStep}
      backStep={backStep}
      onCaptureCheckout={onCaptureCheckout} />
  );

  return (
    <>
      <div style={{ marginTop: '80px' }} />
      <main sx={{
        marginTop: '5%',
        width: 'auto',
        marginLeft: '8px',
        marginRight: '8px'
      }}>
        <Paper sx={{
          marginTop: '12px',
          marginBottom: '12px',
          padding: '8px'
        }}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper 
          activeStep={activeStep}
          sx={{ padding: '8px'}}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>

              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout