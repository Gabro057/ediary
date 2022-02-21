import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate'

import styled from '@emotion/styled'

const ActivityDetail = ({ currentActivity }) => {	
	console.log("ActivityDetail currentActivity", currentActivity)

	if(!currentActivity) {
		return (
			<div></div>
		)
	}

	return (
		<DetailWrp className="detail">
			<Top>				
				<h1>{currentActivity.title}</h1>					
				
				<ActivityDate datetime={currentActivity.datetime} />
			</Top>

			<ActivityLocation location={currentActivity.location} />		
			<Description>{currentActivity.description}</Description>
		</DetailWrp>	
	)
}

const DetailWrp = styled.div`	
	grid-area: main;
	height: 100%;	
	padding-top: var(--offset, 20px);
`

const Top = styled.div`	
	display: grid;
	grid-template-columns: minmax(50vw, 700px) minmax(20vw, 200px);	
	align-items: center;
	margin-left: 50px;

	h1 {
		display: flex;
		justify-content: left;
	}
`

const Description = styled.p`	
	margin: 30px 0 0 50px;
`

export default ActivityDetail