import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { SuplarInfographic } from '@/components/suplar-infographic';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { StatsSection } from '@/components/stats-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { CTASection } from '@/components/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SuplarInfographic />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}