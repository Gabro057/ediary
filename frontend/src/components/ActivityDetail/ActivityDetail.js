import { navigate } from '@reach/router'

import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate'
import EmptyStateScreen from './EmptyStateScreen'

import xss from 'xss'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const ActivityDetail = ({ activities, showActivities, currentActivity, setCurrentActivity, reloadActivities, deleteActivity, activityId }) => {		
	if(!currentActivity) {		
		if(activityId) setCurrentActivity(activities.filter(item => item.key === Number(activityId) ? true : false)[0])		
		return <EmptyStateScreen />
	}

	const deleteCurrent = () => {
		console.info("deleteCurrent currentActivity.id", currentActivity.id)
		if (!window.confirm("Do you really want to delete this activity?")) return
		deleteActivity(currentActivity.key)
		reloadActivities()
		navigate('/activities')
		setCurrentActivity(null)
	}

	return (
		<DetailWrp className="detail" showActivities={showActivities}>			
			<Top>				
				<h1>{currentActivity.title}</h1>
				<ActivityDate datetime={currentActivity.datetime} />
			</Top>

			<ActivityLocation location={currentActivity.location} />		
			<Description dangerouslySetInnerHTML={{ __html: xss(currentActivity.description) }}></Description>
			<BtnWrapper>        
        <button onClick={deleteCurrent}>Delete activity</button>
      </BtnWrapper>
		</DetailWrp>	
	)
}

const BtnWrapper = styled.div`
  display: flex;
  justify-content: end;
	width: min(55vw, 800px);
	margin-left: 50px;

	button {
		background-color: #e64200;
	}
`
const changeActivityDetail = props =>
css`	
	display: ${props.showActivities ? "none" : "block"};	
`

const DetailWrp = styled.div`	
	grid-area: main;
	height: 100%;	
	padding-top: var(--offset, 20px);

	@media (max-width: 800px) {
		${changeActivityDetail}		
	}
`

const Top = styled.div`	
	//display: grid;
	//grid-template-columns: minmax(45vw, 600px) minmax(10vw, 150px);	
	display: flex;
	width: min(55vw, 800px);
	align-items: center;
	justify-content: space-between;
	margin-left: 50px;

	h1 {
		display: flex;
		justify-content: left;
	}
`

const Description = styled.p`	
	margin: 30px 0 0 50px;
	user-select: text;
`

export default ActivityDetail