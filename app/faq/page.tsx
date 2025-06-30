'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, Mail } from 'lucide-react';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I create an account on Suplar?',
        answer: 'You can browse our products without an account, but you\'ll need to sign up when you\'re ready to checkout. Click the "Sign Up" button in the top navigation, fill in your details, and you\'ll be ready to start purchasing.'
      },
      {
        question: 'Do I need to connect a wallet to use Suplar?',
        answer: 'Wallet connection is optional during signup but required if you want to pay with cryptocurrency (USDC or XLM). You can also pay with traditional methods like credit cards or bank transfers without a wallet.'
      },
      {
        question: 'What types of businesses can use Suplar?',
        answer: 'Suplar serves B2B, B2C, and B2G customers. Whether you\'re a small business, large corporation, or government entity, our platform can help streamline your procurement process.'
      }
    ]
  },
  {
    category: 'Products & Sourcing',
    questions: [
      {
        question: 'How many products are available on Suplar?',
        answer: 'We currently have over 15,000 products across 6 main categories: Medical Equipment, Electrical Materials, Office Equipment, Diagnostic Lab Equipment, Research Lab Equipment, and Industrial Chemicals.'
      },
      {
        question: 'Are all suppliers verified?',
        answer: 'Yes, all suppliers on our platform go through a rigorous verification process. We check their business credentials, quality certifications, and track record to ensure you\'re working with reliable partners.'
      },
      {
        question: 'Can I request a product that\'s not listed?',
        answer: 'Absolutely! Use our "Request a Product" feature to tell us what you need. Our team will source it from our network of verified suppliers and get back to you within 24-48 hours.'
      },
      {
        question: 'How do I compare products from different suppliers?',
        answer: 'Each product listing shows supplier information, ratings, reviews, and pricing. You can easily compare options and choose the best supplier based on your requirements.'
      }
    ]
  },
  {
    category: 'Payments & Pricing',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cryptocurrency payments (USDC and XLM on the Stellar network), credit/debit cards, and bank transfers. Choose the method that works best for your business.'
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees! All costs including product prices, logistics fees, and any applicable taxes are clearly displayed before you complete your purchase.'
      },
      {
        question: 'How is the logistics fee calculated?',
        answer: 'Logistics fees are automatically calculated based on your delivery address and the shipping zone. For example, Lagos Mainland is ₦1,500, Lagos Island is ₦2,000, and remote areas may be ₦7,500+.'
      },
      {
        question: 'Do you offer bulk discounts?',
        answer: 'Yes, many suppliers offer quantity-based discounts. The more you order, the better the unit price. Bulk pricing is automatically applied at checkout.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        question: 'How long does delivery take?',
        answer: 'Delivery times vary by product and location. Typically, local deliveries take 3-5 business days, while international shipments may take 7-14 days. Exact timelines are provided at checkout.'
      },
      {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order ships, you\'ll receive a tracking number and can monitor your shipment in real-time through our tracking page or via SMS/email updates.'
      },
      {
        question: 'What areas do you deliver to?',
        answer: 'We deliver across Nigeria and are expanding to other African countries. Major cities like Lagos, Abuja, Port Harcourt, Kano, and Ibadan have optimized delivery networks.'
      },
      {
        question: 'What if my order is damaged during shipping?',
        answer: 'We have quality assurance processes in place, but if your order arrives damaged, contact our support team immediately. We\'ll work with you and the supplier to resolve the issue quickly.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'I\'m having trouble connecting my wallet. What should I do?',
        answer: 'Make sure you have the wallet extension installed (Freighter for Stellar, MetaMask for Ethereum). If you\'re still having issues, try refreshing the page or contact our technical support team.'
      },
      {
        question: 'Why can\'t I see my cart items?',
        answer: 'Cart items are stored locally in your browser. If you\'re using a different device or cleared your browser data, your cart may be empty. Try adding items again or sign in to sync your cart.'
      },
      {
        question: 'The website is loading slowly. Is there an issue?',
        answer: 'Slow loading can be due to internet connectivity or high traffic. Try refreshing the page or clearing your browser cache. If the issue persists, contact our support team.'
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqCategories);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredFAQs(faqCategories);
      return;
    }

    const filtered = faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(
        q =>
          q.question.toLowerCase().includes(query.toLowerCase()) ||
          q.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);

    setFilteredFAQs(filtered);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add Web3Forms access key
      formData.append("access_key", "27627ac5-9c82-49bd-8fe0-74298b41d422");

      // Add form fields
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("subject", contactForm.subject);
      formData.append("message", contactForm.message);

      // Add custom recipient email
      formData.append("to", "info.suplar@gmail.com");

      // Add custom subject line
      formData.append("subject", `FAQ Support: ${contactForm.subject}`);

      // Create formatted message
      const formattedMessage = `
New support question from FAQ page:

Name: ${contactForm.name}
Email: ${contactForm.email}
Subject: ${contactForm.subject}

Question:
${contactForm.message}

---
This email was sent from the Suplar Ventures FAQ page.
Reply directly to this email to respond to the customer.
      `;

      formData.append("message", formattedMessage);

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for your question! We have received it and will get back to you within 24 hours.');
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setShowContactModal(false);
      } else {
        alert('Failed to send question. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about using Suplar
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6 mb-12">
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && searchQuery && (
          <Card>
            <CardContent className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any FAQs matching &quot;{searchQuery}&quot;. Try a different search term or contact our support team.
              </p>
              <Button onClick={() => handleSearch('')} variant="outline">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ask a Question</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="faq-name">Name *</Label>
                        <Input
                          id="faq-name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="faq-email">Email *</Label>
                        <Input
                          id="faq-email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="faq-subject">Subject *</Label>
                      <Input
                        id="faq-subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="faq-message">Question *</Label>
                      <Textarea
                        id="faq-message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Question'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => window.location.href = 'mailto:info.suplar@gmail.com'}>
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}