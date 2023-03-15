import React from 'react';
import DayListItem from './DayListItem';

//component holds list of days available and spots available
export default function DayList(props) {
	const { days } = props;
	const dayListData = days.map((day) => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.value}
				setDay={props.onChange}
			/>
		);
	});
	return <ul>{dayListData}</ul>;
}
