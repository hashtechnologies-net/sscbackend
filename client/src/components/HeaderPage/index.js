import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo/swasthyasam.jpg";
import "./header.css";

const index = () => {
  return (
    <>
      <header>
        {/* <!-- Header Start --> */}
        <div className="header-area header-transparrent">
          <div className="main-header header-sticky">
            <div
              className="container-fuild navbar-container"
              style={{ margin: "0 69px" }}
            >
              <div className="row align-items-center">
                {/* <!-- Logo --> */}
                <div className="col-xl-1 col-lg-1 col-md-1">
                  <div className="logo text-center">
                    <NavLink to="/">
                      <img
                        src={logo}
                        alt="swasthya-samriddhi-logo"
                        // className="img-fluid"
                        style={{ height: 64 }}
                      />{" "}
                    </NavLink>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9  col-md-9">
                  {/* <!-- Main-menu --> */}
                  <div
                    className="main-menu d-none d-lg-block n text-center"
                    // style={{ margin: "0 30px" }}
                  >
                    <nav>
                      <ul id="navigation">
                        <li>
                          <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                          <a href="#">About Us</a>
                          <ul className="submenu">
                            <li>
                              <NavLink to="/about/company-profile">
                                Company Profile
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/about/vision-mission">
                                Vision & Mission
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/about/company-status-progress">
                                Company Status/Progress
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/about/swasthay-samridi-in-nepal">
                                Swasthya Samriddhi In Nepal
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <NavLink to="/Features">Features</NavLink>
                        </li>
                        <li>
                          <NavLink to="/team">Team</NavLink>
                        </li>
                        <li>
                          <NavLink to="/road-maps">RoadMap</NavLink>
                        </li>
                        <li>
                          <NavLink to="/our-partner">Partners</NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact">Contact</NavLink>
                        </li>

                        <li>
                          <a href="#">Find Networks</a>
                          <ul className="submenu">
                            <li>
                              <NavLink to="/find-hospitals">
                                Find Hospitals
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/find-labs">Find Labs</NavLink>
                            </li>
                            <li>
                              <NavLink to="/find-pharmacy">
                                Find A Pharmacy
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/find-doctors">Find Doctors</NavLink>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <NavLink
                            to="/sign-in"
                            className="signin-nav signin-nav-mobile"
                          >
                            Login / SignUp
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 signin-nav-button">
                  <NavLink
                    to="/sign-in"
                    style={
                      {
                        // padding: " 10px 18px 10px 18px",
                        // borderRadius: "4px",
                        // background: "rgb(47 148 255)",
                        // color: "rgb(255, 255, 255)",
                        // textAlign: "center",
                      }
                    }
                    className="signin-nav signin-nav-desktop"
                  >
                    Login / SignUp
                  </NavLink>
                </div>
                {/* <!-- Mobile Menu --> */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Header End --> */}
      </header>
    </>
  );
};

export default index;
