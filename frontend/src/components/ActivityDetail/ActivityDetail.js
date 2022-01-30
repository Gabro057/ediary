import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate'

import styled from '@emotion/styled'

const ActivityDetail = ({ currentActivity }) => {	
	console.log("ActivityDetail currentActivity", currentActivity)

	if(currentActivity == null) {
		return (
			<div></div>
		)
	}

	return (
		<DetailWrp className="detail">
			<h1>{currentActivity.title}</h1>			
			
			<ActivityDate />
			<ActivityLocation location={currentActivity.location} />			
			<p>{currentActivity.description}</p>
		</DetailWrp>	
	)
}

const DetailWrp = styled.div`	
	grid-area: main;
	height: 100%;	
	padding-top: var(--offset, 20px);
`

export default ActivityDetail