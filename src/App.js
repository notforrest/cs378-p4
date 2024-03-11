import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, Fragment } from "react";

function App() {
    // Initialize state variables for activity and accessibility
    const [activityList, setActivityList] = useState([]);

    // Write an API call to the Bored API
    async function fetchActivityList(type = "", participants = 0) {
        try {
            let activities = [];
            while (activities.length < 10) {
                const response = await fetch(
                    `https://www.boredapi.com/api/activity${
                        type ? `?type=${type}` : ""
                    }`
                );
                const data = await response.json();

                if (!activities.includes(data.activity)) {
                    activities.push(data.activity);
                }
            }
            console.log(activities);

            // Set the state variables to the data from the API
            setActivityList(activities);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchActivityList();
    }, []);

    // Generate a random activity after pressing the button
    const generateActivityList = async (type) => {
        await fetchActivityList(type);
    };

    return (
        <div className="App">
            <div className="Page">
                <h1>Let's get unbored!</h1>
                <h2>Here are 10 random activities you could do!</h2>
                <div>
                    {activityList.map((activity, index) => {
                        return <p key={index}>{activity}</p>;
                    })}
                </div>
                <h3>
                    Click a button to generate 10 activities based on their
                    category
                </h3>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        justifyContent: "center",
                    }}
                >
                    <button
                        onClick={() => generateActivityList("social")}
                        className="socialBtn"
                    >
                        Social
                    </button>
                    <button onClick={() => generateActivityList("education")}>
                        Education
                    </button>
                    <button
                        onClick={() => generateActivityList("relaxation")}
                        className="relaxBtn"
                    >
                        Relaxation
                    </button>
                </div>
                <h3>
                    Search for an activity with a specific # of people or more
                </h3>
                <input style={{ marginBottom: "3em" }} />
            </div>
        </div>
    );
}

export default App;
