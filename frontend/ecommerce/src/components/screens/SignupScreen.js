import React ,{useState,useEffect}from 'react'
import {Row,Col,Button,Form,Card, Container, InputGroup} from 'react-bootstrap'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {useDispatch,useSelector,UseSelector} from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { validpassword } from './Regex'
import { signup } from '../../actions/userActions'


function SignupScreen() {
  const navigate = useNavigate()
   const [fname,setFname] = useState('')
   const [lname,setLname] = useState('')
   const [email,setEmail] = useState('')
   const [pass1,setPass1] = useState('')
   const [pass2,setPass2] = useState('')
   const [error , setError] = useState('')
   const [show ,changeshow] = useState('fa fa-eye-slash')
   const dispatch = useDispatch()
   const location = useLocation()

   const redirect = location.search ? location.search.split("#")[1]:"/"
   const userSignup = useSelector((state)=>state.userSignup);
   const { err ,loading ,userInfo}=userSignup;

   useEffect(()=>{
    if(userInfo){
      navigate("/")
    }

   },[userInfo,redirect])

   const handleSubmit =(e)=>{
    e.preventDefault()
    if(pass1 !== pass2){
      setError('password does not match')
      navigate('/signup')
    }
    else if(!validpassword.test(pass1)){
      setError("Password criteria does not match")
    }
    else{
      dispatch(signup(fname,lname,email,pass1))
      setError("signup is Success do activate your account ")
      navigate("/login")
    }
    

   }
   const showpassword =()=>{
    var x =document.getElementById("pass1")
    var z= document.getElementById("pass2")
    if(x.type == "password" && z.type == "password")
    {
      x.type="text"
      z.type="text"
      changeshow('fa fa-eye');
    }
    else{
      x.type = "password"
      z.type="password"
      changeshow('fa fa-eye-slash');
    }
   };
   
  return (
    <>
    <Container className='mt-3'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
        <Card>
          <Card.Header as="h1" className='text-center  bg-black text-white'>signup</Card.Header>
          <Card.Body>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='fname'>
                  <Form.Label><i className='fa fa-user'></i> First Name</Form.Label>
                  <Form.Control type='text' placeholder='first Name' onChange={(e)=>{
                    setFname(e.target.value)
                  }} value={fname} required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='lname'>
                  <Form.Label><i className='fa fa-user'></i> Last Name</Form.Label>
                  <Form.Control  type="text" placeholder='Last Name' onChange={(e)=>{
                    setLname(e.target.value)
                  }} value={lname} required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label><i className='fa-solid  fa-envelope'></i> E-mail</Form.Label>
                  <Form.Control placeholder='Email' type='email'  onChange={(e)=>{
                    setEmail(e.target.value)
                  }} value={email} required/>
                </Form.Group>

                <Form.Group className='mb-3' >
                  <Form.Label><i className={show}></i>  Password</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showpassword} />
                    {" "}
                    <Form.Control placeholder=' Enter Your Password' type='password' id='pass1' onChange={(e)=>{
                      setPass1(e.target.value)
                    }} value={pass1} required/>

                  </InputGroup>
                  
                </Form.Group>
                <small > password must contain atleast [1-9][a-z][A-Z][_$#@....] & 5 characters</small>
                <br />
                <br />
                <Form.Group className='mb-3' >
                  <Form.Label><i className={show}></i> Confirm Password</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox  onClick={showpassword}/>
                    {" "}
                    <Form.Control placeholder='Confirm Password' type='password' id='pass2' onChange={(e)=>{
                      setPass2(e.target.value)
                    }} 
                    value={pass2} required/>

                  </InputGroup>
                  
                </Form.Group>

                <br/>
                <div className='d-grid gap-2'>
                  <Button className='btn btn-md btn-success' type='submit'> Signup </Button> 

                </div>
            </Form>

          <Row className='py-3'>
            <Col>
            Already User ? 
            <Link to="/Login" className='mx-2'>Login</Link>
            </Col>
          </Row>
          </Card.Body>
        </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  
      
    </>
  )
}

export default SignupScreen
