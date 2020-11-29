import React from "react";

import "./FileSave.css";
import dateFormatter from "../Additions/dateFormatter.js"
import fileNameFormatter from "../Additions/fileNameFormatter.js"

const FileSave = ({ message: { text, user,type,date }, name }) => {

  let isSentByCurrentUser = false;

  const trimmedName = name.trim()

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">

      <div className="messageBox backgroundBlue">
        <a href={`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}`}>
          <nobr>
            <p className="messageText colorWhite">
              {" "}
              <i className="fa fa-file fileIcon"></i>
              {fileNameFormatter(text)}
            </p>
          </nobr>
        </a>
        <div className = "date">
          <p className = "timeText colorWhite">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
      <p className="sentText">{user}</p>
        <a href={`https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_CONTAINER_NAME}/${text}`}>
          <nobr>
            <p className="messageText colorDark">
              {" "}
              <i className="fa fa-file fileIcon"></i>
              {fileNameFormatter(text)}
            </p>
          </nobr>
        </a>
        <div className = "date ">
          <p className = "timeText protest">{dateFormatter(date)}</p>
        </div>
      </div>
   
    </div>
  );
};

export default FileSave;
