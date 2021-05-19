import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listProducts } from "../redux/actions/productActions";
import Product from "../components/Product";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
import { Row, Col } from "react-bootstrap";
import Carrousel from "../components/HomePageCarrousel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";

const Homescreen = () => {
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [main, setMain] = useState("");

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getWeather = () => {
    const getIP = "http://ip-api.com/json/";
    axios.get(getIP).then(function (location) {
      const { data } = location;
      const { lat } = data;
      const { lon } = data;

      axios
        .get(
          `${process.env.REACT_APP_WEATHER_URL}lat=${lat}&lon=${lon}&APPID=${process.env.REACT_APP_WEATHER_APPID}`
        )
        .then((response) => {
          const { data } = response;
          const { icon } = data.weather[0];

          setLocation(data);
          setWeather(icon);
          setMain(data.main);
        });
    });
  };

  useEffect(() => {
    dispatch(listProducts());
    getWeather();
  }, [dispatch]);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const { temp } = main;
  const fix = temp !== undefined ? temp.toFixed(1) : null;

  return (
    <>
      {!location.name ? (
        <Spinners />
      ) : (
        <div>
          <div id="demo"></div>
          <h6 style={{ margin: "0 0 0 15px" }}>{location.name}</h6>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`http://openweathermap.org/img/w/${weather}.png`}
              alt="weather"
            />
            <p style={{ marginBottom: "0px" }}>{fix}&#176;C</p>
          </div>
        </div>
      )}

      <Carrousel />

      <h1>Candles Made With Passion</h1>
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification variant="danger">{error}</Notification>
      ) : (
        <Row className="homepageCategories">
          {products
            .filter((prod) => prod.cat)
            .sort(function (a, b) {
              return a.cat - b.cat;
            })
            .map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
      <Row className="text-center">
        <Col sm={12} md={6} lg={12}>
          {" "}
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Find out more"
          />
          <div>
            <Fade in={checked}>
              <div>
                Did you know that all of our candles Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum. Why do
                we use it? It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like).
              </div>
            </Fade>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Homescreen;
