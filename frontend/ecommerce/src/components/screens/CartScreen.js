import React, { useEffect } from 'react'
import { Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import {Row,Col,Image,Button,Card,Container,ListGroup,Form} from "react-bootstrap";
import Loader from '../Loader'
import Message from '../Message';
import { addToCart,removeFromCart } from '../../actions/cartActions';
import {useDispatch,useSelector} from 'react-redux'


function CartScreen({params}) {
  const {id} = useParams()
   const productId = id;
   const navigate = useNavigate()
   const location =useLocation()
   const dispatch = useDispatch()

   const cart = useSelector(state => state.cart)
   const {cartItems} = cart;

  const qty = location.search ? Number(location.search.split('=')[1]):1
 

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = (id)=>{
    navigate("/login?redirect=shipping");
  }
  
  return (
    <>
    <Row>
    
      <Col md={8}>
      <Container>
    <h1> cart Items</h1>
    {cartItems.length === 0?(
      <Message variant='info'>
        your cart is Empty <Link to='/'>Go Back</Link>
      </Message>
    ) :(
      
      <ListGroup variant='flush'>
        {cartItems.map(item =>(
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
               <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={2}>
                Rs.{item.price}
              </Col>
              <Col md={3}>
                <Form.Control as='select' value={item.qty} 
                onChange={(e)=> dispatch(addToCart(item.product , Number(e.target.value)))}>
                  
                  {
                    
                    [...Array(item.stockcount ).keys()].map((x)=>(
                      
                      <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                    ))
                  }
                  
                </Form.Control>
                
              </Col>
              <Col md={1}>
                <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                  <i className='fa fa-trash'></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      
    )}
    </Container>
    </Col>
    
    </Row>
      
    </>
  )
}

export default CartScreen
