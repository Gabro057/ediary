import React from 'react';
import { navigate } from '@reach/router'
import screenshot from "../img/screenshot.png";

const Homepage = () => {
  const addActivity = () => {
    navigate("/add-first-activity")
  }

  const showRegistration = () => {
    navigate("/register")
  }
  
  return (
    <section className="Homepage">
      <div className="container">
        <div className="left">
          <img src={screenshot} className="screenshot" alt="screenshot" />
        </div>
        <div className="right">
          <p>
            Log your daily activities in this fun to use app!
          </p>
          <button onClick={addActivity}>Start</button>
        </div>
      </div>
    </section>
  )
}

export default Homepage

