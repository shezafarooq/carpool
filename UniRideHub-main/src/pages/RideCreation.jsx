import { useState } from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import Map from"../components/Map.jsx";
import Footer from"../components/Footer.jsx";

const RideCreation = () => {
    return (
        <>
            <Navbar />
            <div>
                <Form />
                <Map />
            </div>
            <Footer/>
        </>
    );
}

export default RideCreation;
