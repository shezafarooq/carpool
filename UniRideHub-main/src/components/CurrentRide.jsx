// CurrentRide component
import React from 'react';
import './css/ridecard.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/userContext';
import Rating from '@mui/material/Rating';



const CurrentRide = () => {

  const {userId, setUserId} = useContext(UserContext);
  const [userData,setUserData] = useState([]);
  const [rideData, setRideData] = useState([]);
  const [userRideData, setUserRideData] = useState([]);

  useEffect(()=>{
    getUserData(userId)
  },[userId])

  const getUserData = async (id) => {
    await axios.get(`https://localhost:7249/api/User/GetUser/${id}`)
    .then((response) =>{
      console.log(response.data.responseData)
      setUserData(response.data.responseData)
    }).catch((error)=>{
      console.log(error)
    })
  }

  // Dummy data for current ride
  const currentRideData = {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    carModel: 'Toyota Camry',
    rideTime: '12:00 PM',
    source: 'A',
    destination: 'B',
    middleRoutes: ['C', 'D'],
  };

  return (
<div className="current-ride">
      <h2>Current Ride</h2>
        <div className="ride-card">
          <div className="ride-info">
            <div className='ride-info'>
            <p> <b>Name:</b> {currentRideData.name}</p>
            <p> <b>Phone Number: </b>{currentRideData.phoneNumber}</p>
            </div>
            <div className='ride-info'>
            <p> <b>Car Model: </b>{currentRideData.carModel}</p>
            <p> <b>Ride Time: </b>{currentRideData.rideTime}</p>
            </div>
            <div className='ride-info'>
            <p> <b>Source: </b>{currentRideData.source}</p>
            <p> <b>Destination: </b>{currentRideData.destination}</p>
            </div>
            <div className='ride-info'>
            <p> <b>Middle Routes: </b>{currentRideData.middleRoutes.join(', ')}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CurrentRide;
