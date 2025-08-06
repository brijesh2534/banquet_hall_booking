import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Calendar, Award } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-yellow-600" />,
      title: "500+ Capacity",
      description: "Spacious hall accommodating large gatherings"
    },
    {
      icon: <Calendar className="h-8 w-8 text-yellow-600" />,
      title: "Flexible Booking",
      description: "Available for day and evening events"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Premium Service",
      description: "Professional staff and top-notch amenities"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "5-Star Rated",
      description: "Consistently rated as the best in the area"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Perfect
            <span className="text-yellow-400 block">Celebration Awaits</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience elegance and sophistication at Royal Banquet Hall
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors inline-flex items-center justify-center group"
            >
              Book Your Event
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Royal Banquet?</h2>
            <p className="text-xl text-gray-600">Creating memorable experiences for over a decade</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Royal Banquet</h2>
              <p className="text-lg text-gray-600 mb-6">
                For over 15 years, Royal Banquet has been the premier destination for elegant 
                celebrations in our city. Our stunning venue combines classic architecture with 
                modern amenities to create the perfect atmosphere for your special day.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From intimate gatherings to grand celebrations, we provide personalized service 
                that ensures every detail is perfect. Our experienced team works closely with you 
                to bring your vision to life.
              </p>
              <Link
                to="/about"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Royal Banquet Interior"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Perfect Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your requirements and check availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;