import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { addMessage, getMessages } from "../actions/messageAction";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const scrollRef=useRef()

  const handleShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage((prevMessage) => prevMessage + emoji);
  };

  useEffect(() => {

    const getAllMessages = async () => {
        if(currentChat){
      const data = await getMessages(currentUser._id, currentChat._id);
      console.log("$$$$$$$$$",data)
      setOldMessages(data.messages);
        }
    };
    getAllMessages();

  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      const message = await addMessage(
        currentUser._id,
        currentChat._id,
        newMessage
      );
      socket.current.emit("send-msg", {
        sender: currentUser._id,
        receiver: currentChat._id,
        message: newMessage,
      });

      const messages = [...oldMessages];
      messages.push({ fromSelf: true, message: newMessage });
      setOldMessages(messages);
    }
    setNewMessage("");
  };
  useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-received", (message) => {
            setArrivalMessage({ fromSelf: false, message: message });
            console.log("+++++++++||||||",message)
          });
    }
  },[])
  useEffect(()=>{
    arrivalMessage && setOldMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'})
  },[oldMessages])
  console.log('me:',currentUser,"him:",currentChat)
  return (
    <div className="container mx-auto p-4 bg-gray w-[50%] h-[50vh] ">
      <div className="border border-gray-200 flex justify-between p-[12px] items-center">
        <img
          className="w-[40px] rounded-[50%]"
          src={currentChat.profilePic}
          alt=""
        />
        <h2>{currentChat.firstname}</h2>
      </div>
      <div className="border border-gray-200 p-4 rounded min-h-[30vh] h-[50vh] overflow-scroll">
        {oldMessages?.map((message, index) => (
          <div
            className={`flex mb-4 ${
              message.fromSelf ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            <div
              className={`${
                message.fromSelf
                  ? "bg-[#172153] text-white rounded-tr-lg rounded-bl-lg"
                  : "bg-[#a4351f] text-white rounded-tl-lg rounded-br-lg"
              } p-2`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-[#d2a53d] text-[24px]">
          <BsEmojiSmileFill onClick={handleShowEmojiPicker} />
        </h2>
        {showEmojiPicker && (
          <div className="absolute z-10 top-[60px]">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              disableAutoFocus={true}
            />
          </div>
        )}
        <form className="w-full flex" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="flex-grow border border-gray-200 rounded p-2 mr-2"
            value={newMessage}
            required
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
