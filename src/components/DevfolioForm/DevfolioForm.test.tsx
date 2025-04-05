import { render, screen, fireEvent } from '@testing-library/react';
import DevfolioForm from './DevfolioForm';
import { useDevfolioStore } from '../../store/useDevfolioStore';

beforeEach(() => {
  // Reset Zustand store before each test
  const { resetProjects, setName, setEmail, setBio, setSkills } = useDevfolioStore.getState();
  resetProjects();
  setName('');
  setEmail('');
  setBio('');
  setSkills([]);
});

describe('DevfolioForm', () => {
  test('renders all input fields', () => {
    render(<DevfolioForm />);
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Write a short bio/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E.g. React, TypeScript, CSS/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Project Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Project Description/i)).toBeInTheDocument();
  });

  test('can add and remove project fields', () => {
    render(<DevfolioForm />);
    const addBtn = screen.getByText(/Add Project \+/i);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);

    const projectTitles = screen.getAllByPlaceholderText('Project Title');
    expect(projectTitles.length).toBe(3);

    const removeButtons = screen.getAllByText('x');
    fireEvent.click(removeButtons[0]);

    const remainingProjects = screen.getAllByPlaceholderText('Project Title');
    expect(remainingProjects.length).toBe(2);
  });

  test('submits form with valid data', () => {
    render(<DevfolioForm />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Pravesh' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'pravesh@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Write a short bio/i), {
      target: { value: 'Frontend Developer' },
    });
    fireEvent.change(screen.getByPlaceholderText(/E.g. React, TypeScript, CSS/i), {
      target: { value: 'React, Tailwind' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Project Title/i), {
      target: { value: 'Devfolio' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Project Description/i), {
      target: { value: 'A portfolio builder for developers.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // check if form resets
    expect(screen.getByPlaceholderText(/Enter your name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Project Title/i)).toHaveValue('');
  });

  test('shows alert if form is incomplete', () => {
    window.alert = jest.fn();
    render(<DevfolioForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(window.alert).toHaveBeenCalledWith('All fields are required.');
  });
});
