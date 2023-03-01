import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	//sets the day for useState
	const setDay = (day) => {
		return setState({ ...state, day });
	};

	useEffect(() => {
		const dayURL = 'http://localhost:8001/api/days';
		const appointmentURL = 'http://localhost:8001/api/appointments';
		const interviewersURL = 'http://localhost:8001/api/interviewers';

		Promise.all([
			axios.get(dayURL),
			axios.get(appointmentURL),
			axios.get(interviewersURL),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	//function that  books interview
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const url = `http://localhost:8001/api/appointments/${id}`;

		//save data to API endpoint
		let req = {
			url,
			method: 'PUT',
			data: appointment,
		};
		return axios(req).then((response) => {
			setState({ ...state, appointments });
		});
	}

	//function that cancels interview
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const url = `http://localhost:8001/api/appointments/${id}`;

		//delete data from api endpoint
		let req = {
			url,
			method: 'DELETE',
			data: appointment,
		};
		return axios(req).then((response) => {
			console.log('response from delete axios', response);
			setState({ ...state, appointments });
		});
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
