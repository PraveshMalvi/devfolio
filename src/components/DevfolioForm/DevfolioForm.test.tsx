import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DevfolioForm from './DevfolioForm';
import { useDevfolioStore } from '../../store/useDevfolioStore';

beforeEach(() => {
  const { resetProjects, setName, setEmail, setBio, setSkills } = useDevfolioStore.getState();
  resetProjects();
  setName('');
  setEmail('');
  setBio('');
  setSkills([]);

  window.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
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

    // Add two new project fields (total should become 3)
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);

    const projectTitles = screen.getAllByPlaceholderText(/Project Title/i);
    expect(projectTitles.length).toBe(3);

    const removeButtons = screen.getAllByText('x');
    fireEvent.click(removeButtons[0]);

    const remainingProjects = screen.getAllByPlaceholderText(/Project Title/i);
    expect(remainingProjects.length).toBe(2);
  });

  test('submits form with valid data and resets fields', async () => {
    render(<DevfolioForm />);

    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const bioInput = screen.getByPlaceholderText(/Write a short bio/i);
    const skillsInput = screen.getByPlaceholderText(/E.g. React, TypeScript, CSS/i);
    const projectTitleInput = screen.getByPlaceholderText(/Project Title/i);
    const projectDescInput = screen.getByPlaceholderText(/Project Description/i);

    fireEvent.change(nameInput, { target: { value: 'Pravesh' } });
    fireEvent.change(emailInput, { target: { value: 'pravesh@example.com' } });
    fireEvent.change(bioInput, { target: { value: 'Frontend Developer' } });
    fireEvent.change(skillsInput, { target: { value: 'React, Tailwind' } });
    fireEvent.change(projectTitleInput, { target: { value: 'Devfolio' } });
    fireEvent.change(projectDescInput, { target: { value: 'A portfolio builder for developers.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit|loading/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(screen.getByPlaceholderText(/Project Title/i)).toHaveValue('');
    }, { timeout: 2000 });
  });

  test('shows alert if form is incomplete', () => {
    render(<DevfolioForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit|loading/i }));

    expect(window.alert).toHaveBeenCalledWith('All fields are required.');
  });
});
