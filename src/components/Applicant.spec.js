import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '../test-utilities/render';
import Applicant from './Applicant';
import Footer from './shared/Footer';

describe('Applicant main page', () => {
  it('should render application title', () => {
    const title = 'Applicant title';

    render(<Applicant title={title} />);

    screen.getByText(title);
  });
});
