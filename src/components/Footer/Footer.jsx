import React from "react";
import logo from "../../Images/Logo-2.png";
import GooglePlay from "../../Images/GooglePlay.png";
import AppStore from "../../Images/App Store.png"
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerConatiner Container">
      <div className="gridContainer">
        <div className="firstGrid">
          <img src={logo} alt="logo" />
          <p className="firstGridText">
            Chicoo is your one-stop destination for expert repair services in
            Karnataka.
          </p>
        </div>
        <div className="secondGrid">
          <p className="secondGridTitle">Company</p>

          <ul className="secondGridListItems">
            <li>About us </li>
            <li>
            Careers
            </li>
            <li>Privacy Policy</li>
            <li>Terms and conditions</li>
          </ul>
        </div>
        <div className="secondGrid">
          <p className="secondGridTitle">For Customers</p>
          <ul className="secondGridListItems">
            <li> Chicoo Reviews</li>
            <li>
            Category
            </li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="secondGrid">
          <p className="secondGridTitle">Download App</p>

          <ul className="googlePlay">
           <img src={GooglePlay} style={{height:"43px", width:"157px", objectFit:"cover"}}/>
           <img src={AppStore}style={{height:"43px", width:"157px", objectFit:"cover"}} />
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
