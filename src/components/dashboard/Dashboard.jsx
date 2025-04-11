import React, { useState, useEffect } from "react";
import "./dashboard.css"
import StarToggle from "./StarToggle";
import Navbar from "../Navbar";
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepos, setSuggestedRepos] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const userId = localStorage.getItem("userId");

    const deleteRepo = async(id) => {
        const userId = localStorage.getItem("userId");
        try {
            await fetch(`http://18.144.47.130:3000/repo/delete/${id}`, {
                method:"DELETE"
            });


            const response = await fetch(`http://18.144.47.130:3000/repo/user/${userId}`);
            const data = await response.json();
            setRepositories(data.repositories);
        } catch (err) {
            console.error("Error while deleting repo", err);
        }

    }


    useEffect(() => {

        const fetchRepositories = async () => {
            try {
                const response = await fetch(`http://18.144.47.130:3000/repo/user/${userId}`);

                const data = await response.json();
                setRepositories(data.repositories);
            } catch (err) {
                console.error("Error while fetching repos", err);
            }
        };


        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://18.144.47.130:3000/repo/all`);

                const data = await response.json();
                setSuggestedRepos(data);
            } catch (err) {
                console.error("Error while fetching repos", err);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);
    
    useEffect(() => {
        if (searchQuery == '') {
            setSearchResults(repositories);
        } else {
            const filteredRepo = repositories.filter((repo) => repo.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setSearchResults(filteredRepo);
        }
    },[searchQuery,repositories])

    return (
        <>
        <Navbar/>
        <section id="dashboard">
            <aside>
                <h2>Suggested Repositories</h2>
                {suggestedRepos.map((repo) => {
                    return (
                        <div key={repo._id}>
                            <h4>{repo.name} <StarToggle repoId = {repo._id} /></h4>
                            <p>{repo.description}</p>
                        </div>
                    );
                })}
            </aside>

            <main>
                <h2>Your Repositories</h2>
                <div id="search">
                    <input
                        className="search-box"   
                        type="text"
                        value={searchQuery}
                        placeholder="Search..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {searchResults.map((repo) => {
                    return (
                        <div key={repo._id}>
                            <h4 style={{ marginBottom: "4px" }}>{repo.name}
                                <button
                                    id="delete"
                                    onClick={() => deleteRepo(repo._id)}
                                >
                                    <DeleteIcon style={{ fontSize: "16px", marginRight: "4px" }} />
                                    Delete
                                </button>
                            </h4>
                            <p style={{ marginTop: "0px" }}>{repo.description}</p>
                        </div>
                    );
                })}
            </main>

            <aside>
                <h2>Upcoming events</h2>
                <ul>
                    <li><p>Tech Conference - Aug 12</p></li>
                    <li><p>React Summit - Sep 02</p></li>
                    <li><p>Diamond Hackathon - Oct 15</p></li>
                    <li><p>Research Conference - Oct 17</p></li>
                </ul>
            </aside>
            </section>
        </>
    )
}

export default Dashboard;