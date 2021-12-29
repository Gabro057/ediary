import styled from '@emotion/styled'

const Detail = ({ currentActivity }) => {	
	return (
		<DetailWrp className="detail">
			<h1>{currentActivity.title}</h1>
			<p>{currentActivity.description}</p>
		</DetailWrp>	
	)
}

const DetailWrp = styled.div`	
	grid-area: main;
	height: 100%;	
	padding-top: var(--offset, 20px);
`

export default Detail