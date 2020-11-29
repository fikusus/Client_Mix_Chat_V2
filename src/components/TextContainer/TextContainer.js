import React from "react";
import _ from "lodash"
import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => {
  users = _.unionBy(users,"name");
 return(
  <div className="textContainer">
    {users ? (
      <div>
        <h1>Онлайн:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
  )
};

export default TextContainer;
