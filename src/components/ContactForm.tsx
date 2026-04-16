import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim() === '' ? 'First name is required' : '';
      case 'lastName':
        return value.trim() === '' ? 'Last name is required' : '';
      case 'email':
        if (value.trim() === '') return 'Work email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'inquiryType':
        return value === '' ? 'Please select an inquiry type' : '';
      case 'message':
        if (value.trim() === '') return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters long';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call for submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        inquiryType: '',
        message: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>Akash B's Form.</h2>
        <p>Fill out the form below and our team will get back to you shortly.</p>
      </div>

      {isSuccess && (
        <div className="success-message">
          ✓ Your message has been sent successfully! We'll be in touch.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="firstName" className="form-label">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${errors.firstName ? 'has-error' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Jane"
              />
            </div>
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="lastName" className="form-label">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${errors.lastName ? 'has-error' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="email" className="form-label">Work Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'has-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="jane@company.com"
              />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="company" className="form-label">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper select-wrapper">
            <label htmlFor="inquiryType" className="form-label">Inquiry Type *</label>
            <select
              id="inquiryType"
              name="inquiryType"
              className={`form-control ${errors.inquiryType ? 'has-error' : ''}`}
              value={formData.inquiryType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" disabled>Select a topic...</option>
              <option value="sales">Sales Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.inquiryType && <div className="error-message">{errors.inquiryType}</div>}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea
              id="message"
              name="message"
              className={`form-control ${errors.message ? 'has-error' : ''}`}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="How can we help you achieve your goals?"
            />
          </div>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <span>Send Message</span>
          )}
        </button>
      </form>
    </div>
  );
};
