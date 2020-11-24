import React from "react";
import './Dropdown.scss'
const Dropdown = (props) => {
  return (
    <div className="Dropdown">
      {props.element && props.element}
      <div className="DropdownContainer">{props.children}</div>
    </div>
  );
};

export default Dropdown;
