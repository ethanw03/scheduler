import React from 'react';
import DayList from './DayList';
import 'components/Application.scss';
import Appointment from './Appointment';
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from '../helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();

	let appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);
	//find the interview data for specific day
	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);

		//props
		return (
			<Appointment
				{...appointment}
				key={appointment.id}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	return (
		<main className='layout' data-testid='appointment'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList
						days={state.days}
						value={state.day}
						onChange={setDay}
						bookInterview={bookInterview}
						cancelInterview={cancelInterview}
					/>
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{schedule}
				<Appointment
					key='last'
					time='5pm'
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
				/>
			</section>
		</main>
	);
}
