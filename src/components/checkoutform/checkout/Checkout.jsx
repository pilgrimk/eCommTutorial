import React, { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Button,
  CircularProgress,
  createTheme
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/Commerce'

// example using DEFAULT theme
const theme = createTheme();

const Checkout = ({ cart, order, onCaptureCheckout, onHandleSetAlert }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
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
        setAlertMessage(`Error message: ${error.data.error.message}`);
        onHandleSetAlert('error', 'Something went wrong.');
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
    (!alertMessage) ? (
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
          <Typography variant="h5">Error: {alertMessage}</Typography>
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
      onCaptureCheckout={onCaptureCheckout}
      onHandleSetAlert={onHandleSetAlert} 
      />
  );

  return (
    <>
      <div style={{ marginTop: '80px' }} />
      <Box sx={{
        marginTop: '5%',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }}>
        <Paper sx={{
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(2),
          [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: 60,
          },
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
          }
        }}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper 
          activeStep={activeStep}
          sx={{ padding: theme.spacing(3, 0, 5)}}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>

              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </Box>
    </>
  )
}

export default Checkout