import React from 'react';
import Logo from "../../Images/Logo.png"
import { IoChevronDown } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='Container navbarConatiner'>
      
         <img src={Logo} className=''/>
         <div className='inputContainers'>

        
         <div className='inputContainer'>
          <IoLocationOutline className='locationIcon'/>
         <input type='text' className="inputBox"placeholder='Banglore'/>
           <IoChevronDown className='arrowDown' disabled />

         </div>
         
         <div className='SearchContainer'>
         <MdSearch className='searchIcon'/>
          <input type='text' placeholder='Search for repair service' className='searchInput' />

         </div>
      
        

         </div>
         <div className='signinContainer'>
           <button type='btn' className='loginBtn'>Login</button>
           <button type='btn' className='signinBtn'>Sign Up</button>
         </div>
    </div>
  );
}

export default Navbar;
