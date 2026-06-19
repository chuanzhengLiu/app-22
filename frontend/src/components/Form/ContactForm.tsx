import React, { useState } from 'react';
import './ContactForm.less';

interface Props {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  messages: {
    invalidEmail: string;
    success: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm: React.FC<Props> = ({ labels, messages }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => EMAIL_REGEX.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError(messages.invalidEmail);
      return;
    }
    setEmailError('');
    console.log('Form submitted:', formData);
    alert(messages.success);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">{labels.name}</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">{labels.email}</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (emailError) setEmailError('');
          }}
          onBlur={() => {
            if (formData.email && !validateEmail(formData.email)) {
              setEmailError(messages.invalidEmail);
            }
          }}
          aria-invalid={emailError ? 'true' : 'false'}
          aria-describedby={emailError ? 'email-error' : undefined}
          className={emailError ? 'has-error' : ''}
          required
        />
        {emailError && (
          <p id="email-error" className="error-message" role="alert">
            {emailError}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">{labels.message}</label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {labels.submit}
      </button>
    </form>
  );
};

export default ContactForm;
