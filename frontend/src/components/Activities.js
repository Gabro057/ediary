import React from 'react';
import { useState } from 'react';
import { css } from '@emotion/react'
//import { css, jsx } from '@emotion/react'
import { Router, navigate } from "@reach/router"
import styled from '@emotion/styled'
// Components
import ActivityDetail from './ActivityDetail/ActivityDetail.js'
import EmptyStateScreen from './ActivityDetail/EmptyStateScreen'
import ActivitiesList from './Activities/ActivitiesList.js'
import MobileMenu from './Activities/SidebarMobile.js'

const Activities = ({ activities, deleteActivity, reloadActivities, loggedIn, rerender }) => {	
	const [showActivities, setShowActivities] = useState(false)
	const [currentActivity, setCurrentActivity] = useState(null)

	if(!loggedIn) {
    navigate('/login')
   // return (<div></div>)
  }

	return (		
		<Section className="activities" showActivities={showActivities}>
			<ActivitiesList 
				activities={activities} 
				showActivities={showActivities} 
				setShowActivities={setShowActivities}
				setCurrentActivity={setCurrentActivity}
				loggedIn={loggedIn}				
			/>
			<MobileMenu showActivities={showActivities} setShowActivities={setShowActivities} />				
			
			<Router>
				<ActivityDetail 
					activities={activities}
					showActivities={showActivities} 
					setCurrentActivity={setCurrentActivity}
					currentActivity={currentActivity} 
					deleteActivity={deleteActivity}
					reloadActivities={reloadActivities} 
					path="/:activityId"
				/>

			<EmptyStateScreen path="/" />
			</Router>
		</Section>
	)
}

const changeGridArea = props =>
css`	
	grid-template-areas: "sidebar-mobile ${props.showActivities ? 'sidebar-desktop' : 'main'}";
	//grid-template-areas: "sidebar-mobile sidebar-desktop";
`

const Section = styled.section`
	display: grid;	
	grid-template-columns: 300px 1fr;
	grid-template-areas: "sidebar-desktop main";
	//padding-top: 120px;
	width: 100%;
	height: 100%;
	//height: calc(100vh - 170px);

	@media (max-width: 800px) {
		grid-template-columns: 80px 1fr;
		${changeGridArea}		
	}
`

export default Activities