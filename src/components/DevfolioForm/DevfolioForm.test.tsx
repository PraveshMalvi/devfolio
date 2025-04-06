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

  // ✅ Always mock alert globally
  window.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks(); // ✅ Clear mocks between tests
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

  test('submits form with valid data and resets fields', async () => {
    render(<DevfolioForm />);

    // ✅ Check initial value
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const projectTitleInput = screen.getByPlaceholderText(/Project Title/i);

    expect(nameInput).toHaveValue('');
    expect(projectTitleInput).toHaveValue('');

    // ✅ Fill all fields
    fireEvent.change(nameInput, { target: { value: 'Pravesh' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'pravesh@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Write a short bio/i), {
      target: { value: 'Frontend Developer' },
    });
    fireEvent.change(screen.getByPlaceholderText(/E.g. React, TypeScript, CSS/i), {
      target: { value: 'React, Tailwind' },
    });
    fireEvent.change(projectTitleInput, {
      target: { value: 'Devfolio' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Project Description/i), {
      target: { value: 'A portfolio builder for developers.' },
    });

    // ✅ Click submit button that might show "Submit" or "Loading..."
    fireEvent.click(screen.getByRole('button', { name: /submit|loading\.{0,3}/i }));

    // ✅ Wait for form to reset
    // await waitFor(() => {
    //   expect(projectTitleInput).toHaveValue('');
    //   expect(screen.getByPlaceholderText(/Project Title/i)).toHaveValue('');
    // });
    await waitFor(
      () => {
        const projectInput = screen.getByPlaceholderText(/Project Title/i);
        expect(projectInput).toHaveValue('');
      },
      { timeout: 2000 } // allow a bit more time than the setTimeout
    );
  });

  test('shows alert if form is incomplete', () => {
    render(<DevfolioForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit|loading\.{0,3}/i }));

    expect(window.alert).toHaveBeenCalledWith('All fields are required.');
  });
});
