'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Facebook
} from 'lucide-react';
import { sendEmail } from '@/lib/email-service';

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: `Contact Form: ${contactForm.subject}`,
        message: `
          New contact form submission:
          
          Name: ${contactForm.name}
          Email: ${contactForm.email}
          Phone: ${contactForm.phone}
          Company: ${contactForm.company}
          Category: ${contactForm.category}
          Subject: ${contactForm.subject}
          
          Message:
          ${contactForm.message}
        `,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        company: contactForm.company
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
        setContactForm({
          name: '', email: '', phone: '', company: '', 
          subject: '', category: '', message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info.suplar@gmail.com',
      description: 'Send us an email anytime',
      action: () => window.open('mailto:info.suplar@gmail.com', '_blank')
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+2348062249498',
      description: 'Mon-Fri from 8am to 6pm',
      action: () => window.open('tel:+2348062249498', '_blank')
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '09036735450',
      description: 'Chat with us directly',
      action: () => window.open('https://wa.me/2349036735450', '_blank')
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '9 Omojolowo Street, Hotel Bus Stop, Igando',
      description: 'Come say hello at our office',
      action: () => window.open('https://maps.google.com/?q=9+Omojolowo+Street,+Hotel+Bus+Stop,+Igando', '_blank')
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8am-6pm',
      description: 'Weekend support available',
      action: null
    }
  ];

  const socialLinks = [
    { 
      icon: Linkedin, 
      name: 'LinkedIn', 
      href: '#',
      action: () => alert('LinkedIn page coming soon!')
    },
    { 
      icon: Twitter, 
      name: 'Twitter', 
      href: '#',
      action: () => alert('Twitter page coming soon!')
    },
    { 
      icon: Instagram, 
      name: 'Instagram', 
      href: 'https://www.instagram.com/suplar_ventures?igsh=OTRoNTExcGI2OWZt&utm_source=qr',
      action: () => window.open('https://www.instagram.com/suplar_ventures?igsh=OTRoNTExcGI2OWZt&utm_source=qr', '_blank')
    },
    { 
      icon: Facebook, 
      name: 'Facebook', 
      href: 'https://www.facebook.com/share/16mKMGbGnp/?mibextid=wwXIfr',
      action: () => window.open('https://www.facebook.com/share/16mKMGbGnp/?mibextid=wwXIfr', '_blank')
    },
    { 
      icon: MessageCircle, 
      name: 'WhatsApp', 
      href: 'https://wa.me/2349036735450',
      action: () => window.open('https://wa.me/2349036735450', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Contact Us</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our platform? Need help with an order? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setContactForm({...contactForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <button
                          onClick={info.action || (() => {})}
                          className={`text-gray-900 hover:text-blue-600 transition-colors ${info.action ? 'cursor-pointer' : 'cursor-default'}`}
                          disabled={!info.action}
                        >
                          {info.details}
                        </button>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start"
                        onClick={social.action}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {social.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/track-order'}
                  >
                    Track an Order
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/faq'}
                  >
                    View FAQ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/products'}
                  >
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time Notice */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24 hours during business days. 
              For urgent matters, please call us directly at +2348062249498.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}