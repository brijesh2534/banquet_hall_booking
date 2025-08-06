import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-yellow-600" />,
      title: "Passion for Excellence",
      description: "Every event receives our full dedication and attention to detail"
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-600" />,
      title: "Family-Owned Legacy",
      description: "Three generations of hospitality excellence and family values"
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-600" />,
      title: "15+ Years Experience",
      description: "Thousands of successful events and satisfied customers"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Award-Winning Service",
      description: "Recognized as the city's premier banquet hall facility"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Royal Banquet</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Creating unforgettable moments and cherished memories for families and businesses since 2009
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Royal Banquet began as a dream in 2009 when the Johnson family decided to create 
                a venue that would bring elegance and sophistication to celebrations in our community. 
                What started as a small family business has grown into the most trusted name in event hosting.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, Robert Johnson, envisioned a space where families could celebrate life's 
                most precious moments in an atmosphere of warmth and grandeur. Today, his vision lives 
                on through our dedicated team who treat every event as if it were their own family celebration.
              </p>
              <p className="text-lg text-gray-600">
                We've had the privilege of hosting over 3,000 events, from intimate family gatherings 
                to grand corporate galas, each one unique and memorable in its own way.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Royal Banquet Hall Interior"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-900 text-white p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg opacity-90">
                To provide an exceptional venue and outstanding service that transforms special 
                occasions into unforgettable memories. We strive to exceed expectations through 
                attention to detail, personalized service, and unwavering commitment to excellence.
              </p>
            </div>
            <div className="bg-yellow-600 text-white p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg opacity-90">
                To be the premier destination for celebrations, recognized for our elegant venue, 
                exceptional service, and ability to bring people together for life's most important 
                moments. We envision a future where every event creates lasting joy and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Royal Banquet?</h2>
            <p className="text-xl text-gray-600">Here's what sets us apart from other venues</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Personalized Service</h4>
              <p className="text-gray-600">
                Every event is unique, and we work closely with you to customize every detail 
                to match your vision and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Flexible Packages</h4>
              <p className="text-gray-600">
                Our variety of packages can be tailored to fit your budget and requirements, 
                ensuring you get the best value for your investment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Expert Team</h4>
              <p className="text-gray-600">
                Our experienced event coordinators and staff ensure flawless execution 
                from planning to cleanup.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Modern Amenities</h4>
              <p className="text-gray-600">
                State-of-the-art sound system, lighting, and facilities with elegant 
                décor and comfortable seating.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Convenient Location</h4>
              <p className="text-gray-600">
                Centrally located with ample parking and easy access for all your guests, 
                making attendance convenient for everyone.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Proven Track Record</h4>
              <p className="text-gray-600">
                Over 3,000 successful events and countless satisfied customers who continue 
                to recommend us to their friends and family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;