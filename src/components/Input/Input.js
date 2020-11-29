import React, { Component } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import "./Input.css";

var fileInLoadKey = false;
class Input extends Component {
  async uploadFile(file) {
    const SAS_TOKEN =
      "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-11-25T19:59:52Z&st=2020-11-25T11:59:52Z&spr=https&sig=FI2Y8dHZgsa%2BoeSlsK9HfSxNX%2F5JVoWtW9Mj0lg7lAg%3D";
    const sasURL = `https://${process.env.REACT_APP_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`;

    const blobServiceClient = new BlobServiceClient(sasURL);

    const containerClient = blobServiceClient.getContainerClient(
      process.env.REACT_APP_CONTAINER_NAME
    );

    const filename = file.name.substring(0, file.name.lastIndexOf("."));
    const ext = file.name.substring(file.name.lastIndexOf("."));
    const blobName = filename + "_" + new Date().getTime() + ext;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    fileInLoadKey = true;
    let type = file.type;
    const uploadBlobResponse = await blockBlobClient.uploadData(file);

    fileInLoadKey = false;
    if (
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/jpeg" ||
      type === "image/svg" ||
      type === "image/webp" ||
      type === "image/svg+xml"
    ) {
      this.props.setMessageType("image");
    } else {
      this.props.setMessageType("file");
    }

    this.props.setFileName(blobName);
    this.props.sendFile();
    this.props.setMessageType("text");
    let inputs = document.querySelector(".inputFile");
    inputs.value = "";
    if (inputs.value) {
      inputs.type = "text";
      inputs.type = "file";
    }
    this.props.setSelectedFile(null);
    this.props.setLoaded(0);

    console.log(
      `Upload block blob ${file.name} successfully`,
      uploadBlobResponse.clientRequestId
    );
  }

  sendMessageFunction = async (e) => {
    let inputField = document.getElementsByClassName("input");
    this.props.setMessageType("text");
    inputField[0].focus();
    console.log(inputField);
    this.props.setMessage("");
    this.props.sendMessage(e);
  };

  onChangeHandler = async (event) => {
    this.formatingFile(event.target.files);
  };


  formatingFile = async (files) =>{
    if (!fileInLoadKey) {
      if (files[0].size > 52428800) {
        alert("Файл занадто великий(max 50mb)");
      } else {
        this.props.setSelectedFile(files);
        this.uploadFile(files[0]);
      }
    } else {
      alert("Дочекайся завантаження попереднього файлу");
    }
  }



  onKeyboardPressed = (event) => {
    var items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    console.log(JSON.stringify(items)); // will give you the mime types
    for (let index in items) {
      var item = items[index];
      if (item.kind === "file") {
        var blob = item.getAsFile();

        let blobs = [blob];
        this.formatingFile(blobs);
      }
    }
  };

  render() {
    return (
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={this.props.message}
          onKeyPress={(event) =>
            event.key === "Enter" ? this.sendMessageFunction(event) : null
          }
          onChange={({ target: { value } }) => this.props.setMessage(value)}
          onPaste={(e) => this.onKeyboardPressed(e)}
        />
        <input
          type="file"
          hidden="hidden"
          className="inputFile"
          onChange={this.onChangeHandler}
        ></input>
        <i
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            const inputFile = document.querySelector(".inputFile");
            inputFile.click();
          }}
          className="fa fa-paperclip"
        ></i>
        <i
          style={{ cursor: "pointer" }}
          className="sendButton far fa-paper-plane"
          onClick={async (e) => {
            this.sendMessageFunction(e);
          }}
        ></i>
      </form>
    );
  }
}

export default Input;
