import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders the welcome header', () => {
  render(<Home />);
  const heading = screen.getByText(/Welcome to Devfolio/i);
  expect(heading).toBeInTheDocument();
});
