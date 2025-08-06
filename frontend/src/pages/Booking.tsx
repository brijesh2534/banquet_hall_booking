import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, Clock, Mail, Phone, User, CheckCircle, XCircle, LogIn } from 'lucide-react';

const Booking = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [searchParams] = useSearchParams(); // Hook to read URL query params

  // The list of packages, now with the correct Rupee format
  const packageTypes = ['Essential (₹25,000)', 'Premium (₹42,000)', 'Luxury (₹68,000)', 'Custom Quote'];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    eventType: '',
    guestCount: '',
    packageType: '', // Initial state is empty
    additionalServices: [] as string[],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Effect to read the 'package' from the URL when the component loads
  useEffect(() => {
    const selectedPackage = searchParams.get('package');
    // Check if the package from the URL is a valid one from our list
    if (selectedPackage && packageTypes.includes(selectedPackage)) {
      setFormData(prev => ({
        ...prev,
        packageType: selectedPackage
      }));
    }
  }, [searchParams]);

  // Effect to pre-fill the form with user data as soon as it's available
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.email || '',
        // @ts-ignore - Assuming your user model from the backend has a phoneNumber field
        phone: user.phoneNumber || ''
      }));
    }
  }, [isAuthenticated, user]);

  // --- Event Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setErrorMessage('You must be logged in to submit a booking request.');
      return;
    }
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('/api/booking', formData);
      setSuccessMessage(res.data.message);
      // Reset only the event-specific parts of the form, keeping user info
      setFormData(prev => ({
        ...prev,
        eventDate: '', eventTime: '', eventType: '', guestCount: '',
        packageType: '', additionalServices: [], message: ''
      }));
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

  // --- Data for Form Fields ---
  const eventTypes = ['Wedding', 'Birthday Party', 'Anniversary', 'Corporate Event', 'Other'];
  const additionalServices = ['Professional Photography', 'Videography Service', 'Live Music Band', 'DJ Service'];

  // Show a loading state while the authentication check is in progress
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading Booking Page...</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Book Your Event</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Let us help you create an unforgettable celebration.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* RENDER THIS BLOCK IF USER IS NOT LOGGED IN */}
          {!isAuthenticated && (
            <div className="text-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-lg">
              <LogIn className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="mb-4">You must be logged in to submit a booking request.</p>
              <Link to="/login" className="bg-yellow-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                Login Now
              </Link>
            </div>
          )}

          {/* RENDER THE FORM ONLY IF USER IS LOGGED IN */}
          {isAuthenticated && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information (pre-filled and read-only) */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><User className="inline h-4 w-4 mr-2" />Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Mail className="inline h-4 w-4 mr-2" />Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Phone className="inline h-4 w-4 mr-2" />Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                  </div>
                </div>

                {/* Event Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Calendar className="inline h-4 w-4 mr-2" />Event Date *</label>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Clock className="inline h-4 w-4 mr-2" />Event Time *</label>
                    <input type="time" name="eventTime" value={formData.eventTime} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600">
                      <option value="">Select event type</option>
                      {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Users className="inline h-4 w-4 mr-2" />Number of Guests *</label>
                    <input type="number" name="guestCount" value={formData.guestCount} onChange={handleInputChange} required min="1" max="500" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600" placeholder="e.g., 150" />
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Package Selection *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageTypes.map(pkg => (
                    <label key={pkg} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="packageType" value={pkg} checked={formData.packageType === pkg} onChange={handleInputChange} required className="mr-3 text-yellow-600 focus:ring-yellow-600" />
                      <span className="text-gray-700">{pkg}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalServices.map(service => (
                    <label key={service} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" checked={formData.additionalServices.includes(service)} onChange={() => handleServiceChange(service)} className="mr-3 text-yellow-600 focus:ring-yellow-600" />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600" placeholder="Special requirements or questions..." />
              </div>

              {/* Status Messages */}
              <div className="mt-6">
                {successMessage && <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100"><CheckCircle className="h-5 w-5 mr-3" /><span>{successMessage}</span></div>}
                {errorMessage && <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100"><XCircle className="h-5 w-5 mr-3" /><span>{errorMessage}</span></div>}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:bg-gray-400">
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;