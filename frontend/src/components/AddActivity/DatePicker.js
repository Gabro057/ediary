import { useState } from 'react';
import styled from '@emotion/styled'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const DatePicker = () => {
	const [selectedDate, handleDateChange] = useState(new Date());

	return (
		<div>
			<h2>DATE PICKER</h2>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DateTimePicker value={selectedDate} onChange={handleDateChange} />
			</MuiPickersUtilsProvider>
		</div>
	)	
}


export default DatePicker