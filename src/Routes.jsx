import React, {useEffect} from "react";
import { useNavigate, useRoutes} from "react-router-dom"

//Pages list
import Dashboard from "../src/components/dashboard/Dashboard";
import Profile from "../src/components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

//Auth Context
import { useAuth } from "./authContext";
import CreateRepoForm from "./components/repo/CreateRepoForm";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && window.location.pathname == "/auth") {
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element:<Dashboard/>
        },
        {
            path: "/auth",
            element:<Login/>
        },
        {
            path: "/signup",
            element:<Signup/>
        },
        {
            path: "/profile",
            element:<Profile/>
        },
        {
            path: "/create",
            element:<CreateRepoForm/>
        }
    ])

    return element;
}

export default ProjectRoutes;