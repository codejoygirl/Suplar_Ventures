import { TestimonialGrid } from '@/components/testimonial-grid';
import { TestimonialForm } from '@/components/testimonial-form';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from businesses and organizations across Africa who have transformed their procurement 
            processes with our supply chain management platform.
          </p>
        </div>
        
        <TestimonialGrid />
        <TestimonialForm />
      </div>
    </div>
  );
}