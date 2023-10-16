import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Loade2 from "../../assets/106038-not-found.json";
import port from "../Port/Port";
import "./../../ScreensCss/AllProducts.css";
import LeftDrawer from "../Layout/LeftDrawer";
import { Space, Table, Tag } from "antd";

import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";

import CartProvider from "../../contextApi";

function AllProducts() {
  const { cookies, setCookie } = useContext(CartProvider);
  const [getUsersFromBackend, setUsersFromBackend] = React.useState({});
  const [authCondition, setauthCondition] = React.useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [warning, setWarning] = React.useState("");
  const [userId, setUserId] = React.useState();
  const [ProductId, setProductId] = React.useState();
  const [currentUserName, setCurrentUserName] = React.useState();
  const [allUsersDetails, setAllUsersDetails] = React.useState({});
  const [notFound, setnotFound] = React.useState(false);

  const columns = [
    {
      title: "Photo",
      dataIndex: "ImageUrl", // this is the value that is parsed from the DB / server side
      render: (url) => <img alt={url} src={url} className="Photo" />,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "age",
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "age",
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "age",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <Button variant="contained" style={{ marginRight: "8px" }}>
            <Link
              to="/AllProducts/SelectedProductDetails"
              state={{ product: record.user }}
              className="boxLowerTextLink"
              style={{ color: "white" }}
            >
              View
            </Link>
          </Button>
          {/* <Button
            variant="contained"
            style={{
              backgroundColor: "#FFCC00",
            }}
            onClick={() => {
              // setUserId(data._id);

              setIsOpen(true);
            }}
          >
            Warning
          </Button> */}
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              let text = "Do you really want to delete a User.";
              if (window.confirm(text) === true) {
                axios
                  .delete(
                    `${port.herokuPort}/product/deleteProduct/${record.user._id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${cookies.jwt.token}`,
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
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  //   console.log(users);
  console.log(getUsersFromBackend);

  const getData = () => {
    axios
      .get(`${port.herokuPort}/product/allProduct`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt.token}`,
        },
      })
      .then((res) => {
        console.log("all products are");
        console.log(res.data.data.doc);
        setAllUsersDetails(res.data.data.doc);
        setUsersFromBackend(
          res.data.data.doc.map((row) => ({
            Name: row.title,
            Rating: row.ratingsAverage,
            Price: row.price,
            ImageUrl: row.imageUrl[0],
            Location: row.place,
            user: row,
          }))
        );
        console.log(res.data.user.firstname + " " + res.data.user.lastname);
        setCurrentUserName(
          res.data.user.firstname + " " + res.data.user.lastname
        );
      })
      .catch((err) => {
        setauthCondition(false);
        console.log(err.response.data.message);
      });
  };

  const searchUser = (user) => {
    console.log("the User is" + user);

    const filteredData = allUsersDetails.filter((entry) =>
      entry.title.toUpperCase().includes(user)
    );
    console.log(filteredData.length);
    if (filteredData.length > 0) {
      console.log("I am in lenght");
      setUsersFromBackend(
        filteredData.map((row) => ({
          Name: row.title,
          Rating: row.ratingsAverage,
          Price: row.price,
          ImageUrl: row.imageUrl[0],
          Location: row.place,
          user: row,
        }))
      );
      setnotFound(false);
    } else if (filteredData.length === 0) {
      setnotFound(true);
    }
    console.log(getUsersFromBackend);
  };

  const sendWarning = () => {
    axios
      .post(
        `${port.herokuPort}/userNotification/postNotification`,
        {
          refOfUser: userId,
          refOfProduct: ProductId,
          warning: warning,
          warningFrom: currentUserName,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt.token}`,
          },
        }
      )
      .then((res) => {
        alert("Warning send to Product Owner");

        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      backgroundColor: "grey",
      borderRadius: "25px",
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning(event.target.value);
    console.log(event.target.value);
  };

  React.useEffect(() => {
    getData();
    console.log("Hello");
  }, [modalIsOpen]);

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
            width: "100%",
            display: "flex",
            backgroundColor: "rgba(235, 238, 242, 255)",
          }}
        >
          <div
            className="RightSide"
            style={{ width: "80%", marginLeft: "10%" }}
          >
            <div>
              <p className="UnderHeaderText">Total Products</p>
            </div>
            <div
              style={{
                display: "flex",

                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <div style={{ width: 220 }}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="Search by Product Name"
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
                  <p style={{ fontSize: 26, fontWeight: 600, marginTop: -100 }}>
                    No Product Found with this Name :(
                  </p>
                </div>
              </div>
            ) : (
              <Table columns={columns} dataSource={getUsersFromBackend} />
            )}

            {/* <div
              class="row"
              style={{
                marginLeft: "90px",
                marginTop: "30px",
                marginBottom: "-10px",
              }}
            >
              <div style={{ padding: "0px" }} class=" col-sm-3">
                <p>#</p>
              </div>
              <div style={{ padding: "0px" }} class=" col-sm-3">
                <p>Product Name</p>
              </div>
              <div style={{ padding: "0px" }} class=" col-sm-3">
                <p>Rating</p>
              </div>
              <div
                style={{ padding: "0px" }}
                class="col-xl-3 col-md-3 col-sm-3"
              >
                <p>Action</p>
              </div>
            </div>
            <hr style={{ marginLeft: "20px", marginRight: "20px" }} /> */}

            {/* {getUsersFromBackend.map((data, index) => {
              const url = "/Backend/public/images/products/" + data.imageCover;
              console.log(data.imageCover);

              return (
                <div
                  class="row"
                  style={{
                    marginLeft: "90px",
                    marginBottom: "20px",
                    width: "90%",

                    borderBottom: "0.2px solid #D3D3D3",
                  }}
                >
                  <div
                    style={{ padding: "0px" }}
                    class="col-xl-3 col-md-3 col-sm-3"
                  >
                    <p
                      className="DivOfListContent"
                      style={{ marginTop: "20px" }}
                    >
                      {index + 1}
                    </p>
                  </div>
                  <div
                    style={{ padding: "0px" }}
                    class="col-xl-3 col-md-3 col-sm-3"
                  >
                    <p
                      className="DivOfListContent"
                      style={{ marginLeft: "-50px" }}
                    >
                      <img
                        className="Photo"
                        src={data.imageUrl[0]}
                        alt="No photo"
                      />
                      <span className="DivOfListContentText">{data.title}</span>
                    </p>
                  </div>
                  <div
                    style={{ padding: "0px" }}
                    class="col-xl-3 col-md-3 col-sm-3"
                  >
                    <p
                      className="DivOfListContentRole"
                      style={{ marginTop: "20px" }}
                    >
                      {data.ratingsAverage}
                    </p>
                  </div>
                  <div
                    style={{ padding: "0px" }}
                    class="col-xl-3 col-md-3 col-sm-3"
                  >
                    <p
                      className="DivOfListContentView"
                      style={{ marginTop: "15px" }}
                    >
                      <Button
                        variant="contained"
                        style={{ marginRight: "8px" }}
                      >
                        <Link
                          to="/AllProducts/SelectedProductDetails"
                          state={{ product: data }}
                          className="boxLowerTextLink"
                          style={{ color: "white" }}
                        >
                          View
                        </Link>
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          let text = "Do you really want to delete a User.";
                          if (window.confirm(text) == true) {
                            axios
                              .delete(
                                `${port.herokuPort}/product/deleteProduct/${data._id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${cookies.jwt.token}`,
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
                        }}
                      >
                        Delete
                      </Button>
                      <br />

                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#FFCC00",
                          marginLeft: "22px",
                          marginTop: "10px",
                        }}
                        onClick={() => {
                          setUserId(data.refOfUser);
                          setProductId(data._id);
                          setIsOpen(true);
                        }}
                      >
                        Warning
                      </Button>
                    </p>
                  </div>
                  <Modal isOpen={modalIsOpen} style={customStyles}>
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
                      <h4 style={{ color: "white" }}>Write Warning here</h4>
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
                      }}
                    >
                      Send
                    </Button>
                  </Modal>
                </div>
              );
            })} */}
          </div>
        </div>
      )}
    </LeftDrawer>
  );
}

export default AllProducts;
