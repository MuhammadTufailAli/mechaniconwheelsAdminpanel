import React, { useContext, useState, useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./../../ScreensCss/AllUsers.css";
import port from "../Port/Port";
import LeftDrawer from "../Layout/LeftDrawer";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";
import Loade2 from "../../assets/106038-not-found.json";
import { Space, Table, Tag } from "antd";

import CartProvider from "../../contextApi";
import { ConstructionOutlined } from "@mui/icons-material";

function AllUsers() {
  const { cookies, setCookie } = useContext(CartProvider);
  const [getUsersFromBackend, setUsersFromBackend] = React.useState({});
  const [allUsersDetails, setAllUsersDetails] = React.useState({});
  const [authCondition, setauthCondition] = React.useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [warning, setWarning] = React.useState("");
  const [userId, setUserId] = React.useState();
  const [open3Dot, setOpen3Dot] = React.useState(false);
  const [notFound, setnotFound] = React.useState(false);
  const [userStatus, setuserStatus] = React.useState();
  const [emailtoshowmenu, setEmailtoshowmenu] = React.useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [currentUserName, setCurrentUserName] = React.useState();
  console.log(cookies);

  //If someone click outside so 3 dot menu will be closed
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen3Dot(false);
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

  //Update user status
  const updatestatus = async (userId, userstatus) => {
    console.log("I am update part", userstatus);

    const status = {
      active: userstatus,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/users/updateUser/${userId}`,
        status
      );

      window.location.reload(false);
      console.log(result.data.data);
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  React.useEffect(() => {
    getData();
    console.log("Hello");
  }, [modalIsOpen]);

  const columns = [
    {
      title: "Photo",
      width: 100,
      dataIndex: "ImageUrl", // this is the value that is parsed from the DB / server side
      render: (url) => <img alt={url} src={url} className="UsersPhoto" />,
    },
    {
      title: "Name",
      dataIndex: "Name",
      width: 100,
      key: "name",
      render: (text) => <a>{text.toUpperCase()}</a>,
    },
    {
      title: "Role",
      width: 100,
      dataIndex: "Role",
      key: "age",
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "Status",
      key: "tag",
      render: (status) => {
        if (status === "active") {
          var color = "green";
        } else if (status === "inactive") {
          color = "red";
        } else {
          color = "yellow";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Actions",
      key: "Actions",
      width: 100,
      render: (email, record) => {
        return (
          <Space size="large">
            <Button variant="contained">
              <Link
                to="/AllUsers/SelectedUserDetails"
                state={{ user: record.user }}
                className="boxLowerTextLink"
                style={{ color: "white", textDecoration: "none" }}>
                View
              </Link>
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#FFCC00",
              }}
              onClick={() => {
                console.log("Warning is licked");
                setUserId(record.user._id);

                setIsOpen(true);
              }}>
              Warning
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                let text = "Do you really want to delete a User.";
                if (window.confirm(text) == true) {
                  axios
                    .delete(
                      `${port.herokuPort}/users/deleteUser/${record.user._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${cookies?.jwt?.token}`,
                        },
                      }
                    )
                    .then((res) => {
                      alert("Deleted Successfully");
                      window.location.reload(false);
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err.response.data.message);
                    });
                }
              }}>
              Delete
            </Button>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <BsThreeDotsVertical
                size={20}
                onClick={() => {
                  setEmailtoshowmenu(email.user.email);
                  setOpen3Dot(true);
                }}
              />
              {emailtoshowmenu === email.user.email ? (
                open3Dot ? (
                  <div className="DropDown3Dot" ref={wrapperRef}>
                    <ul>
                      <li
                        onClick={() => {
                          if (email.user.active === "inactive") {
                            alert("User account is already Deactivated");
                          } else {
                            updatestatus(email.user._id, "inactive");
                          }
                        }}>
                        Deactivate
                      </li>

                      <li
                        onClick={() => {
                          if (email.user.active === "active") {
                            alert("User account is already Active");
                          } else {
                            updatestatus(email.user._id, "active");
                          }
                        }}>
                        Activate
                      </li>
                    </ul>
                  </div>
                ) : null
              ) : null}
            </div>
          </Space>
        );
      },
    },
  ];

  const getData = () => {
    axios
      .get(`${port.herokuPort}/users/allUsers`, {
        headers: {
          Authorization: `Bearer ${cookies?.jwt?.token}`,
        },
      })
      .then((res) => {
        var filterarray = res.data.data.doc.filter(
          (row) => row.role !== "admin"
        );
        setAllUsersDetails(filterarray);

        setUsersFromBackend(
          filterarray.map((row) => ({
            Name: row.firstname + " " + row.lastname,
            Role: row.role,
            Email: row.email,
            Status: row.active,
            ImageUrl: row.photoUrl,
            user: row,
            Actions: row.email,
          }))
        );
        setCurrentUserName(
          res.data.user.firstname + " " + res.data.user.lastname
        );
        console.log(res.data.data);
      })
      .catch((err) => {
        setauthCondition(false);
        console.log(err.response.data.message);
      });
  };

  const sendWarning = () => {
    axios
      .post(
        `${port.herokuPort}/userNotification/postNotification`,
        {
          refOfUser: userId,
          adminName:
            cookies?.jwt?.data?.user?.firstname +
            " " +
            cookies?.jwt?.data?.user?.lastname,

          warning: warning,
          adminPhotoUrl: cookies?.jwt?.data?.user?.photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.jwt?.token}`,
          },
        }
      )
      .then((res) => {
        alert("Warning send to User");

        console.log(getUsersFromBackend);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning(event.target.value);
    console.log(event.target.value);
  };

  const searchUser = (user) => {
    console.log("the User is" + user);

    const filteredData = allUsersDetails.filter(
      (entry) =>
        entry.firstname.toUpperCase().includes(user) ||
        entry.lastname.toUpperCase().includes(user)
    );
    console.log(filteredData.length);
    if (filteredData.length > 0) {
      console.log("I am in lenght");
      setUsersFromBackend(
        filteredData.map((row) => ({
          Name: row.firstname + " " + row.lastname,
          Role: row.role,
          Email: row.email,
          Status: row.active,
          ImageUrl: row.photoUrl,
          user: row,
          Actions: row.email,
        }))
      );
      setnotFound(false);
    } else if (filteredData.length === 0) {
      setnotFound(true);
    }
    console.log(getUsersFromBackend);
  };

  React.useEffect(() => {
    getData();
    console.log("Hello");
  }, []);
  if (authCondition) {
    return (
      <LeftDrawer>
        {Object.keys(getUsersFromBackend).length === 0 ? (
          <div className="LoaderDiv">
            <div style={{ backgroundColor: "rgba(235, 238, 242, 255)" }}>
              <Lottie
                animationData={Loader}
                loop={true}
                style={{ width: 900, height: 900 }}
              />
              <p style={{ fontSize: 26, fontWeight: 600, marginTop: -100 }}>
                Loading.....
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(235, 238, 242, 255)",
            }}>
            <div style={{ width: "80%", marginLeft: "10%" }}>
              <div>
                <p className="UnderHeaderTextAllUsers">Total Users</p>
              </div>
              <div
                style={{
                  display: "flex",

                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}>
                <div style={{ width: 200 }}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search by Name"
                    onInput={(e) => {
                      searchUser(e.target.value.toUpperCase());
                    }}
                  />
                </div>
              </div>
              {notFound ? (
                <div className="LoaderDiv">
                  <div style={{ backgroundColor: "rgba(235, 238, 242, 255)" }}>
                    <Lottie
                      animationData={Loade2}
                      loop={true}
                      style={{ width: 700, height: 700 }}
                    />
                    modalIsOpen{" "}
                    <p
                      style={{
                        fontSize: 26,
                        fontWeight: 600,
                        marginTop: -100,
                      }}>
                      No User Found with this Name :(
                    </p>
                  </div>
                </div>
              ) : (
                <Table columns={columns} dataSource={getUsersFromBackend} />
              )}

              {/* Model */}
              <Modal isOpen={modalIsOpen} className="Modal">
                <div className="ModelDiv">
                  <div>
                    <AiFillCloseCircle
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      style={{
                        color: "red",
                        fontSize: "27px",
                        marginLeft: "346px",
                        marginTop: "-31px",
                      }}
                    />
                    <h4 style={{ color: "white" }}>Write Warning</h4>
                    <TextField
                      id="outlined-multiline-static"
                      label="Warning"
                      multiline
                      rows={4}
                      placeholder="Warning"
                      onChange={handleChange}
                      style={{ width: "350px" }}
                      inputProps={{ style: { color: "white" } }}
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{
                      marginTop: "8px",
                      marginLeft: "280px",
                    }}
                    onClick={() => {
                      sendWarning();
                    }}>
                    Send
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </LeftDrawer>
    );
  } else {
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    );
  }
}

export default AllUsers;
