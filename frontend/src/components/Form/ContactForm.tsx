import React, { useState } from 'react';
import './ContactForm.less';

interface Props {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
  }
}

const ContactForm: React.FC<Props> = ({ labels }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
          type="text"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
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
