import { useState, useEffect } from 'react';
import logo from './img/logo_w.png';
import './App.css';
import Homepage from './components/Homepage.js'
import AddActivity from './components/AddActivity.js'
import Activities from './components/Activities.js'
import { openDB } from 'idb'

const storeName = 'activities'

/**
 * TODO time: 4:40 
 */

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

const storeActivity = async (activity) => {
  console.log('storeActivity', activity);
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.put(activity)
  await tx.done
}

const App = () => {
  const [screen, setScreen] = useState('addActivity')
  const [activities, setActivities] = useState([])
  //const activities = initActivities()
  useEffect(() => {
    (async () => {
      let act = await initActivities()
      console.info("activities", act)
      setActivities(act)      
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
      
      {screen === 'homepage' && <Homepage setScreen={setScreen} />}
      {screen === 'addActivity' && <AddActivity setScreen={setScreen} storeActivity={storeActivity} initActivities={initActivities} setActivities={setActivities} activities={activities}  />}
      {screen === 'activities' && <Activities setScreen={setScreen} activities={activities} />}
      
      <footer>
        <p>© 2021 HrbekJ</p>
      </footer>
    </div>
  );
}

export default App;
