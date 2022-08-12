import React, { useState, useEffect } from 'react'
import { Navbar, Products, Cart } from './components'
import { commerce } from './lib/Commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    {/*console.log(item);*/ }
    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    console.log(response);
    setCart(response)
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    console.log(response);
    setCart(response)
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    console.log(response);
    setCart(response)
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  {/*console.log(cart);*/ }

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path='/'
            element={<Products
              products={products}
              onAddToCart={handleAddToCart}
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
        </Routes>
      </div>
    </Router>
  )
}

export default App