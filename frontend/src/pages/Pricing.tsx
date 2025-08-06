import React from 'react';
import { Check, Star, Crown } from 'lucide-react';

const Pricing = () => {
  const packages = [
    {
      name: "Essential",
      price: "$2,500",
      description: "Perfect for intimate gatherings and small celebrations",
      features: [
        "Venue rental for 6 hours",
        "Tables and chairs for 100 guests",
        "Basic lighting and sound system",
        "Complimentary setup and cleanup",
        "Dedicated event coordinator",
        "Basic linens and centerpieces"
      ],
      color: "bg-gray-100",
      textColor: "text-gray-900",
      buttonColor: "bg-gray-800 hover:bg-gray-700"
    },
    {
      name: "Premium",
      price: "$4,200",
      description: "Our most popular package for memorable celebrations",
      features: [
        "Venue rental for 8 hours",
        "Tables and chairs for 300 guests",
        "Professional lighting and sound",
        "Full setup and cleanup service",
        "Dedicated event coordinator",
        "Premium linens and centerpieces",
        "Complimentary coat check service",
        "Basic bar service setup",
        "Dance floor and stage area"
      ],
      color: "bg-yellow-50",
      textColor: "text-gray-900",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      popular: true
    },
    {
      name: "Luxury",
      price: "$6,800",
      description: "Ultimate elegance for grand celebrations",
      features: [
        "Venue rental for 10 hours",
        "Tables and chairs for 500 guests",
        "Premium lighting and sound package",
        "Full setup and cleanup service",
        "Dedicated event coordinator",
        "Luxury linens and floral arrangements",
        "Complimentary coat check and valet",
        "Full bar service with bartender",
        "Dance floor, stage, and photo booth",
        "Red carpet entrance",
        "Champagne toast for all guests"
      ],
      color: "bg-blue-50",
      textColor: "text-gray-900",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const addOns = [
    { name: "Professional Photography", price: "$800" },
    { name: "Videography Service", price: "$1,200" },
    { name: "Live Music Band", price: "$1,500" },
    { name: "DJ Service", price: "$600" },
    { name: "Additional Hour", price: "$300" },
    { name: "Upgraded Floral Arrangements", price: "$500" },
    { name: "Specialty Lighting", price: "$400" },
    { name: "Photo Booth", price: "$450" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing & Packages</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Choose the perfect package for your celebration with transparent pricing and no hidden fees
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Packages</h2>
            <p className="text-xl text-gray-600">All packages include basic setup, cleanup, and event coordination</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative ${pkg.color} rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${pkg.textColor} mb-2`}>{pkg.name}</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full ${pkg.buttonColor} text-white py-3 rounded-lg font-semibold transition-colors`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-On Services</h2>
            <p className="text-xl text-gray-600">Enhance your celebration with these optional services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-yellow-600">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Notes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Important Pricing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">What's Included:</h4>
                <ul className="space-y-2 text-blue-100">
                  <li>• Tables, chairs, and basic linens</li>
                  <li>• Sound system and microphones</li>
                  <li>• Basic lighting and climate control</li>
                  <li>• Setup and cleanup services</li>
                  <li>• Dedicated event coordinator</li>
                  <li>• Complimentary parking</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Additional Information:</h4>
                <ul className="space-y-2 text-blue-100">
                  <li>• 25% deposit required to secure booking</li>
                  <li>• Final payment due 30 days before event</li>
                  <li>• Catering can be arranged separately</li>
                  <li>• Prices subject to seasonal variations</li>
                  <li>• Cancellation policy applies</li>
                  <li>• Tax and gratuity not included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a personalized quote and to check availability for your date
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;