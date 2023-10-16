import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import CartProvider from "../../../contextApi";
import port from "../../Port/Port";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function SingleNotification({ userId, notificationId }) {
  const [user, setUser] = useState(null);
  const { cookies, setCookie } = useContext(CartProvider);

  const getfriends = () => {
    axios
      .get(`${port.herokuPort}/users/singleUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.doc);
        setUser(res.data.data.doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (status) => {
    axios
      .patch(
        `${port.herokuPort}/users/updateUser/${userId}`,
        {
          active: status,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt.token}`,
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
            Authorization: `Bearer ${cookies.jwt.token}`,
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

  useEffect(() => {
    getfriends();
  }, []);

  if (!user) {
    return (
      <div>
        <p>Please wait</p>
      </div>
    );
  } else {
    const url = "/Backend/public/images/users/" + user?.photo;
    return (
      <div className="conversationContainer">
        <img className="FriendPhoto" src={user?.photoUrl} alt="No photo" />
        <span style={{ fontWeight: "bold" }}>
          {user?.firstname} {user?.lastname}
        </span>
        <span
          style={{ color: "green" }}
          onClick={() => {
            updateUser("active");
          }}
        >
          <AiOutlineCheck />
        </span>
        <span
          style={{ color: "red" }}
          onClick={() => {
            updateUser("inactive");
          }}
        >
          <AiOutlineClose />
        </span>
      </div>
    );
  }
}

export default SingleNotification;
