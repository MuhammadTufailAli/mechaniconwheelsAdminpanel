import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import CartProvider from "../../../contextApi";
import "./conversation.css";
import port from "../../Port/Port";
function Conversation({ conversation, currentUser, lastMessage }) {
  const [user, setUser] = useState(null);
  const { cookies, setCookie } = useContext(CartProvider);
  console.log(currentUser);

  const getfriends = (friendId) => {
    axios
      .get(`${port.herokuPort}/users/singleUser/${friendId}`, {
        headers: {
          Authorization: `Bearer ${cookies?.jwt?.token}`,
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

  useEffect(() => {
    var friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);

    getfriends(friendId);
  }, []);

  if (!user) {
    return (
      <div>
        <p>Please wait</p>
      </div>
    );
  } else {
    // const url = "/Backend/public/images/users/" + user?.photo;
    return (
      <div className="conversationContainer">
        <div className="usernameNPhoto">
          <img className="FriendPhoto" src={user.photoUrl} alt="No photo" />
          <p style={{ fontWeight: "bold" }}>
            {user?.firstname} {user?.lastname}
          </p>
        </div>
        <p className="ReceivedMessage">{lastMessage}</p>
      </div>
    );
  }
}

export default Conversation;
