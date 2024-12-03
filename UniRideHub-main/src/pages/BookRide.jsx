// App.js
import React, { useState, useContext, useEffect } from 'react';
import RideDetailCard from '../components/RideDetails';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserContext from '../Context/userContext';
import RideContext from '../Context/RideContext';
import './css/bookride.css';
import axios from 'axios';

const dummyData = [
  // Your dummy ride data here
  // Example:
  {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    rideTime: '10:00 AM',
    rideFare: '$20',
    source: 'City A',
    destination: 'City B',
    middleRoutes: ['P', 'E', 'F'],
  },
  {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    rideTime: '11:00 AM',
    rideFare: '$20',
    source: 'City B',
    destination: 'City D',
    middleRoutes: ['P', 'Q', 'R'],
  },
  // More ride data...
];

const BookRide = () => {
  const {bookedRide} = useContext(RideContext)
  console.log("This is booked Ride:",bookedRide)

    //const [rides, setRides] = useState(dummyData);
    const [filteredRides, setFilteredRides] = useState([]);
    //const {userId, setUserId} = useContext(UserContext);
    const [userData,setUserData] = useState([]);
    const [rideData, setRideData] = useState([]);
    const {jwt} = useContext(UserContext);

    useEffect(()=>{
      getRideData();
    },[])

    const getRideData = async () => {
        await axios.get(`https://localhost:7249/api/Ride/Getride`, 
        {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${jwt}`,
            },
          })
        .then((response) => {
          console.log(response.data)
          setRideData(response.data)
          setFilteredRides(response.data)
        }).catch((error) => {
          console.log(error)
        })
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

    const filterRides = (filters) => {
      const { filterType, searchTerm } = filters;
      const filtered = rideData.filter((ride) => {
        switch (filterType) {
          case 'source':
            return ride.source.toLowerCase().includes(searchTerm.toLowerCase());
          case 'destination':
            return ride.destination.toLowerCase().includes(searchTerm.toLowerCase());
          case 'middleRoute':
            return ride.middleRoutes.some((route) =>
              route.toLowerCase().includes(searchTerm.toLowerCase())
            );
          case 'time':
            return ride.rideTime.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return false;
        }
      });
      setFilteredRides(filtered);
    };
  
    const resetFilters = () => {
      setFilteredRides(rideData);
    };
  
    return (
      <>
      <Navbar />
      <div className="book-ride">
        <SearchBar onFilter={filterRides} onReset={resetFilters} />
        <div className="ride-list">
          {filteredRides.map((ride, index) => (
            <RideDetailCard key={index} ride={ride} user={userData[index]} />
          ))}
        </div>
      </div>
      <Footer />
      </>
    );
  };
  
  export default BookRide;
  