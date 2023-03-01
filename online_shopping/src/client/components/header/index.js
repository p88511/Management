import { ajaxConfigHelper } from "../../helper";
import { PANEL_STATUS } from "../constants";
import ShoppingCart from "./shoppingCart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiFillYoutube } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";

import { Button } from "antd";

import "./index.css";

export default function Header({
  user,
  setUser,
  panelStatus,
  setVisible,
  setPanelStatus,
  cart,
  setCart,
  products,
  setIsMerged,
}) {
  const signInHandler = () => {
    setVisible((prevState) => !prevState);
    setPanelStatus(PANEL_STATUS.SIGN_IN);
  };

  const signOutHandler = async () => {
    const response = await fetch(
      "/customerSignOut",
      ajaxConfigHelper(
        {
          user: user,
        },
        "PUT",
        window.localStorage.getItem("token")
      )
    );
    const { message, status } = await response.json();
    console.log(message);

    if (status === "200") {
      alert(` ${message}`);
      window.localStorage.removeItem("token");
      setUser(null);
      setPanelStatus(PANEL_STATUS.SIGN_IN);
      setCart(null);
      setIsMerged(false);
    }
  };
  return (
    <>
      <Navbar className="navbar-dark " fixed="top" expand="lg">
        <Container>
          {user && user.isAdmin ? (
            <Navbar.Brand
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => setPanelStatus(PANEL_STATUS.MAIN_PAGE)}
            >
              Adminmanagement
              <Navbar.Brand className="brand">Chuwa</Navbar.Brand>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => setPanelStatus(PANEL_STATUS.MAIN_PAGE)}
            >
              Management
              <Navbar.Brand className="brand">Chuwa</Navbar.Brand>
            </Navbar.Brand>
          )}
          {/* <Navbar.Brand>
            <button
              className="brand-btn"
              onClick={() => setPanelStatus(PANEL_STATUS.MAIN_PAGE)}
            >
              Managementchuwa
            </button>
          </Navbar.Brand> */}
          <Navbar.Brand>
            <input
              className="searchBox"
              type="text"
              placeholder="Search"
            ></input>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <button
                  className="header-sigin"
                  onClick={() => {
                    if (
                      panelStatus === PANEL_STATUS.SIGN_IN ||
                      panelStatus === PANEL_STATUS.SIGN_UP ||
                      panelStatus === PANEL_STATUS.UPDATE_PASSWORD ||
                      panelStatus === PANEL_STATUS.LINK_SENT ||
                      !user
                    ) {
                      signInHandler();
                    } else {
                      signOutHandler();
                    }
                  }}
                >
                  {panelStatus === PANEL_STATUS.SIGN_IN ||
                  panelStatus === PANEL_STATUS.SIGN_UP ||
                  panelStatus === PANEL_STATUS.UPDATE_PASSWORD ||
                  panelStatus === PANEL_STATUS.LINK_SENT ||
                  user === null
                    ? "Sign In"
                    : "Sign Out"}
                </button>
              </Nav.Link>
              <Nav.Link>
                <ShoppingCart
                  user={user}
                  cart={cart}
                  setCart={setCart}
                  products={products}
                ></ShoppingCart>
              </Nav.Link>
              {user && user.isAdmin ? (
                <NavDropdown id="basic-nav-dropdown">
                  <NavDropdown.Item
                    style={{ height: "35px" }}
                    className="drop-item"
                  >
                    <button
                      className="create-product"
                      style={{
                        // borderRadius: "4px",
                        // backgroundColor: "#5048E5",
                        color: "black",
                        fontWeight: "bold",
                        // marginTop: "80px",
                      }}
                      onClick={() =>
                        setPanelStatus(PANEL_STATUS.CREATE_PRODUCT)
                      }
                    >
                      Create product
                    </button>

                    {/* {user && user.isAdmin ? (
                  <button
                    className="create-product"
                    style={{
                      // borderRadius: "4px",
                      // backgroundColor: "#5048E5",
                      color: "black",
                      fontWeight: "bold",
                      // marginTop: "80px",
                    }}
                    onClick={() => setPanelStatus(PANEL_STATUS.CREATE_PRODUCT)}
                  >
                    Create product
                  </button>
                ) : (
                  <></>
                )} */}
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className="footer" fixed="bottom">
        <Nav className="footer-container">
          <div className="copy-right">@2023 All Rights Reserves</div>
          <div className="icon-group ">
            <BsInstagram className="insta-icon" />
            <AiFillYoutube className="yt-icon" />
            <AiOutlineTwitter className="twi-con" />
          </div>
          <div className="contact-group">
            <div className="contact">Contact</div>
            <div className="privacy">Privacy Policles</div>
            <div className="help">Help</div>
          </div>
        </Nav>
      </Navbar>
    </>
  );
  // return (
  //   <div className="header-wrapper">
  //     <ShoppingCart
  //       user={user}
  //       cart={cart}
  //       setCart={setCart}
  //       products={products}
  //     ></ShoppingCart>
  //     <Button
  //       className="header-sigin"
  //       onClick={() => {
  //         if (
  //           panelStatus === PANEL_STATUS.SIGN_IN ||
  //           panelStatus === PANEL_STATUS.SIGN_UP ||
  //           panelStatus === PANEL_STATUS.UPDATE_PASSWORD ||
  //           panelStatus === PANEL_STATUS.LINK_SENT ||
  //           !user
  //         ) {
  //           signInHandler();
  //         } else {
  //           signOutHandler();
  //         }
  //       }}
  //     >
  //       {panelStatus === PANEL_STATUS.SIGN_IN ||
  //       panelStatus === PANEL_STATUS.SIGN_UP ||
  //       panelStatus === PANEL_STATUS.UPDATE_PASSWORD ||
  //       panelStatus === PANEL_STATUS.LINK_SENT ||
  //       user === null
  //         ? "Sign In"
  //         : "Sign Out"}
  //     </Button>
  //     <Button onClick={() => setPanelStatus(PANEL_STATUS.MAIN_PAGE)}>
  //       Main Page
  //     </Button>
  //     <input className="searchBox" type="text" placeholder="Search"></input>
  //   </div>
  // );
}
