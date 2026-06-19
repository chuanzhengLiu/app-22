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
    emailRequired: string;
    emailMissingAt: string;
    emailMissingDomain: string;
    emailInvalidTld: string;
    emailInvalidFormat: string;
    success: string;
  };
}

const validateEmail = (email: string): string | null => {
  if (!email || !email.trim()) {
    return 'required';
  }

  const trimmed = email.trim();

  if (!trimmed.includes('@')) {
    return 'missingAt';
  }

  const atIndex = trimmed.indexOf('@');
  const localPart = trimmed.slice(0, atIndex);
  const domainPart = trimmed.slice(atIndex + 1);

  if (!localPart) {
    return 'missingAt';
  }

  if (!domainPart) {
    return 'missingDomain';
  }

  if (!domainPart.includes('.')) {
    return 'missingDomain';
  }

  const dotIndex = domainPart.lastIndexOf('.');
  const tld = domainPart.slice(dotIndex + 1);

  if (tld.length < 2) {
    return 'invalidTld';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return 'invalidFormat';
  }

  return null;
};

const ContactForm: React.FC<Props> = ({ labels, messages }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getErrorMessage = (errorKey: string): string => {
    switch (errorKey) {
      case 'required':
        return messages.emailRequired;
      case 'missingAt':
        return messages.emailMissingAt;
      case 'missingDomain':
        return messages.emailMissingDomain;
      case 'invalidTld':
        return messages.emailInvalidTld;
      case 'invalidFormat':
        return messages.emailInvalidFormat;
      default:
        return messages.emailInvalidFormat;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const error = validateEmail(formData.email);
    if (error) {
      setEmailError(getErrorMessage(error));
      return;
    }

    setEmailError(null);
    console.log('Form submitted:', formData);
    setSubmitSuccess(true);
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
            setEmailError(null);
          }}
          className={emailError ? 'input-error' : ''}
          required
        />
        {emailError && <p className="error-message">{emailError}</p>}
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

      {submitSuccess && (
        <p className="success-message">{messages.success}</p>
      )}
    </form>
  );
};

export default ContactForm;
