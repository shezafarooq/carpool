import { useState, useContext } from "react";
import UserContext from "../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const navigate = useNavigate()
  const { 
    userId, 
    setUserId,
    jwt,
    setJwt 
  } = useContext(UserContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const setUser = async(id, jwt) => {
    setUserId(id)
    setJwt(jwt)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7249/api/Auth/authenticate",
        { mobile: phoneNumber, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        console.log(response.data)
        // let id = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        let id = response.data["item2"].toString();
        let jwt = response.data["item1"];

        await setUser(id, jwt)

        if(userId != -1 && jwt != ''){
          
          localStorage.setItem("id", id);
          localStorage.setItem("jwt", jwt);

          navigate('/')  
        }
      } else {
        console.error("Sorry! Can't log you in.");
      }
    } catch (error) {
      alert("Invalid Username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", margin: "30px 0px" }}>Sign In</h3>
      <div className="mb-3">
        <label style={{ width: "280px" }}>Phone number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-3 d-flex justify-content-between align-center">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
        <p className="forgot-password">
          <a href="#">Forgot password?</a>
        </p>
      </div>
      <div className="d-grid ">
        <button
          type="submit"
          className="btn"
                  style={{ backgroundColor: '#FFB703', color: 'white', width: "120px" }}
          
        >
          Submit
        </button>
      </div>

      <div className="d-grid mt-5">
        <a
          href="#"
          onClick={() => {
            return props.handleRegister();
          }}
        >
          Don't have an account? Create one
        </a>
      </div>
    </form>
  );
};

export default Login;
