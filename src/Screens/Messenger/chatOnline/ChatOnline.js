import React, { useContext, useState, useEffect } from "react";
import "./chatOnline.css";
import CartProvider from "../../../contextApi";
import port from "../../Port/Port";
import axios from "axios";

function ChatOnline({ onlineUsers, curentId, setcurrentChat }) {
  const { cookies, setCookie } = useContext(CartProvider);
  const [allUsers, setAllusers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [cond, setCond] = useState(true);

  const getData = () => {
    axios
      .get(`${port.herokuPort}/users/allUsers`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt.token}`,
        },
      })
      .then((res) => {
        setAllusers(res.data.data.doc);
        console.log(res.data.data.doc);
        setCond(false);
      })
      .catch((err) => {
        // setauthCondition(false);
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, [curentId]);

  useEffect(() => {
    var tempOnlineUser = [];
    var count = 0;

    allUsers.map((f) => {
      onlineUsers.map((o) => {
        if (o.userId === f._id) {
          tempOnlineUser[count] = f;
          count++;
        }
      });
    });
    console.log(tempOnlineUser);
    setOnlineFriends(tempOnlineUser);
  }, [allUsers, onlineUsers]);

  const handleClick = async (user) => {
    console.log("I am clicked");
    try {
      console.log(user._id);
      const res = await axios.get(
        `${port.herokuPort}/conversation/find/${curentId}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt.token}`,
          },
        }
      );
      if (res.data.data) {
        setcurrentChat(res.data.data);
        // navigation.navigate("ChatScreen", { currentChat: result.data.data });
      } else {
        const userDetails = {
          senderId: curentId,
          receiverId: user._id,
        };
        try {
          const result = await axios.post(
            `${port.herokuPort}/conversation`,
            userDetails,
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt.token}`,
              },
            }
          );

          console.log(result.data);
          setcurrentChat(result.data);

          // navigation.navigate("ChatScreen", { currentChat: result.data });
        } catch (err) {
          console.log(err);
          alert("Error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (cond) {
    return (
      <div>
        <p>Please wait</p>
      </div>
    );
  } else {
    console.log(onlineFriends);

    return (
      <div>
        <p>Online Users</p>
        {onlineFriends.map((o) => {
          if (o._id !== curentId) {
            return (
              <div className="OnlineUsers" onClick={() => handleClick(o)}>
                <img className="UserPhoto" src={o?.photoUrl} alt="No photo" />

                <p className="UserName">
                  {o?.firstname} {o?.lastname}
                </p>
                <div className="GreenDot"></div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default ChatOnline;
