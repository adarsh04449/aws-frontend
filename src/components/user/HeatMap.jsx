import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityDate = (startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    let end = new Date(endDate);

    while (currentDate <= end) {
        const count = Math.floor(Math.random() * 50);
        data.push({
            date: currentDate.toISOString().split('T')[0],
            count: count,
        })

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

const getPanelColors = (maxCount) => {
    const colors = {};
    for (let i = 0; i <= maxCount; i++) {
        const greenValue = Math.floor((i / maxCount) * 255);
        colors[i] = `rgb(0,${greenValue},0)`
    }

    return colors;
}

const HeatMapProfile = () => {
    const [activityData, setActivityData] = useState([]);
    const [panelColors, setPanelColors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const startDate = "2025-01-01";
            const endDate = "2025-02-28";
            const data = generateActivityDate(startDate, endDate);
            setActivityData(data);

            const maxCount = Math.max(...data.map((d) => d.count));
            setPanelColors(getPanelColors(maxCount));
        }
        fetchData();
    },[]);

    return (
        <div>
            <h4 className="heatmap-title">Recent Contributions</h4>
            
            <HeatMap
                className="HeatMapProfile"
                style={{ maxWidth: "700px", height: "200px", color: "white" }}
                value={activityData}
                weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                startDate={new Date("2025-01-01")}
                rectSize={20}
                space={4}
                rectProps={{
                    rx: 2.5,
                }}
                panelColors={panelColors}
                legendCellSize={0}
            />
        </div>
    )

}

export default HeatMapProfile;