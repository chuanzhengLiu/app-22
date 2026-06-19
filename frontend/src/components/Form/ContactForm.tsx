import React, { useState } from 'react';
import './ContactForm.less';

interface Labels {
  name: string;
  email: string;
  message: string;
  submit: string;
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  emailMissingAt: string;
  emailMissingDomain: string;
  emailMissingTld: string;
  messageRequired: string;
  successMessage: string;
}

interface Props {
  labels: Labels;
}

const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'required';
  }

  if (/\s/.test(email)) {
    return 'invalid';
  }

  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    return 'missingAt';
  }

  const localPart = email.substring(0, atIndex);
  const domainPart = email.substring(atIndex + 1);

  if (!localPart) {
    return 'invalid';
  }

  if (!domainPart) {
    return 'missingDomain';
  }

  const dotIndex = domainPart.lastIndexOf('.');
  if (dotIndex === -1 || dotIndex === 0) {
    return 'missingTld';
  }

  const tld = domainPart.substring(dotIndex + 1);
  if (tld.length < 2) {
    return 'missingTld';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'invalid';
  }

  return null;
};

const ContactForm: React.FC<Props> = ({ labels }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name: string | null; email: string | null; message: string | null }>({
    name: null,
    email: null,
    message: null
  });
  const [submitted, setSubmitted] = useState(false);

  const getEmailErrorMessage = (errorKey: string): string => {
    switch (errorKey) {
      case 'required':
        return labels.emailRequired;
      case 'missingAt':
        return labels.emailMissingAt;
      case 'missingDomain':
        return labels.emailMissingDomain;
      case 'missingTld':
        return labels.emailMissingTld;
      default:
        return labels.emailInvalid;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    if (errors.name) {
      setErrors({ ...errors, name: value.trim() ? null : 'required' });
    }
    if (submitted) setSubmitted(false);
  };

  const handleNameBlur = () => {
    if (formData.name && !formData.name.trim()) {
      setErrors({ ...errors, name: 'required' });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (errors.email) {
      const error = validateEmail(value);
      setErrors({ ...errors, email: error });
    }
    if (submitted) setSubmitted(false);
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      const error = validateEmail(formData.email);
      setErrors({ ...errors, email: error });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, message: value });
    if (errors.message) {
      setErrors({ ...errors, message: value.trim() ? null : 'required' });
    }
    if (submitted) setSubmitted(false);
  };

  const handleMessageBlur = () => {
    if (formData.message && !formData.message.trim()) {
      setErrors({ ...errors, message: 'required' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.trim() ? null : 'required',
      email: validateEmail(formData.email),
      message: formData.message.trim() ? null : 'required'
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    alert(labels.successMessage);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">{labels.name}</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && (
          <p className="error-message">{labels.nameRequired}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">{labels.email}</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && (
          <p className="error-message">{getEmailErrorMessage(errors.email)}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">{labels.message}</label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleMessageChange}
          onBlur={handleMessageBlur}
          className={errors.message ? 'input-error' : ''}
        />
        {errors.message && (
          <p className="error-message">{labels.messageRequired}</p>
        )}
      </div>

      <button type="submit" className="submit-btn">
        {labels.submit}
      </button>

      {submitted && (
        <p className="success-message">{labels.successMessage}</p>
      )}
    </form>
  );
};

export default ContactForm;
