// specialist-portfolio/src/components/ui/FormInput/FormInput.types.ts
import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type FormInputBaseProps = {
  /** Label text for the input */
  label?: string;
  /** Error message (displays when present) */
  error?: string;
  /** Whether input should take full width of container */
  fullWidth?: boolean;
  /** Optional CSS class name */
  className?: string;
};

export type FormInputProps = FormInputBaseProps &
  (
    | (InputHTMLAttributes<HTMLInputElement> & { multiline?: false; rows?: never })
    | (TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true })
  ) & {
    /** Unique id for the input (required for accessibility) */
    id: string;
  };