import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const { userId, setUserId, jwt, setJwt } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setUser = async (id, token) => {
    setUserId(id);
    setJwt(token);
  };

  useEffect(() => {
    setUser();
  });

  const formValidated = () => {
    // const isValidNum = (number) => {
    //   // for(let i = 0; i < number.length; i++) {
    //   //   if(number[i] < "0" || number[i] > "9"){
    //   //     return false;
    //   //   }
    //   // }
    //   return true;
    // }

    // let e = "";
    // if (password != confirmPass){
    //   e = "Passwords don't match. Try Again!"
    //   setConfirmPass("");
    // }
    // if(phone.length != 11 || !isValidNum(phone)){
    //   e = "Phone number invalid"
    //   setPhone("");
    // }

    // setError(e);

    // if(e == ""){
    //   return true;
    // }
    // return false;
    return true;
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidated()) {
      try {
        const data = {
          id: 0,
          mobile: phone,
          first_name: fname,
          last_name: lname,
          password: password,
        };

        const res = await axios.post(
          "https:localhost:7249/api/Auth/register",
          data,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(res.data)
        if (res.data) {
          alert("User Created Successfully. Press Ok to redirect to Login page...")
          props.handleRegister()
        }
      } catch (error) {
        console.error(error);
        alert("User Already Exists!");
      }
    } else {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", margin: "20px 0px" }}>Sign Up</h3>
      <div className="mb-3">
        <label style={{ width: "280px" }}>Phone number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter phone number"
          name="phone"
          value={phone}
          onChange={handlePhone}
        />
      </div>
      <div className="mb-3">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First name"
          name="fname"
          value={fname}
          onChange={handleFname}
        />

        <label className="mt-2">Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last name"
          name="lname"
          value={lname}
          onChange={handleLname}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Re enter password"
          name="confirmPass"
          value={confirmPass}
          onChange={handleConfirmPass}
        />
      </div>
      <div className="d-grid mt-2">
        <button
          type="submit"
          className="btn "
                  style={{ width: "120px", backgroundColor: '#FFB703', color: 'white' }}
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
          Already have an account? Sign in
        </a>
      </div>
    </form>
  );
};

export default Signup;
