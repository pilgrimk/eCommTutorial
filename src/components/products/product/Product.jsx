import React from 'react'
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, IconButton
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'

const Product = ({ product, onAddToCart }) => {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
                sx={{ pt: '56.25%' }}
                image={product.image.url}
                title={product.name}
            />
            <CardContent>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' >
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant='body2'
                    color='textSecondary'
                />
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
                disableSpacing>
                <IconButton
                    aria-label='Add to Cart'
                    onClick={() => onAddToCart(product.id, 1)}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product