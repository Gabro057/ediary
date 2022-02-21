//import { useState } from 'react';
import styled from '@emotion/styled'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const DatePicker = ({ datetime, setDatetime }) => {
	//const [selectedDate, handleDateChange] = useState(new Date());
	const setNewDatetime = newDatetime => {
		setDatetime(newDatetime.toDate())
	}

	return (
		<DateWrapper>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DateTimePicker value={datetime} onChange={setNewDatetime} />
			</MuiPickersUtilsProvider>
		</DateWrapper>
	)	
}

const DateWrapper = styled.section`
	margin-top: 1rem;
`

export default DatePicker