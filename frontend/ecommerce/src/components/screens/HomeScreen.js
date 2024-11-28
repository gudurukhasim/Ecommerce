import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Product from '../product'; // Ensure correct casing
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productsActions';
import Loader from '../Loader';
import Message from '../Message';

function HomeScreen() {
    const dispatch = useDispatch()
    const productsList = useSelector((state)=>state.productsList);
    const {error,loading,products}=productsList
    

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <Container>
            <br />
            <h1>Products</h1>
            {
                loading ? (
                    <Loader />
                    
                ):error ? (
                    <Message variant='danger'>{error}</Message>
                ):(
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                )
            }
        </Container>
    );
}

export default HomeScreen;