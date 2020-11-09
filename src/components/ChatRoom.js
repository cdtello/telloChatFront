import React, { useRef, useState } from "react";
import ImageUploader from "react-images-upload";
import { withUser } from "../states/user-context";
import "./styles/ChatRoom.css";
import api from "../adapters/apis/api";
import DeleteMessageModal from "./DeleteMessageModal";

const ChatRoom = (props) => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const dummy = useRef();
  const messagesRef = {};
  // const query = messagesRef.orderBy('createdAt').limit(25);

  const user = props.userLogin.user;
  const token = props.userLogin.token;
  const [formValue, setFormValue] = useState("");
  const messages = props.dataMessages;

  const sendMessage = async (e) => {
    e.preventDefault();
    //  handleUpload();
    const { id, photoURL } = user;

    console.log(formValue);
    console.log(user.id);
    try {
      const data = {
        message: formValue,
        image: "",
        active: true,
        author: user.id,
      };
      await api.messages.create(data, token);
    } catch (error) {
      console.log(error);
    }

    setFormValue("");
    //   dummy.current.scrollIntoView({ behavior: 'smooth' });
    console.log("Enviando Mensaje");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image.raw);
    console.log(formData);
    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <div className="chatRoom">
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              user={user.id}
              token={token}
            />
          ))}
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something"
        />

        <div>
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} alt="dummy" width="50" height="50" />
            ) : (
              <>
                <span className="fa-stack fa-2x mt-3 mb-2">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-store fa-stack-1x fa-inverse" />
                </span>
                <h5 className="UploadImage">⛺</h5>
              </>
            )}
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          {/* <button onClick={handleUpload}>⛺</button> */}
        </div>

        {/* <button onClick={handleUpload}>⛺</button> */}
        <button type="submit" disabled={!formValue}>
          ✔
        </button>
      </form>
    </div>
  );
};

function ChatMessage(props) {
  const msgId = props.message.id;
  const handleDeleteMessage = async (e) => {
    console.log("Eliminando mensaje");
    try {
      await api.messages.remove(msgId, props.token);
    } catch (error) {
      console.log(error);
    }
  };
  const { message, author, photoURL } = props.message;

  const messageClass = author === props.user ? "sent" : "received";

  if (author === props.user) {
    return (
      <>
        <div className={`message ${messageClass}`}>
          <button onClick={handleDeleteMessage} className="btn btn-danger">
            🗑
          </button>
          <p>{message}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`message ${messageClass}`}>
          {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
          <p>{message}</p>
        </div>
      </>
    );
  }
}

export default withUser(ChatRoom);
