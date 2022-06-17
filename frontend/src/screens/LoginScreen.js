import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userAction';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && userInfo.length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const asAdminHandler = () => {
    setEmail('admin@example.com');
    setPassword('123456');
  };

  const asUserHandler = () => {
    setEmail('admin@example.com');
    setPassword('123456');
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-4">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer?{'  '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label className="mx-xl-4, mr-sm-0">Used for demo: </Form.Label>
          <Form.Text className="mx-xl-4, mr-sm-0">
            <Button
              type="submit"
              variant="secondary"
              onClick={asAdminHandler}
              className="ml-2"
            >
              Sign In As Admin
            </Button>
          </Form.Text>
          <Form.Text className="mx-xl-4, mr-sm-0">
            <Button type="submit" variant="secondary" onClick={asUserHandler}>
              Sign In As User
            </Button>
          </Form.Text>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
