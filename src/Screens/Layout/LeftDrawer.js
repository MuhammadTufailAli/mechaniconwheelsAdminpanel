//It is our layout or parent
import React, { useContext, useState, useRef, useEffect } from "react";
import "./../../ScreensCss/LeftDrawer.css";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { AiOutlineCaretRight } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import port from "../Port/Port";
import {
  AiFillDashboard,
  AiOutlineUser,
  AiFillShopping,
  AiFillCaretRight,
  AiFillCar,
} from "react-icons/ai";

import { BsGraphUp } from "react-icons/bs";

import CartProvider from "../../contextApi";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <AiFillDashboard style={{ fontSize: "25px" }} />,
  },
  {
    path: "/AllUsers",
    name: "Users",
    icon: <AiOutlineUser style={{ fontSize: "25px" }} />,
  },
  {
    path: "/AllProducts",
    name: "Products",
    icon: <AiFillShopping style={{ fontSize: "25px" }} />,
  },
  {
    path: "/AllVehicle",
    name: "Vehicles",
    icon: <AiFillCar style={{ fontSize: "25px" }} />,
  },
];

export default function LeftDrawer(props) {
  const theme = useTheme();
  const { cookies, setCookie, userdetails } = useContext(CartProvider);

  const [open, setOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfileMenuOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <div className="LayoutTopConyainer">
      <div
        style={{
          width: open ? "15%" : "5%",
          // maxWidth: open ? 250 : 45,
          // minWidth: open ? 240 : 40,
          position: "fixed",
          height: "100%",
          backgroundColor: "white",
          transitionDuration: "500ms",
        }}>
        <div className={open ? "SidebarheaderOpen" : "SidebarheaderClosed"}>
          <span
            className={open ? "headerOpen" : "headerClosed"}
            onClick={() => {
              handleDrawerClose();
            }}>
            {open ? (
              <AiOutlineCaretLeft size={25} />
            ) : (
              <AiOutlineCaretRight size={25} />
            )}
          </span>
        </div>
        <hr />
        <div className={open ? "SidebarcontentOpen" : "SidebarcontentClosed"}>
          {routes.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}>
                    <div style={{ alignSelf: "center", marginRight: 7 }}>
                      {route.icon}
                    </div>

                    <ListItemText
                      primary={route.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div
        style={{
          width: open ? "85%" : "95%",
          position: "relative",
          left: open ? "15%" : "5%",

          transitionDuration: "500ms",
        }}>
        <div className="Navbar">
          <div className="Navbar-Elements">
            <div className="NotificationDiv">
              <Link to="/Notification">
                <IoMdNotifications className="Notification" />
              </Link>
            </div>
            <div className="MessengerDiv">
              <Link to="/Messenger">
                <BsMessenger className="Messenger" />
              </Link>
            </div>

            <div
              className="ProfileDiv"
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
              }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  className="adminPhoto"
                  src={cookies?.jwt?.data?.user?.photoUrl}
                  alt="No photo"
                />
                <div>
                  <p
                    style={{
                      marginLeft: 10,
                      fontWeight: "bold",
                      color: "white",
                    }}>
                    {cookies?.jwt?.data?.user?.firstname}{" "}
                    {cookies?.jwt?.data?.user?.lastname}
                  </p>
                  <p
                    style={{
                      marginTop: -20,
                      marginLeft: 10,
                      color: "	#F5F5F5",
                    }}>
                    {cookies?.jwt?.data?.user?.email}
                  </p>
                </div>
              </div>
              {profileMenuOpen ? (
                <div className="DropDown" ref={wrapperRef}>
                  <ul>
                    <Link to="/AllProducts" className="DropDownLink">
                      <li>Profile</li>
                    </Link>
                    <Link to="/AllProducts" className="DropDownLink">
                      <li>Settings</li>
                    </Link>
                    <Link to="/AllProducts" className="DropDownLink">
                      <li>Sign Out</li>
                    </Link>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
    // <div className="LayoutTopContainer">
    //   <div className={open ? "OpenLeftSide" : "ClosedLeftSide"}>
    //     <CssBaseline />

    //     <Drawer variant="permanent">
    //       <DrawerHeader>
    //         <IconButton onClick={handleDrawerClose}>
    //           {theme.direction === "rtl" ? (
    //             <MenuIcon />
    //           ) : (
    //             <MenuIcon style={{ marginRight: 8 }} />
    //           )}
    //         </IconButton>
    //       </DrawerHeader>
    //       <Divider />
    //       <List className="DrawerIcons">
    //         {routes.map((route, index) => {
    //           return (
    //             <NavLink
    //               to={route.path}
    //               key={index}
    //               className="link"
    //               activeClassName="active"
    //             >
    //               <ListItem disablePadding sx={{ display: "block" }}>
    //                 <ListItemButton
    //                   sx={{
    //                     minHeight: 48,
    //                     justifyContent: open ? "initial" : "center",
    //                     px: 2.5,
    //                   }}
    //                 >
    //                   <div style={{ alignSelf: "center", marginRight: 7 }}>
    //                     {route.icon}
    //                   </div>

    //                   <ListItemText
    //                     primary={route.name}
    //                     sx={{ opacity: open ? 1 : 0 }}
    //                   />
    //                 </ListItemButton>
    //               </ListItem>
    //             </NavLink>
    //           );
    //         })}
    //       </List>
    //       <Divider />
    //     </Drawer>
    //   </div>
    //   <div className={open ? "OpenRightSide" : "ClosedRightSide"}>
    //     <div>
    //       <div className="Navbar-Elements">
    //         <div className="NotificationDiv">
    //           <IoMdNotifications className="Notification" />
    //         </div>
    //         <div className="MessengerDiv">
    //           <BsMessenger className="Messenger" />
    //         </div>
    //       </div>
    //     </div>

    //     {props.children}
    //   </div>
    // </div>
  );
}
