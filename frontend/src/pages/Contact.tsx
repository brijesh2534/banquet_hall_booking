import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, XCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // State for handling submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('/api/contact', formData);
      setSuccessMessage(res.data.message);
      // Clear the form on successful submission
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Get in touch with our team to discuss your event needs or ask any questions
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {/* ... your existing contact info JSX ... */}
                 <div className="flex items-start space-x-4">
                   <div className="bg-yellow-600 text-white p-3 rounded-lg"><MapPin className="h-6 w-6" /></div>
                   <div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
                     <p className="text-gray-600">123 Grand Avenue<br />City, State 12345<br />United States</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-4">
                   <div className="bg-yellow-600 text-white p-3 rounded-lg"><Phone className="h-6 w-6" /></div>
                   <div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                     <p className="text-gray-600">Main: +1 (555) 123-4567<br />Events: +1 (555) 123-4568</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-4">
                   <div className="bg-yellow-600 text-white p-3 rounded-lg"><Mail className="h-6 w-6" /></div>
                   <div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Addresses</h3>
                     <p className="text-gray-600">General: info@royalbanquet.com<br />Events: events@royalbanquet.com</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... your form inputs ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Information</option>
                    <option value="pricing">Pricing & Packages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="Tell us about your event..." />
                </div>

                {/* --- Display Success or Error Messages --- */}
                {successMessage && (
                  <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>{successMessage}</span>
                  </div>
                )}
                {errorMessage && (
                  <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100">
                    <XCircle className="h-5 w-5 mr-3" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ... your existing FAQ section ... */}
    </div>
  );
};

export default Contact;