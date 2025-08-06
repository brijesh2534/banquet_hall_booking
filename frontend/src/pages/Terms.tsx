import React from 'react';
import { ShieldCheck, FileText, Calendar, DollarSign } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Please read our terms carefully before using our services or booking an event.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-yellow-600" />
                1. Introduction
              </h2>
              <p>
                Welcome to Royal Banquet. These Terms and Conditions govern your use of our website and the booking of our venue. By accessing our site or making a booking, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-yellow-600" />
                2. Booking and Reservations
              </h2>
              <p className="mb-2">
                All bookings are subject to availability. A booking is considered confirmed only after we have received the required deposit and you have received a written confirmation from us. We reserve the right to refuse any booking at our discretion.
              </p>
              <p>
                The person making the booking must be at least 18 years of age and accepts these terms on behalf of all members of their party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 mr-3 text-yellow-600" />
                3. Payments, Deposits, and Cancellations
              </h2>
              <p className="mb-2">
                A non-refundable deposit of 25% of the total estimated cost is required to secure your booking. The final balance is due no later than 30 days prior to the event date. Failure to pay the balance by the due date may result in the cancellation of your event.
              </p>
              <p className="mb-2">
                <strong>Cancellation Policy:</strong> Cancellations must be made in writing.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Cancellations made more than 60 days before the event will receive a full refund of payments made, excluding the non-refundable deposit.</li>
                <li>Cancellations made between 30 and 60 days before the event will forfeit the deposit and 50% of any additional payments made.</li>
                <li>Cancellations made less than 30 days before the event will forfeit all payments made.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <ShieldCheck className="h-6 w-6 mr-3 text-yellow-600" />
                4. Client Responsibilities
              </h2>
              <p className="mb-2">
                The client is responsible for the conduct of their guests and must ensure that they comply with all venue rules and regulations. The client will be held responsible for any damage caused to the venue or its property by themselves or their guests.
              </p>
              <p>
                No outside food or beverage is permitted without prior written consent from Royal Banquet management. All decorations must be approved in advance and must not cause damage to the venue.
              </p>
            </div>
            
            <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500">
                    <strong>Last Updated:</strong> August 6, 2025. Royal Banquet reserves the right to amend these terms and conditions at any time. All bookings are subject to the terms and conditions in effect at the time of the booking.
                </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
