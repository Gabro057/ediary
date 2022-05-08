import React from 'react';
import styled from '@emotion/styled'

const MobileMenu = ({ showActivities, setShowActivities }) => {
	return (				
		<ListM>
			<MenuToggle onClick={() => { setShowActivities(!showActivities) }}>								
				<SpanX></SpanX>
				<SpanX></SpanX>
				<SpanX></SpanX>
			</MenuToggle>
		</ListM>			
	)
}

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


export default MobileMenu