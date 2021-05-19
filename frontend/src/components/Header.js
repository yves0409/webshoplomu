import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Logo from "../bgim/logoNewWhite.png";
import { MdInfoOutline, MdPersonOutline } from "react-icons/md";
import { makeStyles } from "@material-ui/styles";
import { IconContext } from "react-icons";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

const useStyles = makeStyles({
  root: {
    fontSize: "12px",
    color: "grey",
    marginleft: "0px",
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 1,
    top: 1,
    color: "white",
    backgroundColor: "red",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Header = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={Logo} alt="" height="70px" width="70px" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* About */}
              <IconContext.Provider
                value={{ style: { fontSize: "16px", marginTop: "11px" } }}
              >
                <MdInfoOutline />
              </IconContext.Provider>
              <NavDropdown title="About">
                {/* <LinkContainer to="/contact"> */}
                <LinkContainer to="/contacts">
                  <NavDropdown.Item>About</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/contacts">
                  <NavDropdown.Item>Contact</NavDropdown.Item>
                </LinkContainer>
                {/* <LinkContainer to="/contact/.#faq"> */}
                <LinkContainer to="/contacts">
                  <NavDropdown.Item>FAQ</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {/* User */}
              {userInfo ? (
                <>
                  <IconContext.Provider
                    value={{ style: { fontSize: "16px", marginTop: "11px" } }}
                  >
                    <MdPersonOutline />
                  </IconContext.Provider>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> Sign in</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <SupervisorAccountIcon className="mt-1" />
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
              {/* Cart */}

              <LinkContainer to="/cart">
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={cartItems.length}
                    className={classes.root}
                  >
                    <ShoppingCartIcon style={{ fontSize: "20px" }} />
                  </StyledBadge>
                </IconButton>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
