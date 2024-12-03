import UserContext from "./userContext";
import { useState, useEffect } from "react";

const UserState = (props) => {
    // const [userId, setUserId] = useState(Number(localStorage.getItem("id")));
    const [userId, setUserId] = useState(1);
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"))

    // useEffect(() => {
    //     let id = Number(localStorage.getItem("id"));
    //     let jwt = localStorage.getItem("jwt");
    //     setUserId(id);
    //     setJwt(jwt);
    // }, []);

    return(
        <UserContext.Provider value={{
            userId, 
            jwt,
            setUserId,
            setJwt
        }}>

            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;