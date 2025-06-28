'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Shield,
  Target,
  Heart,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  MessageCircle
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Lomi Oruchukwu Michael',
    role: 'MD / Business Development Lead',
    image: '/images/michaelImage.png',
    bio: 'With experience in procurement, logistics coordination, and client engagement, Lomi leads the company\'s strategy and operations with a commitment to excellence and efficiency.'
  },
  {
    name: 'Egbu Joy Ujunwa',
    role: 'Operations Manager / CTO',
    image: '/images/joyImage.png',
    bio: 'Manages daily operations, coordinates procurement and logistics, and specializes in payment systems and crypto integration to ensure timely and accurate delivery.'
  },
  {
    name: 'Dr. Odumu Moses Ojonugwa',
    role: 'Supply Chain & Risk Analyst',
    image: '/images/mosesImage.png',
    bio: 'A seasoned economist with 10+ years\' experience in supply chain, logistics, and risk analysis. He\'s worked with UNDP, FCDO, and NEPC, and brings expertise in tools like Stata, Power BI, and EViews.'
  }
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We believe in complete transparency in all our transactions and supplier relationships.'
  },
  {
    icon: Globe,
    title: 'Global Reach, Local Focus',
    description: 'Connecting African businesses and governments to global suppliers while understanding local needs.'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Leveraging cutting-edge technology to solve traditional supply chain challenges.'
  },
  {
    icon: Heart,
    title: 'Customer Success',
    description: 'Your success is our success. We\'re committed to helping your business and organization grow.'
  }
];

const stats = [
  { number: '1000+', label: 'Active Businesses & Organizations' },
  { number: '50K+', label: 'Products Sourced' },
  { number: '25+', label: 'Countries' },
  { number: '$2M+', label: 'Trade Volume' }
];

export default function AboutPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
      setContactForm({ name: '', email: '', phone: '', company: '', message: '' });
      setShowContactModal(false);
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About Suplar</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transforming African Trade Through Technology
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re building the future of B2B and B2G commerce in Africa, connecting businesses
            and government organizations to global suppliers through innovative blockchain technology and seamless logistics.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To democratize global trade for African businesses and government organizations by providing a transparent,
              efficient, and technology-driven supply chain management platform that connects local companies and institutions with
              verified international suppliers, enabling seamless procurement and fostering
              economic growth across the continent.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To become Africa&apos;s leading B2B and B2G supply chain management platform, empowering millions of
              businesses and government organizations with access to global markets while building a more connected,
              prosperous, and sustainable African economy through innovative technology
              and strategic partnerships.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"

                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our supply chain management platform or want to learn more about how
                Suplar can help your business or organization? We&apos;d love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <a
                    href="mailto:info.suplar@gmail.com"
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    info.suplar@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <a
                    href="tel:+2348062249498"
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    +2348062249498
                  </a>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <a href="https://wa.me/2349036735450" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    WhatsApp: 09036735450
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <a
                    href="https://maps.google.com/?q=9+Omojolowo+Street,+Hotel+Bus+Stop,+Igando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    9 Omojolowo Street, Hotel Bus Stop, Igando
                  </a>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button variant="outline" size="sm" onClick={() => alert('LinkedIn page coming soon!')}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('Twitter page coming soon!')}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>

            <div>
              <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4 bg-gradient-to-r from-blue-600 to-green-600">
                    Send us a Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="about-name">Name *</Label>
                        <Input
                          id="about-name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-email">Email *</Label>
                        <Input
                          id="about-email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="about-phone">Phone</Label>
                        <Input
                          id="about-phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-company">Company</Label>
                        <Input
                          id="about-company"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="about-message">Message *</Label>
                      <Textarea
                        id="about-message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Start?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join thousands of businesses and organizations already using Suplar to streamline their procurement.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = '/products'}
                >
                  Browse Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}