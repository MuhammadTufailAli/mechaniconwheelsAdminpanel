import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import LeftDrawer from "../Layout/LeftDrawer";
import Carousel from "better-react-carousel";
import Rating from "@mui/material/Rating";
import axios from "axios";
import "../../ScreensCss/SelectedProduct.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
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
import StarIcon from "@mui/icons-material/Star";
import port from "../Port/Port";
import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";

import CartProvider from "../../contextApi";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51LcNiZDfjQDKNGNJCnxuhFqlQVq3RMTmc7PF1VyckZc1NvxHaNvNiiaQYizidxp3f0zUd8XCshH5GqZsRZXX0zaX00qzWx0ciu";

// var stripe = await stripeTestPromise;
const stripe = window.Stripe(PUBLIC_KEY);

function SelectedVehicle() {
  const { cookies, setCookie } = useContext(CartProvider);
  const location = useLocation();
  const { product } = location.state;
  const url = "/Backend/public/images/products/" + product.imageCover;

  console.log("THeee Product is");
  console.log(product);

  const [getReview, setReview] = React.useState({});
  const [condition, setcondition] = React.useState(true);

  return (
    <LeftDrawer>
      <div className="topContainer">
        <div>
          <p className="UnderHeaderText">Total Vehicle / Selected Vehicle</p>
        </div>
        <div className="ProfileInfo2">
          <div className="imageDiv">
            {/* <img
              width="100%"
              height="500px"
              src={image}
              className="UserProfilePhoto"
            /> */}
          </div>
          <div className="Information">
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
                {product.Name}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>PKR </span>
                {product.Price}
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
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Location{" "}
                </span>
                {product.City}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Color{" "}
                </span>
                {product.Color}
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
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Mileage{" "}
                </span>
                {product.Mileage}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Engine Type{" "}
                </span>
                {product.Engine_Type}
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
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Transmission{" "}
                </span>
                {product?.Transmission}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Assembly{" "}
                </span>
                {product?.Assembly}
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
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Capacity{" "}
                </span>
                {product?.Capacity}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Body Type{" "}
                </span>
                {product?.Body_Type}
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
                <span style={{ color: "purple", fontWeight: "600" }}>
                  Owner{" "}
                </span>
                {product?.Username}
              </p>
              <p style={{ marginRight: 10 }}>
                <span style={{ color: "purple", fontWeight: "600" }}>
                  User Contact{" "}
                </span>
                {product?.User_Contact}
              </p>
            </p>
          </div>
        </div>
      </div>
    </LeftDrawer>
  );
  // }
}

export default SelectedVehicle;
