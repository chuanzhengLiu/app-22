import React, { useState } from 'react';
import './ContactForm.less';

interface Props {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    emailInvalid: string;
    successMessage: string;
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm: React.FC<Props> = ({ labels }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(labels.emailInvalid);
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (emailError && value) {
      validateEmail(value);
    } else if (!value) {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      return;
    }
    console.log('Form submitted:', formData);
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className={`form-group ${emailError ? 'has-error' : ''}`}>
        <label htmlFor="email">{labels.email}</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="error-message">{emailError}</span>}
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
