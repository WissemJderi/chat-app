import React from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>
          Richard Sanford <img src={assets.green_dot} alt="" className="dot" />
        </p>
        <img src={assets.help_icon} className="help" alt="" />
      </div>
      <div className="chat-message">
        <div className="s-message">
          <p className="message">Lorem ipsum dolor sit amet...</p>
          <div className="s-info">
            <img src={assets.profile_img} alt="" />
            <p>02:30 PM</p>
          </div>
        </div>
        <div className="s-message">
          <img className="message-img" src={assets.pic1} alt="" />
          <div className="s-info">
            <img src={assets.profile_img} alt="" />
            <p>02:30 PM</p>
          </div>
        </div>

        <div className="r-message">
          <p className="message">Lorem ipsum dolor sit amet...</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>02:30 PM</p>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Send A Message" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default ChatBox;
