import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, Fragment } from "react";

function App() {
    // Initialize state variables for activity and accessibility
    const [activityList, setActivityList] = useState([]);
    const [category, setCategory] = useState("");
    const [maxAccessLevel, setMaxAccessLevel] = useState(1);
    const [specificSelected, setSpecificSelected] = useState(false);

    // Write an API call to the Bored API
    async function fetchActivityList(type) {
        try {
            let activities = [];
            while (activities.length < 10) {
                const response = await fetch(
                    `https://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=${maxAccessLevel}${
                        type ? `&type=${type}` : ""
                    }`
                );

                const data = await response.json();

                if (!activities.includes(data.activity)) {
                    activities.push([data.activity, data.accessibility]);
                }
            }
            console.log(activities);

            // Set the state variables to the data from the API
            setActivityList(activities);
            console.log(activityList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchActivityList();
    }, []);

    // Generate a random activity after pressing the button
    const generateActivityList = async (type = "") => {
        await fetchActivityList(type);

        switch (type) {
            case "social":
                setCategory("social");
                break;
            case "education":
                setCategory("educational");
                break;
            case "relaxation":
                setCategory("relaxing");
                break;
            default:
                setCategory("");
                break;
        }
    };

    return (
        <div className="App">
            <div className="Page">
                <h1>Let's get unbored!</h1>
                {specificSelected ? (
                    <h2>
                        Here are 10 activities at an accessibility level of{" "}
                        {maxAccessLevel} or less!
                    </h2>
                ) : (
                    <h2>Here are 10 {category} activities you could do!</h2>
                )}
                <div>
                    {activityList.map((activity, index) => {
                        return (
                            <p key={index}>
                                {activity[0] + ` (${activity[1]})`}
                            </p>
                        );
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
                    Search for an activity with a specific accessibility level
                    or less (0.00 - 1.00)
                </h3>
                <div
                    style={{
                        alignItems: "center",
                        display: "flex",
                        gap: "1em",
                        justifyContent: "center",
                        marginBottom: "2em",
                    }}
                >
                    <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="1"
                        onChange={(e) => setMaxAccessLevel(e.target.value)}
                    />
                    <button
                        className="pplBtn"
                        onClick={() => {
                            generateActivityList();
                            setSpecificSelected(true);
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
