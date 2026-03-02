// specialist-portfolio/src/pages/Contact/Contact.tsx

import { useState, FormEvent, ChangeEvent, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import styles from './Contact.module.css';

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'Consulting' | 'Collaboration' | 'Speaking' | 'Other';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

/**
 * Contact page – low‑friction gateway for professional opportunities.
 * Uses FormInput component for name, email, and message (textarea).
 * Implements validation and submission simulation.
 */
const Contact = memo(() => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: 'Consulting',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle field changes (including select)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle blur for validation
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field as keyof FormErrors);
  };

  // Validate a single field
  const validateField = (field: keyof FormErrors): boolean => {
    let error = '';
    switch (field) {
      case 'name':
        if (!formData.name.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!formData.email.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'inquiryType':
        if (!formData.inquiryType) error = 'Please select an inquiry type';
        break;
      case 'message':
        if (!formData.message.trim()) error = 'Message cannot be empty';
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const fields: (keyof FormErrors)[] = ['name', 'email', 'inquiryType', 'message'];
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      inquiryType: true,
      message: true,
    });

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Consulting',
        message: '',
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact – Developer & AI Engineer | The Data Specialist</title>
        <meta
          name="description"
          content="Reach out for collaborations, consulting on AI systems, or to discuss a project. Let's build intelligent systems together."
        />
      </Helmet>

      <main className={styles.contact}>
        {/* Hero Section */}
        <SectionContainer id="contact-hero" paddingSize="lg" backgroundVariant="default">
          <div className={styles.hero}>
            <h1 className={styles.hero__title}>Let's Build Intelligent Systems.</h1>
            <p className={styles.hero__intro}>
              Open to collaborations, consulting on AI systems, and strategic opportunities.
            </p>
          </div>
        </SectionContainer>

        {/* Form + Info Grid */}
        <SectionContainer id="contact-main" paddingSize="lg" backgroundVariant="default">
          <div className={styles.grid}>
            {/* Contact Form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <fieldset className={styles.fieldset}>
                <legend>Your details</legend>

                <div className={styles.form__field}>
                  <FormInput
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    error={touched.name ? errors.name : undefined}
                    fullWidth
                  />
                </div>

                <div className={styles.form__field}>
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    error={touched.email ? errors.email : undefined}
                    fullWidth
                  />
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Inquiry type</legend>
                <div className={styles.form__field}>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className={styles.form__select}
                    value={formData.inquiryType}
                    onChange={handleChange}
                    onBlur={() => handleBlur('inquiryType')}
                    aria-invalid={!!errors.inquiryType && touched.inquiryType}
                    aria-describedby={errors.inquiryType ? 'inquiry-error' : undefined}
                  >
                    <option value="Consulting">Consulting</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Other">Other</option>
                  </select>
                  {touched.inquiryType && errors.inquiryType && (
                    <p id="inquiry-error" className={styles.form__error} role="alert">
                      {errors.inquiryType}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Message</legend>
                <div className={styles.form__field}>
                  <FormInput
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    error={touched.message ? errors.message : undefined}
                    fullWidth
                  />
                </div>
              </fieldset>

              <div className={styles.form__actions}>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {submitSuccess ? '✓ Sent!' : 'Send Message'}
                </Button>
              </div>
            </form>

            {/* Direct Contact Info */}
            <aside className={styles.info}>
              <h2 className={styles.info__heading}>Direct Contact</h2>
              <ul className={styles.info__list}>
                <li className={styles.info__item}>
                  <span className={styles.info__icon}>✉️</span>
                  <a href="mailto:hello@dataspecialist.dev">hello@dataspecialist.dev</a>
                </li>
                <li className={styles.info__item}>
                  <span className={styles.info__icon}>🔗</span>
                  <a
                    href="https://linkedin.com/in/dataspecialist"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className={styles.info__item}>
                  <span className={styles.info__icon}>⌨️</span>
                  <a
                    href="https://github.com/dataspecialist"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>

              <h3 className={styles.info__subheading}>For Project Inquiries</h3>
              <p className={styles.info__text}>
                Tell me about your vision, goals, and the problem you're solving. The more specifics, the better.
              </p>
            </aside>
          </div>
        </SectionContainer>
      </main>
    </>
  );
});

Contact.displayName = 'Contact';
export default Contact;