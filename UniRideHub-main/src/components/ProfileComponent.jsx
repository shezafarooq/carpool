import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/userContext';
import Rating from '@mui/material/Rating';
import './css/profile.css';

export default function ProfileComponent() {
    const { userId, jwt } = useContext(UserContext);
    const [userData, setUserData] = useState([]);
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(1);

    useEffect(() => {
        getUserData(userId);
    }, [userId])

    const getUserData = async (id) => {
        // console.log("user id: ", id);
        await axios.get(`https://localhost:7249/api/User/GetUser/${id}`, 
        {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${jwt}`,
            },
          })
            .then((response) => {      
               console.log(response.data.responseData)
                setUserData(response.data.responseData)
                setRating(userData.avg_rating)

                if(userData.userType == "driver"){
                    setShowRating(true);
                }
                else{
                    setShowRating(false);
                }

                // setUserData(response.data.responseData)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding1">
                <div className="container d-flex justify-content-center">
                    <div className="col-xl-12 col-md-16">
                        <div className="cardProfilePage user-card-full">
                            <div id='profileCard' className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                        </div>

                                        {showRating?
                                        <Rating name="read-only"  value={rating} readOnly/>

                                        : "" 
                                        }

                                       
                                        <p>{userData.first_name + " " + userData.last_name}</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">First Name</p>
                                                <h6 className="text-muted f-w-400">{userData.first_name}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Last Name</p>
                                                <h6 className="text-muted f-w-400">{userData.last_name}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Phone Number</p>
                                                <h6 className="text-muted f-w-400">{userData.mobile}</h6>
                                            </div>

                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Rides</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Total Rides Completed</p>
                                                <h6 className="text-muted f-w-400">{userData.rides_completed}</h6>
                                            </div>
                                            {showRating?
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Rating</p>
                                                {/* <h6 className="text-muted f-w-400">  */}
                                                <Rating name="read-only" value={rating} readOnly />
                                                {/* </h6> */}
                                            </div>
                                        : ""    
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
