import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { validpassword } from "./Regex";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");

  const [show, changeshow] = useState("fa fa-eye-slash");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email,pass1))
  };
  const showpassword = () => {
    var x = document.getElementById("pass1");
    var z = document.getElementById("pass2");
    if (x.type == "password") {
      x.type = "text";
      changeshow("fa fa-eye");
    } else {
      x.type = "password";
      changeshow("fa fa-eye-slash");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h1" className="text-center  bg-black text-white">
                signup
              </Card.Header>
              <Card.Body>
              {error && <Message variant="danger">{error}</Message>}
                { loading && <Loader/>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <i className="fa-solid  fa-envelope"></i> E-mail
                    </Form.Label>
                    <Form.Control
                      placeholder="Email"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className={show}></i> Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox onClick={showpassword} />{" "}
                      <Form.Control
                        placeholder=" Enter Your Password"
                        type="password"
                        id="pass1"
                        onChange={(e) => {
                          setPass1(e.target.value);
                        }}
                        value={pass1}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <br />
                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      {" "}
                      Login{" "}
                    </Button>
                  </div>
                </Form>

                <Row className="py-3">
                  <Col>
                    New User ?
                    <Link to="/Signup" className="mx-2">
                      Signup
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
