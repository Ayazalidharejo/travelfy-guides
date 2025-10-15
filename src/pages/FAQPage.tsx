import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Booking & Reservations',
      questions: [
        {
          question: 'How do I make a booking?',
          answer: 'You can make a booking by selecting your desired tour, choosing the date and number of participants, selecting a vehicle, and completing the payment process. Our system will send you an instant confirmation via email.'
        },
        {
          question: 'Can I modify my booking after confirmation?',
          answer: 'Yes, you can modify your booking up to 24 hours before the tour start time. Please contact our customer support team or use the "Manage Booking" option in your account.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway.'
        },
        {
          question: 'When will I receive my booking confirmation?',
          answer: 'You will receive an instant email confirmation as soon as your payment is processed successfully. Please check your spam folder if you don\'t see it in your inbox.'
        }
      ]
    },
    {
      category: 'Cancellation & Refunds',
      questions: [
        {
          question: 'What is your cancellation policy?',
          answer: 'You can cancel free of charge up to 24 hours before the tour start time. Cancellations made within 24 hours may be subject to a cancellation fee. Please refer to our Cancellation Policy page for detailed information.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your bank or payment provider.'
        },
        {
          question: 'Can I get a refund if the tour is cancelled by you?',
          answer: 'Yes, if we cancel a tour due to weather, safety concerns, or other reasons, you will receive a full refund or the option to reschedule to another date at no additional cost.'
        }
      ]
    },
    {
      category: 'Tours & Services',
      questions: [
        {
          question: 'What vehicles do you use for tours?',
          answer: 'We have a premium fleet including Toyota Alphard, Vellfire, Mercedes Benz, Land Cruiser Prado, Toyota Crown, and various sizes of Commuter Vans. All vehicles are well-maintained, air-conditioned, and equipped with modern amenities.'
        },
        {
          question: 'Are tour guides English-speaking?',
          answer: 'Yes, all our tour guides are fluent in English and are professionally trained to provide you with detailed information about each destination.'
        },
        {
          question: 'What is included in the tour price?',
          answer: 'Tour prices typically include transportation, English-speaking guide, pickup and drop-off service, and taxes. Specific inclusions vary by tour - please check the tour details page for complete information.'
        },
        {
          question: 'Can I customize a tour?',
          answer: 'Yes, we offer customizable private tours. Please contact our customer support team with your requirements, and we\'ll create a personalized itinerary for you.'
        }
      ]
    },
    {
      category: 'Safety & Requirements',
      questions: [
        {
          question: 'Are your vehicles and drivers insured?',
          answer: 'Yes, all our vehicles are comprehensively insured, and our drivers are licensed professionals with extensive experience and excellent safety records.'
        },
        {
          question: 'Do you provide child seats?',
          answer: 'Yes, we can provide baby strollers and child seats upon request. Please mention this requirement when making your booking.'
        },
        {
          question: 'Are your tours wheelchair accessible?',
          answer: 'We offer wheelchair-accessible vehicles for most of our tours. Please select the wheelchair accessibility option when booking or contact us in advance.'
        },
        {
          question: 'What should I bring on the tour?',
          answer: 'We recommend bringing comfortable clothing, walking shoes, sunscreen, a camera, and personal items. Specific tours may have additional requirements - please check the tour details.'
        }
      ]
    },
    {
      category: 'Account & Technical',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Login" button in the top right corner, then select "Sign Up". Fill in your details to create your account. You can also sign up during the booking process.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.'
        },
        {
          question: 'Can I view my past bookings?',
          answer: 'Yes, after logging into your account, go to "My Bookings" to view all your past and upcoming bookings.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.'
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      globalIndex: catIndex * 100 + qIndex
    }))
  );

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allQuestions;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-16 w-16" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find answers to common questions about our tours, bookings, and services
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          {searchQuery ? (
            // Search Results
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                <>
                  <p className="text-muted-foreground mb-6">
                    Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
                  </p>
                  {filteredQuestions.map((item) => (
                    <Card
                      key={item.globalIndex}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => toggleQuestion(item.globalIndex)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-xs text-primary font-semibold mb-2">
                              {item.category}
                            </div>
                            <CardTitle className="text-lg">{item.question}</CardTitle>
                          </div>
                          {openIndex === item.globalIndex ? (
                            <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </CardHeader>
                      {openIndex === item.globalIndex && (
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground">{item.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try different keywords or browse categories below
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Category View
            <div className="space-y-8">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h2 className="text-2xl font-bold mb-4 text-primary">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => {
                      const globalIndex = catIndex * 100 + qIndex;
                      return (
                        <Card
                          key={globalIndex}
                          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => toggleQuestion(globalIndex)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <CardTitle className="text-lg flex-1">
                                {item.question}
                              </CardTitle>
                              {openIndex === globalIndex ? (
                                <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                              )}
                            </div>
                          </CardHeader>
                          {openIndex === globalIndex && (
                            <CardContent className="pt-0">
                              <p className="text-muted-foreground">{item.answer}</p>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our customer support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/help">
              <button className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </a>
            <a href="/contact">
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Send Us a Message
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
