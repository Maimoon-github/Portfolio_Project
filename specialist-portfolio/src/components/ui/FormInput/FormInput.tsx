// specialist-portfolio/src/components/ui/FormInput/FormInput.tsx
import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { FormInputProps } from './FormInput.types';
import styles from './FormInput.module.css';

/**
 * FormInput component supporting text, email, number, and textarea.
 * Follows "The Data Specialist" design system.
 */
const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  (
    {
      id,
      label,
      error,
      fullWidth = false,
      className,
      multiline = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    const wrapperClasses = clsx(
      styles.wrapper,
      fullWidth && styles['wrapper--fullWidth'],
      className
    );

    const inputClasses = clsx(
      multiline ? styles.textarea : styles.input,
      error && styles.errorInput,
      // Apply numeric font for number/tel inputs
      !multiline && (props.type === 'number' || props.type === 'tel') && styles.numeric
    );

    const inputProps = {
      id: inputId,
      className: inputClasses,
      'aria-invalid': !!error,
      'aria-describedby': errorId,
      ...props,
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <div id={errorId} className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;