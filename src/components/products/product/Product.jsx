import React, { useState, useEffect } from 'react'
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, IconButton
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import xtype from 'xtypejs'
import { Variants } from '../../index'
import { commerce } from '../../../lib/Commerce'

const Product = ({ product, onAddToCart, onHandleSetAlert }) => {
    const [variants, setVariants] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({});

    const getVariants = async (productId) => {
        const { data } = await commerce.products.getVariants(productId);
        if (xtype.type(data) === 'array') {
            setVariants(data);
        };
    };

    const handleSelectedVariant = (variant) => {
        setSelectedVariant(variant);
    };

    const addToCart = () => {
        let err_mess = 'You must select an option before adding this item to cart'

        if ((xtype.type(variants) === 'array') &&
        (variants.length > 0) &&
        (xtype.type(selectedVariant['id']) === 'undefined')) {
            onHandleSetAlert('warning', err_mess);
            return;
        };

        if (xtype.type(selectedVariant) === 'object') {
            onAddToCart(product.id, 1, selectedVariant['id']);
        } else {
            onAddToCart(product.id, 1, '');
        }; 
    };

    useEffect(() => {
        getVariants(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    justifyContent: 'space-between'
                }}
                disableSpacing>
                <Variants 
                    variants={variants}
                    handleSelectedVariant={(variant) => handleSelectedVariant(variant)}
                />
                <IconButton
                    aria-label='Add to Cart'
                    onClick={() => addToCart()}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product