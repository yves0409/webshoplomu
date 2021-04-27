import React from "react";

const divSocial = {
  color: "blue",
  display: "flex",
  flexDirection: "row",
  fontSize: "1.8rem",
  justifyContent: "center",
};

const Social = () => {
  return (
    <>
      <div className="social" style={divSocial}>
        <a
          style={{ color: "#833AB4", margin: "10px" }}
          href="https://www.instagram.com"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          style={{ color: "rgb(29, 54, 163)", margin: "10px" }}
          href="https://www.facebook.com"
        >
          <i className="la la-facebook-official"></i>
        </a>
        <a
          style={{ color: "#25d366", margin: "10px" }}
          href="https://www.whatsapp.web.com"
        >
          <i className="la la-whatsapp"></i>
        </a>
      </div>
    </>
  );
};

export default Social;
