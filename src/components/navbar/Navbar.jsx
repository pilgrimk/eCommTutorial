import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from '../../assets/commerce.png'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ totalItems }) => {
    const location = useLocation();

    return (
        <>
            <AppBar
                postition='sticky'
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                }}
                color='inherit'
            >
                <Toolbar>
                    <Typography
                        component={Link}
                        to='/'
                        variant='h6'
                        sx={{
                            flexGrow: 1,
                            alignItems: 'center',
                            display: 'flex',
                            textDecoration: 'none'
                        }}
                        color='inherit'
                    >
                        <img
                            src={logo}
                            alt='Commerce.js'
                            height='25px'
                            style={{ marginRight: '10px' }}
                        />
                        eCommerce Site
                    </Typography>
                    <div style={{flexGrow: 1}}/>
                    {location.pathname === '/' && (

                        <div>
                            <IconButton
                                component={Link}
                                to='/cart'
                                area-label='Show cart items'
                                color='inherit'
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color='secondary'
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar