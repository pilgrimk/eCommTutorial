import React, { useEffect, useState } from 'react'
import { Grid, Box, Pagination, Divider } from '@mui/material'
import Product from './product/Product'

const Products = ({ products, onAddToCart, onHandleSetAlert }) => {
    const pageSize = 4;

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: 0
    });

    const [currentProducts, setCurrentProducts] = useState([]);

    const handlePageChange = ((event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination({ ...pagination, from: from, to: to });
        setCurrentProducts(products.slice(from, to));
    });

    useEffect(() => {
        setPagination({ ...pagination, count: products.length });
        setCurrentProducts(products.slice(0, pageSize));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(() => {
        setPagination({ ...pagination, count: products.length });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.from, pagination.to]);

    return (
        <main sx={{ flexGrow: '1' }}>
            <div style={{ marginTop: '80px' }} />
            <Grid container justifyContent='center' spacing={4}>
                {currentProducts.map((product) => (
                    <Grid item
                        key={product.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <Product
                            product={product}
                            onAddToCart={onAddToCart}
                            onHandleSetAlert={onHandleSetAlert}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                display={'flex'}
                margin={'20px'}
            >
                <Divider sx={{ margin: '20px 0' }} />
                <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                />
            </Box>
        </main>
    )
}

export default Products;