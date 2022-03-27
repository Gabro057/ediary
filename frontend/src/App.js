import { useState, useEffect } from 'react';
import logo from './img/logo_w.png';
import './App.css';

import { openDB } from 'idb'
//import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
import { Router, Link } from "@reach/router"

import Homepage from './components/Homepage.js'
import AddActivity from './components/AddActivity/AddActivity.js'
import Activities from './components/Activities.js'
import Login from './components/Login'

const storeName = 'activities'

//const activities = []
const initDB = async () => {
  const dbName = 'ediary.cz'  
  const version = 1
  const db = await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction){
      db.createObjectStore(storeName, { autoIncrement: true })
    }
  })
  
  return db
}

const initActivities = async () => {
  console.info("initActivities")
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readonly')
  const activities = tx.objectStore('activities').getAll()
  await tx.done

  console.info(">initActivities activities", activities)
  return activities
}

const initKeys = async () => {
  console.info("initKeys")
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readonly')
  const keys = tx.objectStore('activities').getAllKeys()
  await tx.done

  console.info(">initKeys keys", keys)
  return keys
}

const getActivities = async () => {
  let activities = await initActivities()
  let keys = await initKeys()
  
  activities.forEach((activity, index) => {
    activity.key = keys[index]
  })
  
  //sort the activities
  activities.sort((a, b) => {
    return new Date(b.datetime) - new Date(a.datetime)
  })

  console.info("activities", activities)

  return activities
}

const storeActivity = async (activity) => {
  console.log('storeActivity', activity);
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.put(activity)
  await tx.done
}

const deleteActivity = async (key) => {  
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.delete(key)
  await tx.done
}

const App = () => {
  const [activities, setActivities] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const reloadActivities = async () => {
    const act = await getActivities()  
    console.info("act", act)    
    setActivities(act)
  }
  
  useEffect(() => {
    (async () => {
      reloadActivities()     
    })()    
  }, [])

  return (    
    <div className="App">
      <header className="top">
        <div className="logo-wrapper">
          <img src={logo} className="logo" alt="logo" />
          <div className="logo-text">eDiary</div>
        </div>
      </header>
      
      <Router>
        <Homepage path="/" />
        <AddActivity path="add-first-activity" 
          comingFromHomepage 
          storeActivity={storeActivity} 
          initActivities={initActivities} 
          setActivities={setActivities} 
          activities={activities} 
          reloadActivities={reloadActivities}  
        />
        <AddActivity path="add-activity" 
          storeActivity={storeActivity} 
          initActivities={initActivities} 
          setActivities={setActivities} 
          activities={activities}  
          reloadActivities={reloadActivities} 
        />
        <Login path="login" />
        <Activities path="activities/*" 
          activities={activities} 
          reloadActivities={reloadActivities} 
          deleteActivity={deleteActivity} 
          loggedIn={loggedIn} 
        />
      </Router>

      <footer>
        <p>© 2021 HrbekJ</p>
      </footer>
    </div>
  );
}

export default App;
