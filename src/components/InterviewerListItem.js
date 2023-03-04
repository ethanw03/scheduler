import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

//function displays data for interviewers available
export default function InterviewerListItem(props) {
	const interviewerListItemClass = classNames('interviewers__item', {
		'interviewers__item--selected': props.selected,
	});

	return (
		<li
			className={interviewerListItemClass}
			onClick={props.setInterviewer}
			selected={props.selected}>
			<img
				className='interviewers__item-image'
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
}
