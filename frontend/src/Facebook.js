import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "react-bootstrap";

const Facebook = ({ facebookLog }) => {
  const responseFacebook = (response) => {
    console.log(response);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log("FACEBOOK LOGIN SUCCESS", response.data);
        facebookLog(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })

      .catch((error) => {
        console.log("FACEBOOK LOGIN ERROR", error);
      });
  };

  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            className="btn btn-primary btn-md btn-block rounded "
          >
            <i className="fab fa-facebook pr-2"></i> Login with Facebook
          </Button>
        )}
      />
    </div>
  );
};

export default Facebook;
