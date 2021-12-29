import { useState } from 'react';
import { css } from '@emotion/react'
//import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
// Components
import Detail from './Activities/Detail.js'
import DesktopMenu from './Activities/SidebarDesktop.js'
import MobileMenu from './Activities/SidebarMobile.js'

const Activities = ({ activities }) => {	
	const [showActivities, setShowActivities] = useState(true)
	const [currentActivity, setCurrentActivity] = useState({})

	return (		
		<Section className="activities" showActivities={showActivities}>
			<DesktopMenu activities={activities} showActivities={showActivities} setCurrentActivity={setCurrentActivity} />
			<MobileMenu showActivities={showActivities} setShowActivities={setShowActivities} />				
			<Detail currentActivity={currentActivity} />
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