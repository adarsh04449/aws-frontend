import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createrepoform.css"; 
import Navbar from "../Navbar";


const CreateRepoForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const navigate = useNavigate();
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");

        try {
            const response = await axios.post("http://18.144.47.130:3000/repo/create", {
                name,
                description,
                visibility: visibility === "public",
                owner: userId,
            });

            setName("");
            setDescription("");
            setVisibility("public");
            navigate("/")
        
        } catch (err) {
            console.error("Error creating repository:", err);
        }
    };

        return (
            <>
            <Navbar />
            <div className="create-repo-container">
            <form onSubmit={handleSubmit} className="github-form">
                <h2>Create a new repository</h2>

                <div className="form-row">
                <label>Repository name <span className="required">*</span></label>
                <input
                    type="text"
                    value={name}
                    placeholder="e.g., my-awesome-project"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="form-row">
                <label>Description <span className="optional">(optional)</span></label>
                <textarea
                    value={description}
                    placeholder="Write a short description..."
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                <div className="form-row">
                <label>Visibility</label>
                <div className="radio-group">
                    <label>
                    <input
                        type="radio"
                        value="public"
                        checked={visibility === "public"}
                        onChange={() => setVisibility("public")}
                    />
                    Public – Anyone can see this repository
                    </label>
                    <label>
                    <input
                        type="radio"
                        value="private"
                        checked={visibility === "private"}
                        onChange={() => setVisibility("private")}
                    />
                    Private – Only you can access this
                    </label>
                </div>
                </div>

                <div className="form-footer">
                <button type="submit">Create repository</button>
                </div>
            </form>
            </div>
        </>
    );
};

export default CreateRepoForm;
