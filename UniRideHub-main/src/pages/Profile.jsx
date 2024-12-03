import { useState, React, useContext } from "react";
import Navbar from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import Footer from "../components/Footer";

export default function Profile() {

  return (
    <>
    <Navbar/>
    <ProfileComponent/>
    <Footer/>    
    </>
  )
}

