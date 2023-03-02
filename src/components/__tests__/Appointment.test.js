import React from 'react';
import { render } from '@testing-library/react';

import Appointment from 'components/Appointment/index';
import Form from 'components/Appointment/Form';

describe('Appointment', () => {
	it('renders without crashing', () => {
		render(<Appointment />);
	});
});
