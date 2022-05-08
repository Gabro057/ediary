import React from 'react';
import { useState, useEffect } from 'react';
import logo from './img/logo_w.png';
import './App.css';

import { openDB } from 'idb'
//import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
import { Router, Link } from "@reach/router"
import Cookie from 'js-cookie'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag' //install also graphql

import Homepage from './components/Homepage.js'
import AddActivity from './components/AddActivity/AddActivity.js'
import Activities from './components/Activities.js'
import Register from './components/Register'
import Login from './components/Login'

import { navigate } from '@reach/router'

const storeName = 'activities'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

/*
const authLink = setContext((_, { headers }) => {
  //const token = Cookies.get('token')
  return {
    headers: { ...headers, authorization: `Bearer ${Cookie.get('token')}` }
  }
})*/

const client = new ApolloClient({
  //link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache()
})

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

const deleteActivity = async (key) => {  
  const db = await initDB()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.delete(key)
  await tx.done
}

const App = () => {
  const [activities, setActivities] = useState([])
  const [loggedIn, setLoggedIn] = useState(!!Cookie.get('signedin'))
    
  const storeActivity = async (activity) => {
    console.log('storeActivity', activity);
    
    const ADD_ACTIVITY_MUTATION = gql`
      mutation addActivity(  
        $id: Int!,      
        $title: String!,
        $description: String!,
        $datetime: String!,
        $lat: String!,
        $lng: String!
      ){
        addActivity(
          id: $id,
          title: $title,
          description: $description,
          datetime: $datetime,
          lat: $lat,
          lng: $lng
        ){   
          id       
          title
          description
          datetime
          lat
          lng
        }
      }
    `
    client.mutate({
      mutation: ADD_ACTIVITY_MUTATION,
      variables: {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        datetime: activity.datetime,
        lat: String(activity.lat),
        lng: String(activity.lng)
      }
    }).then(data => {
      console.log(data)
      navigate('/activities')
    })
  
  /*
    const db = await initDB()
    const tx = await db.transaction(storeName, 'readwrite')
    const store = await tx.objectStore(storeName)
  
    await store.put(activity)
    await tx.done*/
  }

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
      
      <ApolloProvider client={client}>
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
            loggedIn={loggedIn}
            reloadActivities={reloadActivities} 
          />
          <Register path="register" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Login path="login" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Activities 
            path="activities/*" 
            activities={activities}
            reloadActivities={reloadActivities} 
            deleteActivity={deleteActivity} 
            loggedIn={loggedIn}             
          />
        </Router>
      </ApolloProvider>

      <footer>
        <p>© 2021 HrbekJ</p>
      </footer>
    </div>
  );
}

export default App;
