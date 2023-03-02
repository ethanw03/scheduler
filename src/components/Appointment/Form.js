import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [name, setName] = useState(props.name || '');
	const [error, setError] = useState('');

	const reset = function () {
		setName('');
		setInterviewer(null);
	};
	const cancel = function () {
		reset();
		props.onCancel();
	};

	function validate() {
		if (name === '') {
			setError('Student name cannot be blank');
			return;
		}

		props.onSave(name, interviewer);
	}

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={name}
						onChange={(event) => setName(event.target.value)}
						data-testid='student-name-input'
					/>
					<section className='appointment__validation'>{error}</section>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					interviewer={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={(event) => validate()}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
