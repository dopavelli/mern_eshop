import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  console.log(match.params.id);
  console.log('test');

  const dispatch = useDispatch();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address:</h2>
              <p>
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}
                <br />
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>{order.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order:</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${order.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <span className="cash">
                            {item.quantity} x ${item.price} = $
                            {item.quantity * item.price}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    <span className="cash">${order.itemsPrice}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    <span className="cash">${order.shippingPrice}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    <span className="cash">${order.taxPrice}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    <span className="cash">${order.totalPrice}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
