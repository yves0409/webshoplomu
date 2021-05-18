import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = ({ googleLog }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("GOOGLE LOGIN SUCCESS", response.data);
        googleLog(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })

      .catch((error) => {
        console.log("GOOGLE LOGIN ERROR", error);
      });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        //clientId="554514820450-je21h5tlk31a62mm1hv1kj8p8vf497si.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-danger btn-md btn-block rounded"
          >
            {" "}
            <i className="fab fa-google pr-2"></i>
            login with google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
