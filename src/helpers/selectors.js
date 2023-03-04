//function that gets list of all appointments for specific day
export function getAppointmentsForDay(state, name) {
	const daysFiltered = state.days.filter((day) => day.name === name);

	if (state.days.length === 0 || daysFiltered.length === 0) {
		return [];
	}

	const daysAppointments = daysFiltered[0].appointments;

	let appointmentsFiltered = [];

	for (let appointment of daysAppointments) {
		appointmentsFiltered.push(state.appointments[appointment]);
	}
	return appointmentsFiltered;
}

//function gets individual interview if booked
export function getInterview(state, interview) {
	if (!interview) return null;

	const interviewFiltered = {};

	interviewFiltered.student = interview.student;

	interviewFiltered.interviewer = state.interviewers[interview.interviewer];

	return interviewFiltered;
}

//function that gets all interviewers for specific day
export function getInterviewersForDay(state, name) {
	const daysFiltered = state.days.filter((day) => day.name === name);

	if (state.days.length === 0 || daysFiltered.length === 0) {
		return [];
	}

	const interviewersFromDays = daysFiltered[0].interviewers;

	let interviewersFiltered = [];

	for (let interviewer of interviewersFromDays) {
		interviewersFiltered.push(state.interviewers[interviewer]);
	}
	return interviewersFiltered;
}
