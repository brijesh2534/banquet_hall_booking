import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Check, Star, Crown } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate(); // Hook for navigation

  // 1. Update packages with new prices and a unique key
  const packages = [
    {
      name: "Essential",
      price: "₹25,000",
      description: "Perfect for intimate gatherings and small celebrations",
      features: [
        "Venue rental for 6 hours",
        "Tables and chairs for 100 guests",
        "Basic lighting and sound system",
        "Complimentary setup and cleanup"
      ],
      key: "Essential (₹25,000)" // Unique identifier for the package
    },
    {
      name: "Premium",
      price: "₹42,000",
      description: "Our most popular package for memorable celebrations",
      features: [
        "All Essential features, plus:",
        "Venue rental for 8 hours",
        "Capacity for 300 guests",
        "Premium linens and centerpieces",
        "Dance floor and stage area"
      ],
      popular: true,
      key: "Premium (₹42,000)"
    },
    {
      name: "Luxury",
      price: "₹68,000",
      description: "Ultimate elegance for grand celebrations",
      features: [
        "All Premium features, plus:",
        "Venue rental for 10 hours",
        "Capacity for 500 guests",
        "Luxury floral arrangements",
        "Valet service and red carpet entrance",
        "Champagne toast for all guests"
      ],
      key: "Luxury (₹68,000)"
    }
  ];

  // 2. Handle the button click to navigate
  const handleSelectPackage = (packageName: string) => {
    // Navigate to the booking page and add the package as a query parameter
    navigate(`/booking?package=${encodeURIComponent(packageName)}`);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing & Packages</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Choose the perfect package for your celebration with transparent pricing.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Packages</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`relative flex flex-col bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow ${pkg.popular ? 'border-4 border-yellow-500' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold text-gray-900 mb-2`}>{pkg.name}</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 3. Update button to call our handler */}
                <button 
                  onClick={() => handleSelectPackage(pkg.key)}
                  className={`w-full bg-blue-900 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-blue-800`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">Need something different? We can create a custom package for you.</p>
            <Link to="/contact" className="mt-4 inline-block bg-yellow-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ... other sections ... */}
    </div>
  );
};

export default Pricing;