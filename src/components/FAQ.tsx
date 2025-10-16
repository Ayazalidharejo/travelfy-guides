"use client";
import React from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is the booking process?",
    answer:
      "You can browse our tours and book directly through our website. Once booked, you will receive a confirmation email with all the details.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "We offer free cancellation up to 24 hours before the tour start time. After that, cancellation charges may apply.",
  },
  {
    question: "Are the tours guided in English?",
    answer:
      "Yes, all our tours are guided by experienced guides fluent in English to ensure you get the best experience.",
  },
  {
    question: "Do you provide transportation during the tours?",
    answer:
      "Yes, our tours include transportation with professional drivers who know Japan inside out.",
  },
  {
    question: "Can I customize my tour itinerary?",
    answer:
      "Absolutely! We offer custom tour packages based on your preferences. Contact us for more details.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-900">
          Frequently Asked Questions about{" "}
          <span className="text-[#5C7AC0] bg-clip-text ">
            Karvaan Tours
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Got questions before you book your journey with us? Here’s what our travelers ask most often.
        </p>

        {/* FAQs */}
        <div className="space-y-6">
          {faqs.map(({ question, answer }, index) => (
            <div
              key={index}
              className="group border border-gray-300 rounded-lg overflow-hidden shadow-sm cursor-pointer"
            >
              <div className="flex justify-between items-center px-8 py-5 bg-white group-hover:bg-gray-100 transition">
                <span className="text-lg font-semibold text-gray-800">{question}</span>
                <span className="text-[#4C9684] group-hover:hidden">
                  <Plus className="w-6 h-6" />
                </span>
                <span className="text-[#166955] hidden group-hover:block">
                  <Minus className="w-6 h-6" />
                </span>
              </div>
              <div className="px-8 overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500 ease-in-out">
                <p className="text-gray-700 text-base leading-relaxed py-4">{answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {/* <div className="text-center mt-16">
          <p className="text-gray-700 text-lg">
            Didn't find your question?
          </p>
          <a
            href="/contact"
            className="inline-block mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            Contact Our Support Team
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
