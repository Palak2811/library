import React from 'react';

import logo from './logo.jpg';

import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (

    <>

      <nav className="navbar">

        <div className="nav-content">

          <h1 className="logo">

            <img src={logo} alt="Logo" className="logo-img" />

            <span> Library</span></h1>

          <ul className="nav-links">

            
            <li><Link to="/about">About</Link></li>

            

          </ul>

        </div>
      </nav>



    </>


  );



};

export default Navbar;