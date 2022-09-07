import React, { useState, useEffect } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Navbar, Products, Cart, Checkout, MyAlert } from './components'
import { commerce } from './lib/Commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // example using DEFAULT theme
  const theme = createTheme();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity, variant) => {
    let item = '';
    if (variant === '') {
      item = await commerce.cart.add(productId, quantity);
    } else {
      item = await commerce.cart.add(productId, quantity, variant);
    };

    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response)
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response)
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response)
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      setAlertMessage('');
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();

    } catch (error) {
      setAlertMessage(`Error message: ${error.data.error.message}`);
      handleSetAlert('error', 'Something went wrong.');
    }
  };

  const handleClearAlert = () => {
    setAlertState(false);
    setAlertSeverity('');
    setAlertMessage('');
  };

  const handleSetAlert = (severity, message) => {
    setAlertState(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
    handleScrollToTop();
  };

  const handleScrollToTop = () => {
    window.scrollTo(0,0);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar totalItems={cart.total_items} />
          {alertState ?
            <MyAlert
              severity={alertSeverity}
              message={alertMessage}
              handleClearAlert={handleClearAlert}
            />
            :
            <></>
          }
          <Routes>
            <Route exact path='/'
              element={<Products
                products={products}
                onAddToCart={handleAddToCart}
                onHandleSetAlert={handleSetAlert}
              />}>
            </Route>
            <Route exact path='/cart'
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />}>
            </Route>
            <Route exact path='/checkout'
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  onHandleSetAlert={handleSetAlert} />}>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App