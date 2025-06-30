'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Star, Send } from 'lucide-react';

export function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    category: '',
    testimonial: '',
    email: ''
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.testimonial || !formData.email || rating === 0) {
      alert('Please fill in all required fields and provide a rating.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Web3Forms access key - replace with your actual key
      formDataToSend.append("access_key", "27627ac5-9c82-49bd-8fe0-74298b41d422");
      
      // Add form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("testimonial", formData.testimonial);
      formDataToSend.append("rating", rating.toString());
      
      // Add custom recipient email
      formDataToSend.append("to", "info.suplar@gmail.com");
      
      // Add custom subject line
      formDataToSend.append("subject", `New Testimonial Submission - ${rating} Stars from ${formData.name}`);
      
      // Create formatted message
      const formattedMessage = `
New testimonial submission from Suplar Ventures website:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}
Business Category: ${formData.category}
Rating: ${rating} star${rating > 1 ? 's' : ''}

Testimonial:
${formData.testimonial}

---
This testimonial was submitted through the Suplar Ventures website.
Please review and consider publishing this testimonial.
Reply directly to this email to respond to the customer.
      `;
      
      formDataToSend.append("message", formattedMessage);

      const object = Object.fromEntries(formDataToSend);
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
        alert('Thank you for your testimonial! We have received your submission and will review it for publication. We appreciate your feedback!');
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          role: '',
          category: '',
          testimonial: '',
          email: ''
        });
        setRating(0);
      } else {
        alert('Failed to submit testimonial. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while submitting your testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help others discover Suplar by sharing your experience with our platform. 
            Your testimonial helps us grow and improve our services.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center text-2xl">
              <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
              Your Testimonial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Full Name *
                  </Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                    Company Name *
                  </Label>
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                    Your Role
                  </Label>
                  <Input 
                    id="role" 
                    name="role"
                    placeholder="e.g., CEO, Manager, Director"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                    Business Category
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical/Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="research">Research/Education</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="retail">Retail/E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Rating *
                </Label>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''} selected` : 'Please select a rating'}
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="testimonial" className="text-sm font-semibold text-gray-700">
                  Your Testimonial *
                </Label>
                <Textarea 
                  id="testimonial" 
                  name="testimonial"
                  placeholder="Share your experience with Suplar. How has our platform helped your business? What specific benefits have you seen?"
                  rows={5}
                  className="mt-1 resize-none"
                  value={formData.testimonial}
                  onChange={(e) => handleInputChange('testimonial', e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific about how Suplar helped your business. Great testimonials are detailed and authentic.
                </p>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address *
                </Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="We'll use this to verify your testimonial"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your email will not be displayed publicly and is only used for verification purposes.
                </p>
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Testimonial
                  </>
                )}
              </Button>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-sm text-blue-800">
                  <strong>Privacy Notice:</strong> All testimonials are reviewed before being published. 
                  We respect your privacy and will only use your testimonial for marketing purposes with your consent. 
                  Thank you for taking the time to share your experience!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Why Share Your Experience?</h3>
              <p className="text-sm text-gray-600">
                Your testimonial helps other businesses discover how Suplar can solve their challenges and grow their operations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Review Process</h3>
              <p className="text-sm text-gray-600">
                We review all testimonials within 48 hours and will contact you if we&#39;d like to feature your story.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}