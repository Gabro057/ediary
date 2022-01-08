import { useState } from 'react';
import { css } from '@emotion/react'
//import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
// Components
import ActivityDetail from './ActivityDetail/ActivityDetail.js'
import ActivitiesList from './Activities/ActivitiesList.js'
import MobileMenu from './Activities/SidebarMobile.js'

const Activities = ({ activities, setScreen }) => {	
	const [showActivities, setShowActivities] = useState(false)
	const [currentActivity, setCurrentActivity] = useState(null)

	return (		
		<Section className="activities" showActivities={showActivities}>
			<ActivitiesList 
				activities={activities} 
				showActivities={showActivities} 
				setShowActivities={setShowActivities} 
				setCurrentActivity={setCurrentActivity} 
				setScreen={setScreen}
			/>
			<MobileMenu showActivities={showActivities} setShowActivities={setShowActivities} />				
			<ActivityDetail currentActivity={currentActivity} />
		</Section>
	)
}

const changeGridArea = props =>
css`	
	grid-template-areas: "sidebar-mobile ${props.showActivities ? 'sidebar-desktop' : 'main'}";
`

const Section = styled.section`
	display: grid;	
	grid-template-columns: 300px 1fr;
	grid-template-areas: "sidebar-desktop main";
	padding-top: 120px;
	width: 100%;
	height: calc(100vh - 170px);

	@media (max-width: 800px) {
		grid-template-columns: 80px 1fr;
		${changeGridArea}		
	}
`

export default Activities