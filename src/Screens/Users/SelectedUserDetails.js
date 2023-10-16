import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../ScreensCss/SelectedUser.css";
import axios from "axios";
import CartProvider from "../../contextApi";
import LeftDrawer from "../Layout/LeftDrawer";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import port from "../Port/Port";
import { ArraySchema, bool } from "yup";

function SelectedUserDetails() {
  const location = useLocation();
  const { user } = location.state;

  const [getProductFromBackend, setProductFromBackend] = useState({});
  console.log(user);

  const [array, setarray] = useState([]);

  const { cookies, setCookie } = useContext(CartProvider);

  const [condition, setcondition] = React.useState(true);
  const [condition2, setcondition2] = React.useState(true);

  const getData = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(`${port.herokuPort}/product/shopOwnerProducts/${user._id}`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((res) => {
        console.log("Data from backend is");
        console.log(res.data.data);
        setProductFromBackend(res.data.data);
        setcondition2(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const getproduct = async () => {
    console.log("User Id", user._id);
    try {
      const result = await axios.get(
        `${port.herokuPort}/ShopOwnerBuyingNotificationRoute/getNotification/${user._id}`
      );
      console.log("I am here");
      console.log(result.data.data);
      setarray(result.data.data);

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert("Error");
    }
  };

  const getcustomerNofitication = async () => {
    console.log("I am here");
    try {
      const result = await axios.get(
        `${port.herokuPort}/CustomerBuyingNotificationRoute/getNotification/${user._id}`
      );
      console.log(result.data.data);
      setarray(result.data.data);

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert("Error");
    }
  };

  const getcustomerMechanic = async () => {
    console.log("I am here");
    try {
      const result = await axios.get(
        `${port.herokuPort}/CustomerMechanicAfterAcceptingNotification/getNotification/${user._id}`
      );
      console.log(result.data.data);

      const FilteredNotification = result.data.data.filter((val) => {
        if (val.status !== "Pending") {
          return val;
        }
      });

      setProductFromBackend(FilteredNotification);
      setcondition2(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert("Error");
    }
  };

  const mechanicNotification = async () => {
    console.log("I am here");
    try {
      const result = await axios.get(
        `${port.herokuPort}/MechanicAfterAcceptingNotification/getNotification/${user._id}`
      );
      console.log(result.data.data);

      const FilteredNotification = result.data.data.filter((val) => {
        if (val.status !== "Pending") {
          return val;
        }
      });

      setProductFromBackend(FilteredNotification);

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert("Error");
    }
  };
  React.useEffect(() => {
    if (user.role === "ShopOwner") {
      getData();
      getproduct();
      console.log("UserEffect Shop Owner Part");
    } else if (user.role === "Customer") {
      console.log("UserEffect Customer Part");
      getcustomerNofitication();
      getcustomerMechanic();
    } else if (user.role === "Mechanic") {
      mechanicNotification();
    }
  }, []);
  if (user.role === "ShopOwner") {
    return (
      <LeftDrawer>
        <div className="topContainerUser">
          <div className="ProfileInfoUser">
            <div className="imageDivUser">
              <img
                alt={user.photoUrl}
                src={user.photoUrl}
                className="UserProfilePhotoUser"
              />
            </div>
            <div className="InformationUser">
              <p style={{ fontWeight: 600, fontSize: 22, marginBottom: 0 }}>
                {user.firstname} {user.lastname}
              </p>
              <p style={{ fontWeight: 600, marginBottom: 0 }}>Personal Info.</p>
              <p style={{ fontSize: 16, marginBottom: 3 }}>{user.role}</p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Address.{" "}
                <span style={{ color: "grey" }}>{user.permanentaddress}</span>
              </p>
              <p
                style={{
                  fontSize: 16,

                  marginBottom: 0,
                }}
              >
                Phone No.{" "}
                <span style={{ color: "grey" }}>0{user.phonenumber}</span>
              </p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                CNIC <span style={{ color: "grey" }}>{user.cnic}</span>
              </p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Email <span style={{ color: "grey" }}>{user.email}</span>
              </p>

              <p style={{ fontWeight: 600, marginBottom: 0, marginTop: 5 }}>
                Shop Info.
              </p>

              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Shop Name <span style={{ color: "grey" }}>{user.shopname}</span>
              </p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Shop Address{" "}
                <span style={{ color: "grey" }}>{user.shopaddress}</span>
              </p>

              <p style={{ fontSize: 16, marginBottom: 10 }}>
                Telephone No.{" "}
                <span style={{ color: "grey" }}>{user.telephonenumber}</span>
              </p>
            </div>
          </div>

          {condition2 ? (
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
            <div className="TotalProductsUser">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Shop Owner Products
              </p>
              <div className="TotalProductsParent">
                {getProductFromBackend.length === 0 ? (
                  <p style={{ fontSize: 20, fontWeight: "600" }}>
                    No Product Found
                  </p>
                ) : (
                  getProductFromBackend.map((product) => {
                    return (
                      <Link
                        to="/AllProducts/SelectedProductDetails"
                        state={{ product: product }}
                        className="boxLowerTextLink"
                        style={{ color: "white" }}
                      >
                        <div className="ProductDesignUser">
                          <img
                            alt={product.imageUrl[0]}
                            src={product.imageUrl[0]}
                            className="ProductPhotoUser"
                          />
                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              marginTop: 10,
                              marginLeft: 5,
                            }}
                          >
                            <p style={{ color: "black", fontWeight: "600" }}>
                              {product.title}
                            </p>
                            <p style={{ marginRight: 10 }}>
                              <span
                                style={{ color: "purple", fontWeight: "600" }}
                              >
                                PKR{" "}
                              </span>
                              {product.price}
                            </p>
                          </p>
                          <p
                            style={{
                              marginLeft: 5,
                              color: "grey",
                              marginBottom: 0,
                            }}
                          >
                            {product.description}
                          </p>
                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,

                              marginLeft: 5,
                            }}
                          >
                            <p style={{ color: "black" }}>
                              <span
                                style={{ color: "purple", fontWeight: "600" }}
                              >
                                Location{" "}
                              </span>
                              {product.place}
                            </p>
                            <p style={{ marginRight: 10 }}>
                              <span
                                style={{ color: "purple", fontWeight: "600" }}
                              >
                                Quantity{" "}
                              </span>
                              {product.quantity}
                            </p>
                          </p>

                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              marginTop: 10,
                              marginLeft: 5,
                            }}
                          >
                            <p style={{ color: "black" }}>
                              <span
                                style={{ color: "purple", fontWeight: "600" }}
                              >
                                Condition{" "}
                              </span>
                              {product.condition}
                            </p>
                            <p style={{ marginRight: 10 }}>
                              <span
                                style={{ color: "purple", fontWeight: "600" }}
                              >
                                Rating{" "}
                              </span>
                              {product.ratingsAverage}({product.ratingQuantity})
                            </p>
                          </p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {condition ? (
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
            <div className="TotalNotifications">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                User Earning Details
              </p>
              <div class="row">
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfoUser">
                    <div
                      style={{
                        backgroundColor: "rgba(246, 247, 249, 255)",
                        borderRadius: 15,
                        height: 110,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p className="boxNumberUser">
                          <CountUp end={user.earning} duration="1" />
                        </p>
                        <p className="boxUpperText">Total Earning</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfoUser">
                    <div className="boxForInfoUpperContainerUser">
                      <div>
                        <p className="boxNumberUser">
                          <CountUp end={array.length} duration="1" />
                        </p>
                        <p className="boxUpperTextUser">Product sold</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfo">
                    <div className="boxForInfoUpperContainer">
                      <div>
                        <p className="boxNumber">
                          <CountUp
                            end={getProductFromBackend.length}
                            duration="1"
                          />
                        </p>
                        <p className="boxUpperText">Total Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,

                  marginLeft: 20,
                }}
              >
                Product Sold History
              </p>
              <div className="TotalProductsParent">
                {array.length === 0 ? (
                  <p style={{ fontSize: 20, fontWeight: "600" }}>
                    No history Found
                  </p>
                ) : (
                  array.map((product) => {
                    return (
                      <div className="ProductDesignUserNotification">
                        <img
                          alt={product.refOfProduct?.imageUrl[0]}
                          src={product.refOfProduct?.imageUrl[0]}
                          className="ProductPhotoUser"
                        />
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black", fontWeight: "600" }}>
                            {product.refOfProduct?.title}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              PAID{" "}
                            </span>
                            {product?.price}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,

                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Buyer{" "}
                            </span>
                            {product.refOfCustomer?.firstname}{" "}
                            {product.refOfCustomer?.lastname}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Bought{" "}
                            </span>
                            {product?.quantity}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Payment Method{" "}
                            </span>
                            {product?.paymentMethod}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Status{" "}
                            </span>
                            {product?.status === "Delivered" ? (
                              <p style={{ color: "green", fontWeight: "600" }}>
                                {product?.status}
                              </p>
                            ) : (
                              <p style={{ color: "yellow", fontWeight: "600" }}>
                                {product?.status}
                              </p>
                            )}
                          </p>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </LeftDrawer>
    );
  } else if (user.role === "Customer") {
    return (
      <LeftDrawer>
        <div className="topContainerUser">
          <div className="ProfileInfoUser">
            <div className="imageDivUser">
              <img
                alt={user.photoUrl}
                src={user.photoUrl}
                className="UserProfilePhotoUser"
              />
            </div>
            <div className="InformationUser">
              <p style={{ fontWeight: 600, fontSize: 22, marginBottom: 0 }}>
                {user.firstname} {user.lastname}
              </p>
              <p style={{ fontWeight: 600, marginBottom: 0 }}>Personal Info.</p>
              <p style={{ fontSize: 16, marginBottom: 3 }}>{user.role}</p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Address.{" "}
                <span style={{ color: "grey" }}>{user.permanentaddress}</span>
              </p>
              <p
                style={{
                  fontSize: 16,

                  marginBottom: 0,
                }}
              >
                Phone No.{" "}
                <span style={{ color: "grey" }}>0{user.phonenumber}</span>
              </p>

              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Email <span style={{ color: "grey" }}>{user.email}</span>
              </p>
            </div>
          </div>

          {condition ? (
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
            <div className="TotalNotifications">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Customer Buying History
              </p>

              <div className="TotalProductsParent">
                {array.length === 0 ? (
                  <p style={{ fontSize: 20, fontWeight: "600" }}>
                    No history Found
                  </p>
                ) : (
                  array.map((product) => {
                    return (
                      <div className="ProductDesignUserNotification">
                        <img
                          alt={product.refOfProduct?.imageUrl[0]}
                          src={product.refOfProduct?.imageUrl[0]}
                          className="ProductPhotoUser"
                        />
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black", fontWeight: "600" }}>
                            {product.refOfProduct?.title}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              PAID{" "}
                            </span>
                            {product?.price}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,

                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Buyer{" "}
                            </span>
                            {product.refOfCustomer?.firstname}{" "}
                            {product.refOfCustomer?.lastname}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Bought{" "}
                            </span>
                            {product?.quantity}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Payment Method{" "}
                            </span>
                            {product?.paymentMethod}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Status{" "}
                            </span>
                            {product?.status === "Delivered" ? (
                              <p style={{ color: "green", fontWeight: "600" }}>
                                {product?.status}
                              </p>
                            ) : (
                              <p style={{ color: "yellow", fontWeight: "600" }}>
                                {product?.status}
                              </p>
                            )}
                          </p>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {condition2 ? (
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
            <div className="TotalProductsUser">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Services Got By Customer
              </p>
              <div className="TotalProductsParent">
                {getProductFromBackend.length === 0 ? (
                  <p style={{ fontSize: 20, fontWeight: "600" }}>
                    No service Found
                  </p>
                ) : (
                  getProductFromBackend.map((product) => {
                    return (
                      <div className="ProductDesignUser">
                        <img
                          alt={product.refOfMechanic?.photoUrl}
                          src={product.refOfMechanic?.photoUrl}
                          className="ProductPhotoUser"
                        />
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black", fontWeight: "600" }}>
                            Name {product?.refOfMechanic?.firstname}{" "}
                            {product?.refOfMechanic?.lastname}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              PAID{" "}
                            </span>
                            {product.price}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,

                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Work{" "}
                            </span>
                            {product.Description}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Status{" "}
                            </span>
                            <span
                              style={{
                                fontWeight: "600",
                                color:
                                  product.status === "Completed"
                                    ? "green"
                                    : "yellow",
                              }}
                            >
                              {product.status}
                            </span>
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Payment Method:{" "}
                            </span>
                            Cash on Delivery
                          </p>
                          {/* <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Rating{" "}
                          </span>
                          {product.ratingsAverage}({product.ratingQuantity})
                        </p> */}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </LeftDrawer>
    );
  } else if (user.role === "Mechanic") {
    return (
      <LeftDrawer>
        <div className="topContainerUser">
          <div className="ProfileInfoUser">
            <div className="imageDivUser">
              <img
                alt={user.photoUrl}
                src={user.photoUrl}
                className="UserProfilePhotoUser"
              />
            </div>
            <div className="InformationUser">
              <p style={{ fontWeight: 600, fontSize: 22, marginBottom: 0 }}>
                {user.firstname} {user.lastname}
              </p>
              <p style={{ fontWeight: 600, marginBottom: 0 }}>Personal Info.</p>
              <p style={{ fontSize: 16, marginBottom: 3 }}>{user.role}</p>
              <p style={{ fontSize: 16, marginBottom: 0 }}>
                Address.{" "}
                <span style={{ color: "grey" }}>{user.permanentaddress}</span>
              </p>
              <p
                style={{
                  fontSize: 16,

                  marginBottom: 0,
                }}
              >
                Phone No.{" "}
                <span style={{ color: "grey" }}>0{user.phonenumber}</span>
              </p>

              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Email <span style={{ color: "grey" }}>{user.email}</span>
              </p>
            </div>
          </div>

          {condition ? (
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
            <div className="TotalProductsUser">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Services Provided By Mechanic
              </p>
              <div className="TotalProductsParent">
                {getProductFromBackend.length === 0 ? (
                  <p style={{ fontSize: 20, fontWeight: "600" }}>
                    No history Found
                  </p>
                ) : (
                  getProductFromBackend.map((product) => {
                    return (
                      <div className="ProductDesignUser">
                        <img
                          alt={product.refOfCustomer?.photoUrl}
                          src={product.refOfCustomer?.photoUrl}
                          className="ProductPhotoUser"
                        />
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black", fontWeight: "600" }}>
                            Name {product?.refOfCustomer?.firstname}{" "}
                            {product?.refOfCustomer?.lastname}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              PAID{" "}
                            </span>
                            {product.price}
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,

                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Work{" "}
                            </span>
                            {product.Description}
                          </p>
                          <p style={{ marginRight: 10 }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Status{" "}
                            </span>
                            <span
                              style={{
                                fontWeight: "600",
                                color:
                                  product.status === "Completed"
                                    ? "green"
                                    : "yellow",
                              }}
                            >
                              {product.status}
                            </span>
                          </p>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 0,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <span
                              style={{ color: "purple", fontWeight: "600" }}
                            >
                              Payment Method:{" "}
                            </span>
                            Cash on Delivery
                          </p>
                          {/* <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Rating{" "}
                          </span>
                          {product.ratingsAverage}({product.ratingQuantity})
                        </p> */}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </LeftDrawer>
    );
  }
}

export default SelectedUserDetails;
