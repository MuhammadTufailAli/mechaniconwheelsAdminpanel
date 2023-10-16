import React, { useContext, useState } from "react";
import "../../ScreensCss/Notification.css";
import CartProvider from "../../contextApi";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SingleNotification from "./SingleNotification/SingleNotification";
import { Space, Table, Tag } from "antd";
import port from "../Port/Port";
import LeftDrawer from "../Layout/LeftDrawer";
import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";
import Loade2 from "../../assets/106038-not-found.json";
import TextField from "@mui/material/TextField";
import axios from "axios";
function NotificationScreen() {
  const { cookies, setCookie } = useContext(CartProvider);
  const [loadingCondition3, setLoadingCondition3] = React.useState(true);
  const [allNotifications, setAllNotifications] = React.useState(true);
  const [allUsersDetails, setAllUsersDetails] = React.useState({});
  const [getUsersFromBackend, setUsersFromBackend] = React.useState({});
  const [notFound, setnotFound] = React.useState(false);

  const getData = () => {
    axios
      .get(
        `${port.herokuPort}/adminNotification/getNotification`,

        {
          headers: {
            Authorization: `Bearer ${cookies?.jwt?.token}`,
          },
        }
      )
      .then((res) => {
        // setProductsFromBackend(res);
        setLoadingCondition3(false);
        console.log(res.data.data.notificationarray);
        setAllUsersDetails(res.data.data.notificationarray);
        setUsersFromBackend(
          res.data.data.notificationarray.map((row) => ({
            Name: row.refOfUser.firstname + " " + row.refOfUser.lastname,
            Email: row.refOfUser.email,
            Role: row.refOfUser.role,
            CnicFront: row.refOfUser.cnicFrontImageUrl,
            CnicBack: row.refOfUser.cnicBackImageUrl,
            user: row,
          }))
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const updateUser = (status, userId, notificationId) => {
    console.log("I am in update user");
    axios
      .patch(
        `${port.herokuPort}/users/updateUser/${userId}`,
        {
          active: status,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.jwt?.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .delete(
        `${port.herokuPort}/adminNotification/deleteNotification/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies?.jwt?.token}`,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "age",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "age",
    },
    {
      title: "Cnic Front",
      dataIndex: "CnicFront",
      render: (url) => <img alt={url} src={url} className="cnicPhoto" />,
    },
    {
      title: "Cnic Back",
      dataIndex: "CnicBack",
      render: (url) => <img alt={url} src={url} className="cnicPhoto" />,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            onClick={() => {
              updateUser("active", record.user.refOfUser._id, record.user._id);
            }}>
            Accept
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              updateUser(
                "inactive",
                record.user.refOfUser._id,
                record.user._id
              );
            }}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const searchUser = (user) => {
    console.log("the User is" + user);

    const filteredData = allUsersDetails.filter(
      (entry) =>
        entry.refOfUser.firstname.toUpperCase().includes(user) ||
        entry.refOfUser.lastname.toUpperCase().includes(user)
    );
    console.log(filteredData.length);
    if (filteredData.length > 0) {
      console.log("I am in lenght");
      setUsersFromBackend(
        filteredData.map((row) => ({
          Name: row.refOfUser.firstname + " " + row.refOfUser.lastname,
          Email: row.refOfUser.email,
          Role: row.refOfUser.role,
          CnicFront: row.refOfUser.cnicFrontImageUrl,
          CnicBack: row.refOfUser.cnicBackImageUrl,
          user: row,
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
  }, []);

  return (
    <LeftDrawer>
      {loadingCondition3 ? (
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
              <p className="UnderHeaderTextAllUsers">Admin Notifications</p>
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
            {allNotifications.lenght === 0 ? (
              <div className="LoaderDiv">
                <div style={{ backgroundColor: "rgba(235, 238, 242, 255)" }}>
                  <Lottie
                    animationData={Loade2}
                    loop={true}
                    style={{ width: 700, height: 700 }}
                  />
                  modalIsOpen{" "}
                  <p style={{ fontSize: 26, fontWeight: 600, marginTop: -100 }}>
                    No User Found with this Name :(
                  </p>
                </div>
              </div>
            ) : (
              <Table columns={columns} dataSource={getUsersFromBackend} />
            )}
          </div>
        </div>
      )}
    </LeftDrawer>
  );
}

export default NotificationScreen;
