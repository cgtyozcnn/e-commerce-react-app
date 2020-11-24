import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Layout.scss'
const Layout = (props) => {
  return (
    <div>
      <Navbar/>
      <main className="Content">{props.children}</main>
    </div>
  );
};
export default Layout;
