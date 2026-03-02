// specialist-portfolio/src/components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button, { type ButtonProps } from './Button';

// Helper to setup user and render component with default props
const setup = (props?: Partial<ButtonProps>) => {
  const user = userEvent.setup();
  const utils = render(<Button {...props}>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  return { user, button, ...utils };
};

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { button } = setup();
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('button--primary');
      expect(button).toHaveClass('button--md');
    });

    it('renders with custom children', () => {
      render(<Button>Custom Text</Button>);
      expect(screen.getByRole('button', { name: /custom text/i })).toBeInTheDocument();
    });

    it('applies correct variant classes', () => {
      const { rerender } = render(<Button variant="primary">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--primary');

      rerender(<Button variant="secondary">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--secondary');

      rerender(<Button variant="accent">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--accent');

      rerender(<Button variant="text">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--text');
    });

    it('applies correct size classes', () => {
      const { rerender } = render(<Button size="sm">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--sm');

      rerender(<Button size="md">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--md');

      rerender(<Button size="lg">Click</Button>);
      expect(screen.getByRole('button')).toHaveClass('button--lg');
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const { button } = setup({ fullWidth: true });
      expect(button).toHaveClass('button--full-width');
    });

    it('renders left and right icons when provided', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      const RightIcon = () => <span data-testid="right-icon">→</span>;

      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Click
        </Button>
      );

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('does not render icons when isLoading is true', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      render(
        <Button leftIcon={<LeftIcon />} isLoading>
          Click
        </Button>
      );

      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const { user, button } = setup({ onClick: handleClick });

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const { user, button } = setup({ onClick: handleClick, disabled: true });

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const { user, button } = setup({ onClick: handleClick, isLoading: true });

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Loading state', () => {
    it('shows spinner and hides content when isLoading is true', () => {
      const { container } = render(<Button isLoading>Click</Button>);
      const spinner = container.querySelector('.spinner');
      expect(spinner).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--loading');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('preserves button width while loading', () => {
      const { button } = setup({ isLoading: true });
      expect(button).toHaveClass('button--loading');
      // Width is preserved via CSS, not directly testable here
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes when disabled', () => {
      const { button } = setup({ disabled: true });
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('has correct aria attributes when loading', () => {
      const { button } = setup({ isLoading: true });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('is keyboard focusable', async () => {
      const { user } = setup();
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('has visible focus indicator when focused', async () => {
      const { user, button } = setup();
      await user.tab();
      // Focus visibility is handled by CSS :focus-visible, we test that focus works
      expect(button).toHaveFocus();
    });

    it('has role="button"', () => {
      const { button } = setup();
      expect(button).toHaveAttribute('role', 'button');
    });
  });

  describe('Props forwarding', () => {
    it('forwards standard HTML attributes to the button element', () => {
      render(
        <Button type="submit" name="test-btn" data-testid="custom-button">
          Click
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'test-btn');
    });

    it('merges custom className with generated classes', () => {
      const { button } = setup({ className: 'custom-class' });
      expect(button).toHaveClass('button', 'custom-class');
    });
  });
});