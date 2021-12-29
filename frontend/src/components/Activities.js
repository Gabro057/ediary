import { useState } from 'react';
import { css } from '@emotion/react'
//import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'

const Activities = ({ activities }) => {	
	const [showActivities, setShowActivities] = useState(true)
	const [currentActivity, setCurrentActivity] = useState({})

	return (		
		<Section className="activities" showActivities={showActivities}>
			<List className="list" showActivities={showActivities}>
				{ activities.map((activity, index) => {
					return (<Item key={index} onClick={() => setCurrentActivity(activity)}>{activity.title}</Item>)
				})}				
			</List>
			<ListM>
				<MenuToggle onClick={() => { setShowActivities(!showActivities) }}>								
					<SpanX></SpanX>
					<SpanX></SpanX>
					<SpanX></SpanX>
				</MenuToggle>
			</ListM>
			<Detail className="detail">
				<h1>{currentActivity.title}</h1>
				<p>{currentActivity.description}</p>
			</Detail>
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
const ListM = styled.div`	
	grid-area: sidebar-mobile;
	border-right: 1px solid #000000;
	height: calc(100vh - 170px);	
	text-align: left;
	list-style-type: none;

	@media (min-width: 800px) {
		display: none;
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

const Detail = styled.div`
	//min-width: 70vw;
	grid-area: main;
	height: 100%;
	//background-color: blue;
	padding-top: var(--offset, 20px);
`

const MenuToggle = styled.div`
	display: block;
	padding: 20px 0 0 20px;
`

const SpanX = styled.span`
	position: relative;
	display: block;
	width: 33px;
	height: 4px;
	margin-bottom: 5px;
	background: gray;
	border-radius: 3px;
	z-index: 1;
`


export default Activities