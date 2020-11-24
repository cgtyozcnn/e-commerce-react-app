import React, { useState, useEffect } from "react";
import "./Navbar.scss";

import NavbarMobile from "./NavbarMobile/NavbarMobile";
import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const Navbar = (props) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowDimensions.width <= 960) {
    return <NavbarMobile />;
  } else {
    return <NavbarDesktop />;
  }
};
export default Navbar;
