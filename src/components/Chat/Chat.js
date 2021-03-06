import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import FileSpawn from "../FileSpawn/FileSpawn";
import Modal from "react-modal";
import _ from "lodash"

import "./Chat.css";

let socket;
let curLoadedcount = 0;
let userName;
let IsOpen = true;


const Chat = ({ location }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const [messageType, setMessageType] = useState("text");
  const [fileName, setFileName] = useState("");
  const [messageDate, setMessageDate] = useState(new Date());
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const ENDPOINT = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const { name, room, room_id, secret } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room_id, secret }, (error) => {
      if (error) {
        alert("Помилка авторизації");
      }
    });
    userName = name;
    setRoom(room);
    setName(name);

    socket.on("display-chat", ({ messages, col }) => {
      curLoadedcount = col;
      setMessages([]);
      for (let i = 0; i < messages.length; i++) {
        let { name, text, messageType, sendDate } = messages[i];
        setMessages((messages) => [
          ...messages,
          {
            user: name,
            text: text,
            type: messageType,
            date: sendDate,
          },
        ]);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", async (message) => {
      setMessages((messages) => [...messages, message]);
      if (message.user !== userName) {
        let audio = document.getElementById("output");
        audio.play();
      }
    });

    socket.on("loaded-old-message", ({ message, col }) => {
      curLoadedcount = col;
      for (let i = message.length - 1; i >= 0; i--) {
        let { name, text, messageType, sendDate } = message[i];
        setMessages((messages) => [
          {
            user: name,
            text: text,
            type: messageType,
            date: sendDate,
          },
          ...messages,
        ]);
      }
      setMessages((messages) => [...message, ...messages]);
    });

    socket.on("file", (message) => {
      setMessages((messages) => [...messages, message]);
      if (message.user !== userName) {
        let audio = document.getElementById("output");
        audio.play();
      }
    });

    socket.on("roomData", ({ users }) => {
      setUsers(_.unionBy(users,"name"));
    });
  }, []);

  window.addEventListener("resize", function () {
    if (window.innerWidth === 0) {
      if (IsOpen) {
        IsOpen = false;

        socket.emit("setOpend", { status: false });
      }
    } else {
      if (!IsOpen) {
        IsOpen = true;
        socket.emit("setOpend", { status: true });
      }
    }
  });

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, messageType, messageDate }, () => {
        setMessage("");
      });

      let audio = document.getElementById("input");
      audio.play();
    }
  };
  const sendFile = (/*event*/) => {
    /*  event.persist();*/
    if (fileName) {
      socket.emit(
        "sendMessage",
        { message: fileName, messageType, messageDate },
        () => {
          setFileName("");
        }
      );
    }
    let audio = document.getElementById("input");
    audio.play();
  };

  return (
    <div className="outerContainer">
      <audio
        preload="metadata"
        id="input"
        src="https://sumy.in.ua/mix_sounds/input.mp3"
      ></audio>
      <audio
        preload="metadata"
        id="output"
        src="https://sumy.in.ua/mix_sounds/output.mp3"
      ></audio>

      <div className="container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <TextContainer users={users} closeModal = {closeModal}/>
        </Modal>
        <InfoBar room={room} userscount={users.length} openModal={openModal}/>
        <Messages
          messages={messages}
          name={name}
          loadOld={curLoadedcount}
          socket={socket}
        />

        {selectedFile && (
          <React.Fragment>
            <FileSpawn
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              loaded={loaded}
            />
          </React.Fragment>
        )}
        <Input
          message={message}
          fileName={fileName}
          setFileName={setFileName}
          setMessageDate={setMessageDate}
          sendFile={sendFile}
          setMessage={setMessage}
          sendMessage={sendMessage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          loaded={loaded}
          setLoaded={setLoaded}
          messageType={messageType}
          setMessageType={setMessageType}
        />
      </div>
    </div>
  );
};

export default Chat;
