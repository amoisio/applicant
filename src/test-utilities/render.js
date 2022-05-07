import { render as r } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

export const render = (ui, route = '/') => {
  window.history.pushState({}, 'Test page', { route });
  return {
    user: userEvent.setup(),
    ...r(ui, { wrapper: BrowserRouter }),
  };
};