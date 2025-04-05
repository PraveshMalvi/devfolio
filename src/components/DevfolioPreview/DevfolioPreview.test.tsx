// DevfolioPreview.test.tsx
import { render, screen } from '@testing-library/react';
import DevfolioPreview from './DevfolioPreview';
import { useDevfolioStore } from '../../store/useDevfolioStore';

describe('DevfolioPreview', () => {
  it('renders name, email, bio, skills, and projects', () => {
    useDevfolioStore.setState({
      name: 'Test User',
      email: 'test@example.com',
      bio: 'A passionate dev.',
      skills: ['React', 'Zustand'],
      projects: [
        { title: 'Portfolio Site', description: 'A personal portfolio using React.' },
      ],
    });

    render(<DevfolioPreview />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('A passionate dev.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Zustand')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Site')).toBeInTheDocument();
    expect(screen.getByText('A personal portfolio using React.')).toBeInTheDocument();
  });
});
