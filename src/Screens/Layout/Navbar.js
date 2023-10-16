import React from "react";
import "../../ScreensCss/NavBar.css";
import { IconContext } from "react-icons";
import { IoMdNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
function Navbar() {
  return (
    <div className="NavbarContainer">
      <div className="Navbar-Elements">
        <div className="NotificationDiv">
          <IoMdNotifications className="Notification" />
        </div>
        <div className="MessengerDiv">
          <BsMessenger className="Messenger" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
