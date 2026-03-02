// specialist-portfolio/src/components/ui/ProjectCard/ProjectCard.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from './ProjectCard';

const mockProps = {
  id: '1',
  title: 'Test Project',
  summary: 'This is a test summary',
  tags: ['React', 'TypeScript'],
};

describe('ProjectCard', () => {
  it('renders title and summary', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test summary')).toBeInTheDocument();
  });

  it('renders tags as Badges', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders status badge when status provided', () => {
    render(<ProjectCard {...mockProps} status="active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders metrics when variant is detailed', () => {
    const metrics = [
      { value: '99%', label: 'Accuracy' },
      { value: '2.5s', label: 'Response' },
    ];
    render(
      <ProjectCard
        {...mockProps}
        variant="detailed"
        metrics={metrics}
      />
    );
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });

  it('does not render metrics in compact mode', () => {
    const metrics = [
      { value: '99%', label: 'Accuracy' },
    ];
    render(
      <ProjectCard
        {...mockProps}
        variant="compact"
        metrics={metrics}
      />
    );
    expect(screen.queryByText('99%')).not.toBeInTheDocument();
  });

  it('renders action links when provided', () => {
    const links = {
      demo: 'https://demo.com',
      repo: 'https://github.com',
    };
    render(<ProjectCard {...mockProps} links={links} />);
    expect(screen.getByLabelText('View live demo')).toBeInTheDocument();
    expect(screen.getByLabelText('View source on GitHub')).toBeInTheDocument();
  });

  it('applies featured class when featured is true', () => {
    render(<ProjectCard {...mockProps} featured />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('projectCard--featured');
  });
});