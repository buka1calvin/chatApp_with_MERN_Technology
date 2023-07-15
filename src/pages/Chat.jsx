import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import { getUserProfile } from "../actions/auth";
import { getAllUsers } from "../actions/auth";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const ChatApp = () => {
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        if (!data) {
          navigate("/login");
        } else {
          setCurrentUser(data.userDetails);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:3000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const getAllContacts = async () => {
      try {
        if (currentUser) {
          const data = await getAllUsers();
          setContacts(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllContacts();
  }, [currentUser]);

  const handleChat = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="flex justify-between h-[91.3vh]">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChat}
      />
      {currentChat === undefined ? (
        currentUser ? (
          <Welcome />
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
      )}
    </div>
  );
};

export default ChatApp;
