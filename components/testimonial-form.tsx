'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Star } from 'lucide-react';

export function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    category: '',
    testimonial: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.testimonial || !formData.email || rating === 0) {
      alert('Please fill in all required fields and provide a rating.');
      return;
    }

    // In a real app, this would submit to backend API
    alert('Thank you for your testimonial! It will be reviewed and published soon.');
    
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
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Share Your Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input 
                id="company" 
                placeholder="Enter your company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Your Role</Label>
              <Input 
                id="role" 
                placeholder="e.g., CEO, Manager, Director"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Business Category</Label>
              <Select onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical/Healthcare</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="research">Research/Education</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Rating *</Label>
            <div className="flex items-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="testimonial">Your Testimonial *</Label>
            <Textarea 
              id="testimonial" 
              placeholder="Share your experience with Suplar. How has our platform helped your business?"
              rows={4}
              className="mt-2"
              value={formData.testimonial}
              onChange={(e) => handleInputChange('testimonial', e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="We'll use this to verify your testimonial"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Your email will not be displayed publicly
            </p>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Submit Testimonial
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            All testimonials are reviewed before being published. Thank you for sharing your experience!
          </p>
        </form>
      </CardContent>
    </Card>
  );
}