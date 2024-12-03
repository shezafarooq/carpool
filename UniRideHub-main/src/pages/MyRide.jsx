// RidePage component
import React from 'react';
import CurrentRide from '../components/CurrentRide';
import PreviousRides from '../components/PreviousRide';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyRide = ({ userType }) => {

  return (
    <div className="ride-page">
      <Navbar />
      
      {/* {userType === 'driver' ? (
        <>

          <CurrentRide />
          <PreviousRides />

        </>
      ) : (

          <PreviousRides />
        
      )} */}
    <PreviousRides />
    <Footer />
    </div>
  );
};

export default MyRide;
