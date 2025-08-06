import React, { useState } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    eventType: '',
    guestCount: '',
    packageType: '',
    additionalServices: [],
    message: ''
  });

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Anniversary',
    'Corporate Event',
    'Graduation',
    'Baby Shower',
    'Retirement Party',
    'Other'
  ];

  const packageTypes = [
    'Essential ($2,500)',
    'Premium ($4,200)',
    'Luxury ($6,800)',
    'Custom Quote'
  ];

  const additionalServices = [
    'Professional Photography',
    'Videography Service',
    'Live Music Band',
    'DJ Service',
    'Photo Booth',
    'Specialty Lighting',
    'Upgraded Floral Arrangements'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you within 24 hours to discuss your event details.');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Book Your Event</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Let us help you create an unforgettable celebration. Fill out the form below and we'll get back to you soon!
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Event Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Event Time *
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-2" />
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="Number of expected guests"
                  />
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Package Selection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageTypes.map(pkg => (
                  <label key={pkg} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="packageType"
                      value={pkg}
                      checked={formData.packageType === pkg}
                      onChange={handleInputChange}
                      className="mr-3 text-yellow-600 focus:ring-yellow-600"
                    />
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
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="mr-3 text-yellow-600 focus:ring-yellow-600"
                    />
                    <span className="text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Tell us more about your event, special requirements, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Request</h3>
              <p className="text-gray-600">Fill out the booking form with your event details and preferences.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">We'll contact you within 24 hours to discuss your requirements.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirmation</h3>
              <p className="text-gray-600">Finalize details and secure your date with a deposit.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;