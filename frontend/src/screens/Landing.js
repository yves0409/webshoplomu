import React from "react";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import LomuBackground from "../bgim/lomuLanding.png";

const Landing = ({ enterHomePage }) => {
  return (
    <Container fluid>
      <div
        className="text-center "
        style={{
          backgroundImage: `url(${LomuBackground})`,
          backgroundSize: "100vw 100vh",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Button onClick={enterHomePage} variant="outlined" className="mt-3">
          Enter
        </Button>
        {/* <div className="welcometext">
          <h1>
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
          </h1>
          <h1>
            <span>t</span>
            <span>o</span>
          </h1>
        </div> */}
        {/* <div className="bounce">
          <img src={Logo} className="logo" alt="" height="70px" width="70px" />
          <div className="shadow"></div>
        </div>  */}
      </div>
    </Container>
  );
};

export default Landing;
