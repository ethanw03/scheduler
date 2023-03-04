import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem.js';
import PropTypes from 'prop-types';

function InterviewerList(props) {
	const { interviewers } = props;

	//returns all data needed to display interview list
	const interviewersListData = interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={props.interviewer === interviewer.id}
				setInterviewer={(event) => {
					props.onChange(interviewer.id);
				}}
			/>
		);
	});

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{interviewersListData}</ul>
		</section>
	);
}

//ensures that array is passed as prop
InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
