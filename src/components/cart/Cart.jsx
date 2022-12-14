import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import CartItem from './cartitem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({
    cart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart
}) => {

    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            You have not items in your cart,
            <Link to='/' style={{textDecoration: 'none'}}> start adding some</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem
                            item={item}
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div style={{
                display: 'flex',
                marginTop: '10%',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        sx={{minwidth: '150px'}}
                        size='large'
                        type='button'
                        variant='contained'
                        color='secondary'
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </Button>
                    <Button
                        component={Link}
                        to='/checkout'
                        sx={{minwidth: '150px'}}
                        size='large'
                        type='button'
                        variant='contained'
                        color='primary'
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return 'Loading...';

    return (
        <Container>
            <div style={{ marginTop: '80px' }}/>
            <Typography
                sx={{ marginTop: '5%' }}
                variant='h3'
                gutterBottom
            >
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart