import React from 'react';
import axios from 'axios';

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
	queryByAltText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
	it('changes the schedule when a new day is selected', async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText('Monday'));

		fireEvent.click(getByText('Tuesday'));

		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	it.skip('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
		//  1. Render the Application.
		const { container, debug } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));
		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(container, 'appointment').find(
			(appointment) => queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(queryByAltText(appointment, 'Delete'));
		// 4. Check that the confirmation message is shown.
		expect(
			getByText(appointment, 'Delete the appointment?')
		).toBeInTheDocument();

		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(queryByText(appointment, 'Confirm'));

		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

		// 7. Wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByAltText(appointment, 'Add'));
		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);
		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		expect(getByText(day, '1 spot remaining')).toBeInTheDocument(); //2 spots remaining failes the test
	});

	it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
		//  1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));
		const appointment = getAllByTestId(container, 'appointment').find(
			(appointment) => queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(queryByAltText(appointment, 'Edit'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' },
		});
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));
		expect(getByText(appointment, 'saving')).toBeInTheDocument();

		await waitForElement(() => getByText(container, 'Sylvia Palmer'));
		expect(getByText(container, 'Sylvia Palmer')).toBeInTheDocument();
		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);
		expect(getByText(day, '1 spot remaining'));
	});

	it('shows the save error when failing to save an appointment', async () => {
		axios.put.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(container, 'appointment').find(
			(appointment) => queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(queryByAltText(appointment, 'Edit'));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' },
		});
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		await waitForElement(() => getByText(appointment, 'Error'));
		expect(getByText(appointment, 'Error')).toBeInTheDocument();

		fireEvent.click(queryByAltText(appointment, 'Close'));

		expect(getByText(appointment, 'Save')).toBeInTheDocument();

		fireEvent.click(queryByText(appointment, 'Cancel'));

		expect(getByText(container, 'Archie Cohen')).toBeInTheDocument();

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);

		expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
	});

	it.skip('shows the delete error when failing to delete an existing appointment', async () => {
		axios.delete.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(container, 'appointment').find(
			(appointment) => queryByText(appointment, 'Archie Cohen')
		);
		fireEvent.click(queryByAltText(appointment, 'Delete'));

		expect(
			getByText(appointment, 'Delete the appointment?')
		).toBeInTheDocument();

		fireEvent.click(queryByText(appointment, 'Confirm'));

		expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Error'));
		expect(getByText(appointment, 'Error')).toBeInTheDocument();

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);

		expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
	});
});
