import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import {Row,Col,Image,Button,Card,Container,ListGroup,Form} from "react-bootstrap";
import Rating from '../Rating';
import { productDetailsReducers } from '../../reducers/productsReducers';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productsActions';
import Loader from '../Loader'
import Message from '../Message';

function ProductScreen({params}) {
  const navigate = useNavigate()
  const location = useLocation()
    const{id}=useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector((state)=>state.productDetails);
    const {error,loading,product}=productDetails
    const [qty ,setQty]= useState(1)

    useEffect(() => {
  
      dispatch(listProductDetails(id))
      
        }, [dispatch,params]);

        const addToCartHandler = ()=>{
          navigate(`/cart/${id}?qty=${qty}`)
        }

        return (
          <Container>
          <div>
                <Link to="/" className="btn btn-dark my-3">
              Go Back
            </Link>
      
      
            {loading?(
              <Loader />
            ): error?(
              <Message variant='danger'>{error}</Message>
            ):(
              <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
      
          <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.Productname}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Brand: {product.productbrand} </ListGroup.Item>
      
                  <ListGroup.Item>Description: {product.productinfo}</ListGroup.Item>
                </ListGroup>
          </Col>
      
      
      
      
          <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{product.price} Rs</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.stock >0 &&(
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className='my-1'>
                          <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                            {
                              [...Array(product.stock).keys().map((x)=>(
                                <option key={x+2} value={x+1}>
                                  {x+1}
                                </option>
                              ))]
                            }

                          </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                
                  <ListGroup.Item>
                      <Button className='btn-block btn-success' disabled={product.stock==0} type='button' onClick={addToCartHandler}>Add to Cart</Button>
      
                  </ListGroup.Item>
      
      
                  </ListGroup>
                </Card>
              </Col>
      
          </Row>
      
            )}
      
          </div>
          </Container>
        )
      }
      
      export default ProductScreen