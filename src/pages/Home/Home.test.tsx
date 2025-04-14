import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { useDevfolioStore } from '../../store/useDevfolioStore';

describe('Home Page', () => {
  beforeEach(() => {
    useDevfolioStore.setState({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'A frontend dev from Earth',
      skills: ['React', 'Zustand'],
    });
  });

  test('renders the form inputs', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Write a short bio/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E.g. React, TypeScript, CSS/i)).toBeInTheDocument();
  });

  test('updates preview when form inputs change', () => {
    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Write a short bio'), {
      target: { value: 'Loves to build apps with React' },
    });
    fireEvent.change(screen.getByPlaceholderText('E.g. React, TypeScript, CSS'), {
      target: { value: 'React, Zustand' },
    });

    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getAllByText('john@example.com').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Loves to build apps with React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Zustand').length).toBeGreaterThan(0);
  });
});
