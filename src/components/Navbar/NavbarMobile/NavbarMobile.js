import React, { useState } from "react";
import "./NavbarMobile.scss";
import { NavLink } from "react-router-dom";

import SearchProduct from "../../Products/SearchProduct";
import Cart from "../../Cart/Cart";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import { useSelector } from "react-redux";
const NavbarMobile = (props) => {
  const [clicked, setClicked] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.userId);
  return (
    <nav className="NavbarMobile d-flex flex-column">
      <div className="navbar-mobil-top d-flex justify-content-around align-items-center ">
        <div
          className="nav-mobile-menu-icon d-flex justify-content-around align-items-center"
          onClick={() => setClicked((prevState) => !prevState)}
        >
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <div
          className={`${
            clicked
              ? "nav-mobile-menu-items active-menu"
              : "nav-mobile-menu-items"
          }`}
        >
          {loggedInUser ? (
            <div className="SlidebarContainer">
              <NavLink
                to="/orders"
                className="orders-link"
                onClick={() => setClicked((prevState) => !prevState)}
              >
                <StorageOutlinedIcon fontSize="medium" />
                <p>Orders</p>
              </NavLink>
              <NavLink
                to="/"
                className="orders-link"
                onClick={() => setClicked((prevState) => !prevState)}
              >
                <AccountBoxOutlinedIcon fontSize="medium" />
                <p>User Information</p>
              </NavLink>
              <NavLink
                to="/"
                className="orders-link"
                onClick={() => setClicked((prevState) => !prevState)}
              >
                <SettingsOutlinedIcon fontSize="medium" />
                <p>Settings</p>
              </NavLink>
              <NavLink
                to="/logout"
                className="orders-link"
                onClick={() => setClicked((prevState) => !prevState)}
              >
                <PowerSettingsNewIcon fontSize="medium" />
                <p>Log out</p>
              </NavLink>
            </div>
          ) : (
            <div className="SlidebarContainer">
              <NavLink
                to="/login"
                className="login-info"
                onClick={() => setClicked((prevState) => !prevState)}
              >
                Login/Signup
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="/"
          className="navbar-mobile-logo d-flex justify-content-around align-items-center"
        >
          <img
            src={require("../../../assets/img/shop.png").default}
            alt="Logo"
          />
        </NavLink>
        <div className="navbar-mobile-cart d-flex justify-content-around align-items-center ">
          <Cart />
        </div>

        {/* <NavLink
          to="/"
          className="navbar-mobile-cart d-flex justify-content-around align-items-center "
        >
          <img src={CartSvg} alt="Cart" />
        </NavLink> */}
      </div>
      <div className="navbar-mobil-bottom d-flex justify-content-around align-items-center ">
        <SearchProduct />
      </div>
    </nav>
  );
};
export default NavbarMobile;
