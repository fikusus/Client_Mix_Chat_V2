import React from "react";

import "./FileSpawn.css";

// eslint-disable-next-line react/prop-types
const FileSpawn = ({ selectedFile }) => {
  const filesArray = [...selectedFile];

  return (
    <div>
      <div className="outerFileContainer">
        <div className="innerFileContainer">
          {filesArray.map((f) => (
            <div key={f.lastModified} className="fileName">
              <p key={f.lastModified + new Date()}>{f.name}</p>
              <div id="cancelFileSelect">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileSpawn;
