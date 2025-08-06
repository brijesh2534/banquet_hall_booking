import React from 'react';
import { Heart, Users, Building, Gift, Music, Camera, Utensils, Car } from 'lucide-react';

const Services = () => {
  const eventTypes = [
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      title: "Weddings",
      description: "Create your dream wedding with our elegant venue and comprehensive wedding packages.",
      features: ["Bridal suite", "Dance floor", "Wedding coordination", "Floral arrangements"]
    },
    {
      icon: <Building className="h-12 w-12 text-blue-600" />,
      title: "Corporate Events",
      description: "Professional settings for meetings, conferences, and corporate celebrations.",
      features: ["AV equipment", "Presentation setup", "Business catering", "Networking areas"]
    },
    {
      icon: <Gift className="h-12 w-12 text-purple-600" />,
      title: "Birthday Parties",
      description: "Celebrate milestone birthdays with style and create lasting memories.",
      features: ["Custom decorations", "Entertainment setup", "Birthday cake service", "Photo opportunities"]
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Anniversary Celebrations",
      description: "Honor special milestones with intimate or grand anniversary celebrations.",
      features: ["Romantic ambiance", "Memory displays", "Special dining", "Music coordination"]
    }
  ];

  const amenities = [
    {
      icon: <Utensils className="h-8 w-8 text-yellow-600" />,
      title: "Catering Services",
      description: "Professional catering with diverse menu options from appetizers to full-course meals."
    },
    {
      icon: <Music className="h-8 w-8 text-yellow-600" />,
      title: "Sound & Lighting",
      description: "State-of-the-art sound system and customizable lighting for the perfect atmosphere."
    },
    {
      icon: <Camera className="h-8 w-8 text-yellow-600" />,
      title: "Photography Services",
      description: "Professional photographers to capture every precious moment of your celebration."
    },
    {
      icon: <Car className="h-8 w-8 text-yellow-600" />,
      title: "Ample Parking",
      description: "Convenient parking for up to 200 vehicles with valet service available."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Comprehensive event services to make your celebration perfect from start to finish
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Events We Host</h2>
            <p className="text-xl text-gray-600">Every occasion deserves a perfect celebration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((event, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    {event.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <ul className="space-y-2">
                  {event.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Amenities</h2>
            <p className="text-xl text-gray-600">Everything you need for a successful event</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Venue Features</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Spacious Main Hall</h4>
                    <p className="text-gray-600">Our 5,000 sq ft main hall can accommodate up to 500 guests with flexible seating arrangements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Climate Control</h4>
                    <p className="text-gray-600">Year-round comfort with advanced HVAC systems maintaining perfect temperature.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Elegant Décor</h4>
                    <p className="text-gray-600">Beautiful chandeliers, marble floors, and customizable lighting create the perfect ambiance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Modern Facilities</h4>
                    <p className="text-gray-600">Updated restrooms, coat check, and accessibility features for all guests.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Venue Interior"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you create an unforgettable celebration tailored to your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Book Your Event
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Get More Information
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;