import styled from '@emotion/styled'
//import { MonthSelection } from '@material-ui/pickers/views/Month/MonthView'

const ActivityDate = ({ datetime }) => {
	const timeFormat = date => {
		let hours = date.getHours()
		let minutes = date.getMinutes()
		const ampm = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12
		hours = hours ? hours : 12
		minutes = minutes < 10 ? '0'+minutes : minutes
		return hours + ':' + minutes + ' ' + ampm		
	}

	const monthNames = [
		'JAN', 'FEB', 'MAR',
		'APR', 'MAY', 'JUN',
		'JUL', 'AUG', 'SEP',
		'OCT', 'NOV', 'DEC'
	]

	return (
		<div>
			<Day>
				{ datetime.getDate() }	
			</Day>
			<Month>
				{ monthNames[datetime.getMonth()] }
			</Month>
			<Time>
				{ timeFormat(datetime) }	
			</Time>
		</div>		
	)	
	}

	const Day = styled.div`	
		font-size: 4rem;
	`

	const Month = styled.div`	
		font-size: 2rem;
	`

	const Time = styled.div`	
		font-size: 1.5rem;
	`

export default ActivityDate