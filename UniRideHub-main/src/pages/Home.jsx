import { useState } from "react";
import './css/home.css';

import Navbar from "../components/Navbar";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const Home = () => {

    return (
        <>
            <Header />
            <span className="hero rider">
                <Hero 
                    title="LOOKING FOR A RIDE?"
                    subtitle="Book a ride with us today"
                    description="Tired of your daily commute problems in uni? Just click on the Book a Ride button. You can book from countless rides and track the progress. We also provide a map to know the track that the driver will follow. So hit up your colleagues and fellow uni mates and enjoy the drive with them!"
                    link="Book a Ride"
                    extraLink="Booked Rides"
                    nav = "/bookride"
                    extranav="/requestedRide"
                />
            </span>
            <div></div>
            <div></div>
            
            <span className="hero driver">
                <Hero 
                    title="LOOKING FOR PASSENGERS?"
                    subtitle="Get passengers for your car"
                    description="As it becomes increasingly difficult to manage your fuel expenses, we provide a platform where you can just post for the ride and your fellow colleagues can request to share a ride with you! You decide the fare, you decide the route. So create a ride now!"
                    link="Create Ride"
                    extraLink = "My Rides"
                    nav="/createride"
                    extranav="/myride"
                />
            </span>
            <div style={{padding: '50px'}}></div>
            <Footer /> 
        </>
    );
}

export default Home;
