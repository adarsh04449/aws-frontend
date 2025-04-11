import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const res = await axios.get(`http://18.144.47.130:3000/userProfile/${userId}`);
                    setUserDetails(res.data);
                }catch (err) {
                    console.error("Cannot fetch user details: ", err);
                }
            }
        }

        fetchUserDetails();
    }, [])
    
    return (
        <>
          <Navbar />
          <UnderlineNav aria-label="Repository">
            <UnderlineNav.Item
              aria-current="page"
              icon={BookIcon}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  textDecoration: "underline",
                  color: "white",
                },
              }}
            >
              Overview
            </UnderlineNav.Item>
    
            <UnderlineNav.Item
              onClick={() => navigate("/repo")}
              icon={RepoIcon}
              sx={{
                backgroundColor: "transparent",
                color: "whitesmoke",
                "&:hover": {
                  textDecoration: "underline",
                  color: "white",
                },
              }}
            >
              Starred Repositories
            </UnderlineNav.Item>
          </UnderlineNav>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              setCurrentUser(null);
              navigate("/auth")
              }}
              id="logout"
              style={{ position: "fixed", bottom: "50px", right: "50px" }}
          >
                Logout
          </button>

            
            <div className="profile-page-wrapper">
                <div className="user-profile-section">
                    <div className="profile-image">
                    <img
                        className="profile-image"
                        src={"https://github.com/identicons/asd.png"}
                        alt="Profile"
                        style={{objectFit:"contain"}}
                    />
                    </div>

                    <div className="name">
                      <h3>{userDetails.username}</h3>
                    </div>

                    <button className="follow-btn">Follow</button>

                    <div className="follower">
                        <p>10 Follower</p>
                        <p>3 Following</p>
                    </div>
                </div>

                <div className="heat-map-section">
                    <HeatMapProfile/>
                </div>
            </div>
        </>
    )
    
}

export default Profile;