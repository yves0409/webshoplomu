import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactList } from "../redux/actions/contactActions";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import {
  MdEmail,
  MdPhoneIphone,
  MdQuestionAnswer,
  MdInfoOutline,
} from "react-icons/md";
import { IconContext } from "react-icons";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
import QandA from "../components/QandA";
import Social from "../components/Social";

const headerIcon = {
  style: {
    fontSize: "20px",
    color: "black",
    margin: "3px 10px 0 0",
  },
};

const contactIcon = {
  style: {
    fontSize: "15px",
    color: "black",
    marginRight: "10px",
  },
};

const opacity = {
  backgroundColor: "rgba(245, 245, 245, 0.6)",
};

const ContactScreen = () => {
  const dispatch = useDispatch();

  //contactList is defined in the redux store
  const listContact = useSelector((state) => state.listContact);
  const { loading, error, contacts } = listContact;
  const { qaProduct, qaShipping, qaPayments, qaPromotions } = contacts;

  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  return (
    <>
      <h1 className="pb-4 mb-4">Information Page</h1>
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification variant="danger">{error}</Notification>
      ) : (
        <>
          <Row>
            <Col lg={12} className="mb-5">
              <IconContext.Provider value={headerIcon}>
                <div className="text-center d-flex justify-content-md-center">
                  <MdInfoOutline />
                  <h2 id="about" className="pb-4">
                    About
                  </h2>
                </div>
              </IconContext.Provider>

              <p>{contacts.about}</p>
            </Col>
          </Row>
          <hr className="mb-5" />
          <Row>
            <Col lg={12} className="p-5 mb-5" style={opacity}>
              <IconContext.Provider value={headerIcon}>
                <div className="text-center d-flex justify-content-md-center">
                  <MdEmail />
                  <h2 id="contact">Contact</h2>
                </div>
              </IconContext.Provider>

              <Social />

              <Row>
                <Col lg="6">
                  <IconContext.Provider value={contactIcon}>
                    <div className="text-center d-flex justify-content-md-center">
                      <MdEmail />

                      <h5>Email</h5>
                    </div>
                    <p className="text-center">
                      <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                    </p>
                    <p className="text-center">
                      <a href={`mailto:${contacts.secondaryEmail}`}>
                        {contacts.secondaryEmail}
                      </a>
                    </p>
                  </IconContext.Provider>
                </Col>
                <Col lg="6">
                  <IconContext.Provider value={contactIcon}>
                    <div className="text-center d-flex justify-content-md-center">
                      <MdPhoneIphone />
                      <h5>Phone</h5>
                    </div>
                    <p className="text-center">
                      <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
                    </p>
                    <p className="text-center">
                      <a href={`tel:${contacts.secondaryPhone}`}>
                        {contacts.secondaryPhone}
                      </a>
                    </p>
                  </IconContext.Provider>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr className="mb-5" />
          <Row>
            <Col lg={12}>
              <Accordion style={opacity} className="pt-5 pb-4 ">
                <IconContext.Provider value={headerIcon}>
                  <div className="text-center d-flex justify-content-md-center">
                    <MdQuestionAnswer />
                    <h2 id="faq">FAQ</h2>
                  </div>
                </IconContext.Provider>
                <Card style={opacity}>
                  <Card.Header className="text-center">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div>Shipping and returns</div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <QandA faq={qaShipping} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card style={opacity}>
                  <Card.Header className="text-center">
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      <div>Products</div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <QandA faq={qaProduct} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card style={opacity}>
                  <Card.Header className="text-center">
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      <div>Payments</div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <QandA faq={qaPayments} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card style={opacity}>
                  <Card.Header className="text-center">
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      <div>Promotions and discounts</div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <QandA faq={qaPromotions} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ContactScreen;
