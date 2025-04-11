import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StarToggle = ({repoId}) => {
    const [starred, setStarred] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchStarStatus = async () => {
            try {
                const res = await axios.get(`18.144.47.130:3000/${userId}`);
                setStarred(res.data.starRepos.includes(repoId));
            } catch (err) {
                console.error("Error fetching star status", err);
            }
        }
        fetchStarStatus();
    }, [userId, repoId]);

    const toggleStar = async() => {
        try {
            const res = await axios.patch(`18.144.47.130:3000/user/toggleStar`, {
                userId,
                repoId
            });

            setStarred(res.data.starred);
        } catch (err) {
            console.error("Error toggling star", err);
        }
    }

    return (
        <button onClick={toggleStar} style={{
            background: "none",
            border: "none",
            padding: 0,
            marginLeft: "8px",
            outline:"none"
        }}>
            {starred ? <StarIcon  /> : <StarOutlineIcon />}
        </button>
    )
};

export default StarToggle;