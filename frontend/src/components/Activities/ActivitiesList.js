import { css } from '@emotion/react'
import { navigate } from '@reach/router'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import styled from '@emotion/styled'

const ActivitiesList = ({ activities, showActivities, setShowActivities, setCurrentActivity, loggedIn }) => {
	const monthNames = [
		'JAN', 'FEB', 'MAR',
		'APR', 'MAY', 'JUN',
		'JUL', 'AUG', 'SEP',
		'OCT', 'NOV', 'DEC'
	]

	/*query={gql`{todos { id name }}`}*/
	return (
		<Menu showActivities={showActivities}>
			<Query query={
				gql`{ 
					activities { 
						id
						title 
						lat
						lng
						description
						datetime
					}}`
				}> 
				{({ loading, error, data }) => {
					if(loading) return <p>Loading ...</p>
					if(error) {
						console.error("error", error)
						//navigate('/')
						return <p></p>
					}
					if(!data || !data.activities) return ''
					return <ul>{data.activities.map((activity, index) => 							
									{
										activity.datetime = new Date(activity.datetime)
										return (
										<Item key={index} onClick={() => {
												navigate('/activities/' + activity.id || activity.key)
												setCurrentActivity(activity)
												setShowActivities(false)
										}}>								
											<div>
												<Day>
													{ activity.datetime && activity.datetime.getDate() }	
												</Day>
												<Month>
													{ activity.datetime && monthNames[activity.datetime.getMonth()] }
												</Month>								
											</div>
											<Title>
												{activity.title}
											</Title>
										</Item>
									)}
						)}</ul>
				}}
			</Query>
				
			<AddBtnWrp>
				<button onClick={() => { 
					if(!loggedIn) {
						navigate('/register')
						return 	
					}
					navigate('/add-activity') 
				}}>ADD</button>				
			</AddBtnWrp>
		</Menu>
	)
}

/*
<List className="list" showActivities={showActivities}>
				{ activities.map((activity, index) => {
						return (
							<Item key={index} onClick={() => {
									navigate('/activities/' + activity.key)
									setCurrentActivity(activity)
									setShowActivities(false)
							}}>								
								<div>
									<Day>
										{ activity.datetime && activity.datetime.getDate() }	
									</Day>
									<Month>
										{ activity.datetime && monthNames[activity.datetime.getMonth()] }
									</Month>								
								</div>
								<Title>
									{activity.title}
								</Title>
							</Item>
						)
					}
				)}				
			</List>	
*/

const disp = props =>
css`		
	display: ${props.showActivities ? "grid" : "none"};
`

const Menu = styled.div`	
	//display: grid;
	grid-template-rows: auto 100px;
	grid-area: sidebar-desktop;
	border-right: 1px solid #000000;
	height: calc(100vh - 170px);	
	text-align: left;
	overflow: auto;

	@media (max-width: 800px) {
		${disp}
	}
`

const List = styled.ul`		
	list-style-type: none;	
`

const Item = styled.li`
	display: grid;
	grid-template-columns: 50px auto;
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

const Title = styled.div`	
	font-size: 1.5rem;
`

const Day = styled.div`	
	font-size: 2rem;
`

const Month = styled.div`	
	font-size: 1rem;
`

export default ActivitiesList