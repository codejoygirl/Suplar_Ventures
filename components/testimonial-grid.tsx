import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Adebayo Ogundimu',
    company: 'Lagos Medical Center',
    role: 'Chief Medical Officer',
    content: 'Suplar has revolutionized how we source medical equipment. The transparency in pricing and delivery tracking gives us complete confidence in our procurement process. We\'ve reduced our equipment sourcing time by 60%.',
    rating: 5,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Medical',
    verified: true,
  },
  {
    id: 2,
    name: 'Fatima Al-Hassan',
    company: 'TechHub Abuja',
    role: 'Operations Director',
    content: 'The ability to pay with crypto has streamlined our international purchases. We\'ve reduced our procurement cycle from weeks to days. The customer support team is exceptional.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Technology',
    verified: true,
  },
  {
    id: 3,
    name: 'James Ochieng',
    company: 'Nairobi Manufacturing Ltd',
    role: 'Supply Chain Manager',
    content: 'Suplar\'s vetted supplier network has helped us find reliable partners across Africa. The quality assurance process is exceptional and has saved us from costly mistakes.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Manufacturing',
    verified: true,
  },
  {
    id: 4,
    name: 'Sarah Mensah',
    company: 'Ghana Research Institute',
    role: 'Lab Director',
    content: 'The specialized lab equipment category has everything we need. Customer support is responsive and the delivery tracking is accurate. Highly recommend for research institutions.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Research',
    verified: true,
  },
  {
    id: 5,
    name: 'Ahmed Kone',
    company: 'Ivory Coast Logistics',
    role: 'CEO',
    content: 'As a logistics company, we appreciate Suplar\'s attention to delivery details. The platform has helped us expand our client base significantly.',
    rating: 4,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Logistics',
    verified: true,
  },
  {
    id: 6,
    name: 'Amina Diallo',
    company: 'Senegal Health Services',
    role: 'Procurement Manager',
    content: 'The medical equipment sourcing has been a game-changer for our healthcare facilities. Quality products at competitive prices with reliable delivery.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Healthcare',
    verified: true,
  },
];

export function TestimonialGrid() {
  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.category}
                  </Badge>
                  {testimonial.verified && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}