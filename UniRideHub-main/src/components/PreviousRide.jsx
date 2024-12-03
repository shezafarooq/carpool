import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/userContext';
import Rating from '@mui/material/Rating';
import './css/ridecard.css';

const PreviousRides = () => {
  // Dummy data for previous rides
  const {userId, jwt, setUserId} = useContext(UserContext);
  const [userData,setUserData] = useState([]);
  const [rideData, setRideData] = useState([]);
  const [userRideData, setUserRideData] = useState([]);

  useEffect(() => {
    getUserRideData(userId);
  }, [userId])

  const getUserRideData = async (id) => {
    await axios.get( `https://localhost:7249/api/UserRide/GetUserRide/${id}`, 
    {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
    .then((response) => {
      console.log(response.data)
      setUserRideData(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getRideData(userRideData);
  },[userRideData])

  const getRideData = async (data) => {
    const rideIds = data.map((ride) => ride.ride_id);
    const fetchedRideData = [];
    for (const rideId of rideIds) {
      await axios.get(`https://localhost:7249/api/Ride/Getride/${rideId}`, 
      {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        })
      .then((response) => {
        fetchedRideData.push(response.data);
      }).catch((error) => {
        console.log(error)
      })
    }
    console.log(fetchedRideData)
    setRideData(fetchedRideData)
  }
  
  useEffect(() => {
    getUserData(rideData);
  },[rideData])

  const getUserData = async (data) => {
    const userIds = data.map((user) => user.userId);
    //console.log(userIds)
    const fetchedUserData = [];
    for (const userId of userIds){
      await axios.get(`https://localhost:7249/api/User/GetUser/${userId}`, 
      {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        })
      .then((response)=>{
        //console.log(response.data)
        fetchedUserData.push(response.data.responseData);
      }).catch((error) => {
        console.log(error)
      })
    }
    console.log(fetchedUserData)
    setUserData(fetchedUserData)
  }


  return (
    <div className="previous-rides">
      <h2>All Rides</h2>
      {rideData.map((ride, index) => (
        <div key={index} className="ride-card">
          <div className="ride-info">
            <div className='ride-info'>
            {/* <p> <b>Name: </b>{userData[index].first_name + " " + userData[index].last_name}</p>
            <p> <b>Phone Number: </b>{userData[index].mobile}</p> */}
            {userData[index] && <p> <b>Name: </b>{userData[index].first_name + " " + userData[index].last_name}</p>}
            {userData[index] && <p> <b>Phone Number: </b>{userData[index].mobile}</p>}
            <p> <b>User Type: </b>{userRideData[index].user_type}</p>
            </div>
            {/* <div className='ride-info'>
            <p> <b>Ride Status: </b>{userRideData[index].is_active ? 'Active' : 'Inactive'}</p>
            </div> */}
            <div className='ride-info'>
            <p> <b>Source: </b>{ride.source}</p>
            <p> <b>Destination: </b>{ride.destination}</p>
            </div>
            <div className='ride-info'>
            {/* <p> <b>Middle Routes: </b>{ride.middleRoutes.join(', ')}</p> */}
            <p> <b>Middle Routes: </b>{ride.mid_routes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousRides;
