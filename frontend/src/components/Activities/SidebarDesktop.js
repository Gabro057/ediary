import { css } from '@emotion/react'
import styled from '@emotion/styled'

const DesktopMenu = ({ activities, showActivities, setCurrentActivity }) => {
	return (
		<List className="list" showActivities={showActivities}>
			{ activities.map((activity, index) => {
				return (<Item key={index} onClick={() => setCurrentActivity(activity)}>{activity.title}</Item>)
			})}				
		</List>		
	)
}

const displayList = props =>
css`		
	display: ${props.showActivities ? 'block' : 'none'};
`
const List = styled.ul`	
	grid-area: sidebar-desktop;
	border-right: 1px solid #000000;
	height: calc(100vh - 170px);	
	text-align: left;
	list-style-type: none;

	@media (max-width: 800px) {
		${displayList}
	}
`

const Item = styled.li`
	padding: var(--offset, 20px);
	border-bottom: 1px solid black;

	&:hover {
		cursor: pointer;
		background-color: lightgray;
	}
`

export default DesktopMenu