import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./auth.css";

import logo from "../../assets/github.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    // useEffect(() => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     setCurrentUser(null);
    // });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("18.144.47.130:3000/login",
                {
                    email: email,
                    password: password
                }
            );
            
            const token = res.data.token;
            const userId = res.data.userId;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            setLoading(false);
            setCurrentUser(userId); 
            navigate("/");
        } catch (err) {
            console.error(err)
            alert("SignIn Failed");
            setLoading(false);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className= "logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <Box sx={{ padding: 1, fontSize:"2rem", fontWeight:"500"}}>
                        Sign In
                    </Box>
                </div>

                <div className="login-box">
                    <div>
                        <label className="label">Email address</label>
                        <input
                            type="email"
                            name="Email"
                            id="Email"
                            className="input"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                        
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="Password"
                            id="Password"
                            className="input"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />                
                    </div>

                    <Button
                        variant="contained"
                        color="success"
                        className="login-btn"
                        onClick={handleLogin}
                        disabled={loading}
                        sx={{ textTransform: "none" }} 
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </Button>
                </div>

                <div className="pass-box">
                    <p>
                        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
    
}

export default Login;