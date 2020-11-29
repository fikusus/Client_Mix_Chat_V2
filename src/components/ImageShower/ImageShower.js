import React from "react";

import "./ImageShower.css";
import dateFormatter from "../Additions/dateFormatter.js"
import fileNameFormatter from "../Additions/fileNameFormatter.js"

// eslint-disable-next-line react/prop-types
const ImageShower = ({ message: { text, user ,type,date}, name }) => {

  let isSentByCurrentUser = false;

  // eslint-disable-next-line react/prop-types
  const trimmedName = name.trim()

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue imageBox">
        <a href={`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}`}>
          <img className="imagePreview"  src = {`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}` } alt={fileNameFormatter(text)} target="_blank"></img>
          </a>
          <div className = "date absoluteImage">
          <p className = "timeText colorWhite">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight imageBox">
      <p className="sentText">{user}</p>
        <a href={`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}`}>
        <img className="imagePreview"  src = {`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}` } alt={fileNameFormatter(text)} target="_blank"></img>
        </a>
        <div className = "date protestImageDate">
          <p className = "timeText protest">{dateFormatter(date)}</p>
        </div>

      </div>
   
    </div>
  );
};

export default ImageShower;
