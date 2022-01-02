import { css } from '@emotion/react'
import styled from '@emotion/styled'

const ActivitiesList = ({ setScreen, activities, showActivities, setShowActivities, setCurrentActivity }) => {
	return (
		<Menu>
			<List className="list" showActivities={showActivities}>
				{ activities.map((activity, index) => {
					return (<Item key={index} onClick={
						() => {
							setCurrentActivity(activity)
							setShowActivities(false)
						}
					}>{activity.title}</Item>)
				})}				
			</List>		
			<AddBtnWrp>
				<button onClick={() => { setScreen('addActivity') }}>ADD</button>				
			</AddBtnWrp>
		</Menu>
	)
}

const displayList = props =>
css`		
	display: ${props.showActivities ? 'block' : 'none'};
`

const Menu = styled.div`	
	display: grid;
	grid-template-rows: auto 100px;
	grid-area: sidebar-desktop;
	border-right: 1px solid #000000;
	height: calc(100vh - 170px);	
	text-align: left;

	@media (max-width: 800px) {
		${displayList}
	}
`

const List = styled.ul`		
	list-style-type: none;	
`

const Item = styled.li`
	padding: var(--offset, 20px);
	border-bottom: 1px solid black;

	&:hover {
		cursor: pointer;
		background-color: lightgray;
	}
`

const AddBtnWrp = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	button {
		font-size: 2rem;
	}
`

export default ActivitiesList