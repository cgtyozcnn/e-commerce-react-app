import React from "react";

import { NavLink } from "react-router-dom";
import Dropdown from "../../UI/Dropdown/Dropdown";
import "./NavbarDesktop.scss";
import SearchProduct from "../../Products/SearchProduct";
import Cart from "../../Cart/Cart";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
const NavbarDesktop = (props) => {
  return (
    <nav className="Navbar d-flex justify-content-around align-items-center ">
      <h2 className="navbar-logo">
        <NavLink
          to="/"
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={require("../../../assets/img/shop.png").default}
            alt="Logo"
          />
          E-Commerce
        </NavLink>
      </h2>
      <SearchProduct />
      <ul className="nav-menu-items">
        <li className="nav-menu-item d-flex">
          <Dropdown element={<AccountCircleOutlinedIcon fontSize="large" />}>
            <div className="ProfilContainer">
              <NavLink to="/orders" className="orders-link">
                <StorageOutlinedIcon fontSize="medium" />
                <p>Orders</p>
              </NavLink>
              <NavLink to="/" className="orders-link">
                <AccountBoxOutlinedIcon fontSize="medium" />
                <p>User Information</p>
              </NavLink>
              <NavLink to="/" className="orders-link">
                <SettingsOutlinedIcon fontSize="medium" />
                <p>Settings</p>
              </NavLink>
            </div>
          </Dropdown>
        </li>
        <li className="nav-menu-item d-flex">
          <Cart />
        </li>
      </ul>
    </nav>
  );
};
export default NavbarDesktop;
