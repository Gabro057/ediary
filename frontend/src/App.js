import { useState } from 'react';

import logo from './img/logo_w.png';
import screenshot from "./img/screenshot.png";
import './App.css';

//const [state, setstate] = useState(initialState)

const Homepage = ({ setScreen }) => {
  const runActivity = () => {
    setScreen("addActivity")
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
          <button onClick={runActivity}>Start</button>
        </div>
      </div>
    </section>
  )
}

const AddActivity = () => {
  return (
    <section className="AddActivity">
      <p>Add activity</p>
    </section>
  )
}

const App = () => {
  const [screen, setScreen] = useState('homepage')

  return (    
    <div className="App">
      <header className="top">
        <div className="logo-wrapper">
          <img src={logo} className="logo" alt="logo" />
          <div className="logo-text">eDiary</div>
        </div>
      </header>
      
      {screen === 'homepage' && <Homepage setScreen={setScreen} />}
      {screen === 'addActivity' && <AddActivity />}
      
      <footer>
        <p>© 2021 HrbekJ</p>
      </footer>
    </div>
  );
}

export default App;
