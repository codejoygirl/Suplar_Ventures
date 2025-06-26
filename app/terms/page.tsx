'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            Terms of Use
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suplar Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using Suplar's platform, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Platform Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  Suplar is a B2B, B2C, and B2G supply chain management platform that connects African and global businesses 
                  with verified suppliers. We facilitate procurement, payment processing, and logistics coordination.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
                <p className="text-gray-600 leading-relaxed">
                  Users may browse products without creating an account. However, account creation is required for checkout and order processing. 
                  You are responsible for maintaining the confidentiality of your account information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payment Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We accept various payment methods including cryptocurrency (USDC, XLM), credit/debit cards, and bank transfers. 
                  All prices are subject to change without notice. Payment processing fees may apply.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Shipping and Delivery</h2>
                <p className="text-gray-600 leading-relaxed">
                  Delivery fees are calculated based on destination zones. We strive to provide accurate delivery estimates, 
                  but actual delivery times may vary due to factors beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  Suplar shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For questions about these Terms of Use, please contact us at:
                  <br />
                  Email: info.suplar@gmail.com
                  <br />
                  Phone: +2348062249498
                  <br />
                  Address: 9 Omojolowo Street, Hotel Bus Stop, Igando
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}