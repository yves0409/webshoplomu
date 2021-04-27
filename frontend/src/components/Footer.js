import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// const divSocial = {
//   color: "blue",
//   position: "fixed",
//   left: "20px",
//   top: "40%",
//   display: "flex",
//   flexDirection: "column",
//   fontSize: "1.8rem",
// };

const Footer = () => {
  return (
    <footer>
      {/* <div className="social" style={divSocial}>
        <a style={{ color: "#833AB4" }} href="https://www.instagram.com">
          <i className="fab fa-instagram"></i>
        </a>
        <a
          style={{ color: "rgb(29, 54, 163)" }}
          href="https://www.facebook.com"
        >
          <i className="la la-facebook-official"></i>
        </a>
        <a style={{ color: "#25d366" }} href="https://www.whatsapp.web.com">
          <i className="la la-whatsapp"></i>
        </a>
      </div> */}
      <Container>
        {/* <Row>
          <Col className="text-center py-3">
            <h5>About</h5>
            <IconContext.Provider
              value={{ style: { fontSize: "20px", color: "darkgrey" } }}
            >
              <div className="footercontent">
                <MdInfoOutline />
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters
                </p>
              </div>
            </IconContext.Provider>
          </Col>
          <Col className="text-center py-3">
            <h5>F.A.Q.</h5>
            <IconContext.Provider
              value={{ style: { fontSize: "20px", color: "darkgrey" } }}
            >
              <div className="footercontent">
                <MdQuestionAnswer />
                <ul className="faqlinks">
                  <li>
                    <a href="/">Are the candles soy based?</a>
                  </li>
                  <li>
                    <a href="/">Can I customize the glass?</a>
                  </li>
                  <li>
                    <a href="/package-lock.json">Do you ship internationaly?</a>
                  </li>
                  <li>
                    <a href="/">More...</a>
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </Col>
          <Col className="text-center py-3">
            <h5>Contact</h5>
            <IconContext.Provider
              value={{ style: { fontSize: "20px", color: "darkgrey" } }}
            >
              <div className="footercontent">
                <MdEmail />{" "}
                <p>
                  <a href="mailto:test@gmail.com">fathia.loeys@gmail.com</a>
                </p>
                <MdPhoneIphone />
                <p>
                  <a href="tel:+1(323)564 4356">+1(323)564 4356</a>
                </p>
              </div>
            </IconContext.Provider>
          </Col>
        </Row>
        <hr /> */}
        <Row>
          <Col className="text-center py-3">Copyright &copy; Yves Loeys</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
