import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

//stores all conditionals for changing state as well as save and delete behavior
export default function Appointment(props) {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';
	const CONFIRM = 'CONFIRM';
	const EDIT = 'EDIT';
	const DELETING = 'DELETING';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';

	//set mode
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	//function to save interview with error handling
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch(() => transition(ERROR_SAVE, true));
	}
	//function to delete appointment
	function remove() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE, true));
	}

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					interview={props.interview}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}

			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onCancel={back}
					bookInterview={props.bookInterview}
					onSave={save}
				/>
			)}
			{mode === SAVING && <Status message='saving' />}
			{mode === CONFIRM && <Confirm onConfirm={remove} onCancel={back} />}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
			{mode === DELETING && <Status message='Deleting' />}
			{mode === ERROR_SAVE && (
				<Error message='Could not Save Appointment.' onClose={back} />
			)}
			{mode === ERROR_DELETE && (
				<Error message='Could not Cancel Appointment.' onClose={back} />
			)}
		</article>
	);
}
