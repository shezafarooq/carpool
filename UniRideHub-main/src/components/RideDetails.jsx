// RideDetailCard.js
import React from 'react';
import './css/ridecard.css';
import {useState, useContext} from 'react';
import RideContext from '../Context/RideContext';
import UserContext from '../Context/userContext';
import axios from 'axios';

const RideDetailCard = ({ ride, user }) => {

  const {bookedRide, setBookedRide, rideConfirmation, setRideConfirmation} = useContext(RideContext)
  const [isBooked, setIsBooked] = useState(false)
  console.log("start booked ride: ", bookedRide);

  const {userId} = useContext(UserContext)
  // const [rideId, setRideId] = useState(0)
  const [userType, setUserType] = useState("Rider")
  const [avgRating, setAvgRating] = useState(0)
  // const [isActive, setIsActive] = useState(true)


  const handleBook = async(ride) => {
    // console.log("ride check ", ride);
    // if (bookedRide.length === 0) {
      setIsBooked(true); // disable the button
      setBookedRide([...bookedRide, ride]);
      console.log("booked ride: ", bookedRide);
      setRideConfirmation(true);
    // } 
    // else {
    //   alert('You have already booked a ride.');
    // }
      console.log("THis is rideid:",ride)
      let formdata = new FormData();
      formdata.append("User_id",userId);
      formdata.append("Ride_id",ride.id);
      formdata.append("User_type",userType)
      formdata.append("Avg_rating",avgRating);
      formdata.append("Is_active",true);
      axios.post(`https://localhost:7249/api/UserRide/AddUserRide`, formdata
      , {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${jwt}`,
        },
      }).then((response) => {
        console.log("This is the response:",response);
      })
      .catch((error) => {
        console.log(error);
      });
      setUserType("");
      setAvgRating(0);
  };




  return (
    <div className="all-rides">
    <div className="ride-card">
    {user && <p> Name: {user.first_name + " " + user.last_name}</p>}
    {user && <p> Phone Number: {user.mobile}</p>}
      <p>Ride Time: {ride.time + " " + ride.date}</p>
      <p>Available Seats: {ride.total_Seats}</p>
      <p>Source: {ride.source}</p>
      <p>Destination: {ride.destination}</p>
      <p>Middle Route: {ride.mid_routes}</p>
      <button className='book-button' onClick={() => handleBook(ride)} disabled={isBooked}>
        {isBooked ? 'Booked' : 'Book'}
        </button>
    </div>
    </div>
  );
};

export default RideDetailCard;
