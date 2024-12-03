import RideContext from "./RideContext";
import { useState, useEffect } from "react";

const RideState = (props) => {
    const [rideConfirmation, setRideConfirmation] = useState(false);
    const [bookedRide, setBookedRide] = useState([]);
    // const [bookedRide, setBookedRide] = useState([
    //     {
    //         id: 1,
    //         source: "PECHS",
    //         destination: "FAST",
    //         mid_routes: "Drigh road, malir halt",
    //         fare: 200,
    //         total_seats: 4,
    //         timings: "12/01/2023"
    //     },
    //     {
    //         id: 2,
    //         source: "Gulshan",
    //         destination: "FAST",
    //         mid_routes: "Drigh road, malir halt",
    //         fare: 250,
    //         total_seats: 5,
    //         timings: "12/01/2023"
    //     }
    // ]); 
    return(
        <RideContext.Provider value={{rideConfirmation, setRideConfirmation, bookedRide, setBookedRide}}>
            {props.children}
        </RideContext.Provider>
    );
}

export default RideState;