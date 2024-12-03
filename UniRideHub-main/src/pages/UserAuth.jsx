import { useState, useEffect } from "react";
import "./css/user-auth.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import TextFade from "../components/TextFade";
import Signup from "../components/Signup";

const UserAuth = (props) => {
  const [isRegister, setIsRegister] = useState(false);
  const [text, setText] = useState("");

  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const colors = [
        "#FFB703",  // Orange
        "#FF8C00",  // Darker Orange
        "#D3D3D3",  // Light Grey
        "#A9A9A9",  // Dark Grey
        "#808080",  // Grey
    ];


  const phrases = isRegister
    ? "Create your account to enjoy all the features exclusive for the members!"
    : "Welcome back! Sign in and pick up from where you left :)";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  const handleRegisterLink = () => {
    setIsRegister(!isRegister);
  };

  const divStyle = {
    backgroundColor: colors[currentColorIndex],
    transition: "background-color 1s ease",
  };

  return (
    <>
      <Navbar />
      <div className="auth-body">
        <div className="auth-side" style={divStyle}>
          {isRegister ? (
            <div>
              <TextFade text="CARPOOL APPLICATION" fromDirection="top" />
              <TextFade
                text="Create account"
                fromDirection="bottom"
              />
            </div>
          ) : (
            <div>
              <TextFade text="Welcome back!" fromDirection="top" />
              <TextFade
                text="Sign in to pick up from where you left"
                fromDirection="bottom"
              />
            </div>
          )}
        </div>

        <div className="auth-card">
          {isRegister ? (
            <Signup handleRegister={handleRegisterLink} />
          ) : (
            <Login handleRegister={handleRegisterLink} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserAuth;
