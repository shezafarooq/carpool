import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/userContext';
import RideContext from '../Context/RideContext';
import './css/requested.css';
import MuiAlert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function RequestedRideComponent() {
    const { userId, setUserId } = useContext(UserContext);
//    const { rideConfirmation, rideDetails } = useContext(RideContext);
    // const { rideConfirmation, bookedRide } = useContext(RideContext);

    const {bookedRide} = useContext(RideContext)

    const [rideData, setRideData] = useState([]);
    const [rideStatus, setRideStatus] = useState(false); //false-stopped
    const [rideStop, setRideStop] = useState(true);

    const [rideStartButton, setRideStartButton] = useState(true); //show start button
    const [rideStopButton, setRideStopButton] = useState(false); //show stop button

    const [ratingValue, setRatingValue] = React.useState(0);

    useEffect(() => {
        console.log("user id: ", userId);
        console.log("This is booked Ride:",bookedRide)

        // getRideData(userId);
    }, [userId])

    // const getRideData = async (id) => {
    //     // await axios.get(`https://localhost:5173/api/requestedRides/${id}`)

    //     await axios.get("https://mocki.io/v1/63babf2e-63df-49c7-875d-7434900c7fc4")
    //         .then((response) => {
    //             // console.log(response);
    //             // console.log(response.data);
    //             setRideData(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const rideStatusfunc = (status) => {
        setRideStatus(!rideStatus);

        switch (rideStatus) {
            case false: //stopped
                setRideStopButton(false)
                setRideStartButton(true)  //show start button
                break;
            case true:  //started so show stop button
                setRideStartButton(false);
                setRideStopButton(true)
                break;
        }

    }
    return (
        <body className="bodyProfile">
            <div className="Profilecard">
                <div className="upperProfile">
                    <div className="row">
                        <div className="col-8 heading1 ">
                            <h3 id='requestedride'><b>Booked Ride</b></h3>
                        </div>
                        <div className="col-4">
                            <img id='profileImage' className="img-fluid" src="./Rzjor3M.png" />
                        </div>
                    </div>

                    {bookedRide.map((ride, index) => (
                        <div key={index}> 

                            <div className="d-flex justify-content-center">
                                <h4 className="font-weight-bold text-center">Ride no. {ride.id} </h4>
                            </div>
                            {/* <hr /> */}

                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Source</span>
                                <span className="text-muted">{ride.source}</span>
                            </div>
                            <hr id='profilehr' />
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Destination</span>
                                <span className="text-muted">{ride.destination}</span>
                            </div>
                            <hr id='profilehr' />
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Mid Routes</span>
                                <span className="text-muted">{ride.mid_routes}</span>
                            </div>
                            <hr id='profilehr' />
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Fare</span>
                                <span className="text-muted">{ride.fare}</span>
                            </div>
                            <hr id='profilehr' />
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">Total Seats</span>
                                <span className="text-muted">{ride.total_Seats}</span>
                            </div>
                            <hr id='profilehr' />
                            <div className="d-flex justify-content-between mb-2">
                                <span className="font-weight-bold">Timings</span>
                                <span className="text-muted">{ride.time}</span>
                            </div>

                            {/* <div className="lowerProfile">
                                <Link to='/createRide'><button id='trackRide' className="btn">Track Ride</button> </Link>
                            </div> */}

                            {/* <hr id='profilehr' /> */}
                            {/* { */}
                                {/* // rideConfirmation ? ( */}
                                    <p id='confirm' >
                                        {/* <Alert severity="success">Requested Ride Confirmed!</Alert> */}
                                        {/* <hr id='profilehr' /> */}
                                        {rideStartButton ? (
                                            <div className="text-center mt-5">
                                                <button id='startRide' onClick={rideStatusfunc} className="btn btn-primary">Start Ride</button>
                                            </div>
                                        ) : ("" // <p>not started</p>
                                        )}

                                        {rideStopButton ? (
                                            <div className="text-center mt-5">
                                                <button id='stopRide' onClick={rideStatusfunc} className="btn btn-primary">Stop Ride</button>
                                            </div>
                                        ) : ("" // <p>not stopped</p>
                                        )}
                                    </p>
                                {/* // ) : ( */}
                                    {/* // <p id='notconfirm'>
                                    //     <div className="lowerProfile">
                                    //         <Alert severity="info">Waiting for Confirmation from Rider</Alert>
                                    //     </div>
                                    // </p>
                                // )} */}

                            {/* <hr id='profilehr' /> */}
                            <div className="d-flex justify-content-center">
                                <div id='rateRider' className="upperProfile">
                                    <div className="row">
                                        <h5><b>Rate Rider</b></h5>
                                        <Rating id='rating'
                                            name="simple-controlled"
                                            value={ratingValue}
                                            onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr id='profilehr' /> <hr id='profilehr'  className='mb-5'/>

                        </div>
                 ))}
                </div>
            </div >
        </body>

    );
}
