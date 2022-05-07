import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '../../test-utilities/render';
import ApplicationTitle from './ApplicationTitle';

describe('Applicantion title', () => {
  it('should render its contents', () => {
    const title = 'My application title';

    render(
      <ApplicationTitle>
        <p>{title}</p>
      </ApplicationTitle>
    );

    screen.getByText(title);
  });
});
