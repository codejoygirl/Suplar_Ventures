'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  Globe,
  BarChart3,
  LineChart,
  Download,
  ExternalLink
} from 'lucide-react';
import { BusinessChart } from '@/components/business-chart';

// Mock data - in production this would be fetched based on report ID
const investorReportData = {
  reportDate: '2025-01-15',
  companyName: 'Suplar Ventures',
  reportTitle: 'Q2 2025 Business Performance Report',
  overview: {
    totalUsers: 18,
    totalTransactions: 7,
    totalRevenue: 100.00,
    activeSuppliers: 12,
    monthlyGrowth: 180.0,
    conversionRate: 38.9
  },
  monthlyData: [
    { month: 'Jan 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Feb 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Mar 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Apr 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'May 2025', users: 8, transactions: 3, revenue: 45.00 },
    { month: 'Jun 2025', users: 18, transactions: 7, revenue: 100.00 }
  ],
  keyMetrics: [
    { label: 'Customer Acquisition Cost', value: '$2.50', trend: 'down' },
    { label: 'Lifetime Value', value: '$28.50', trend: 'up' },
    { label: 'Market Penetration', value: '0.02%', trend: 'up' },
    { label: 'Supplier Satisfaction', value: '95%', trend: 'up' }
  ],
  marketInsights: [
    'Strong traction in Nigerian healthcare sector (60% of transactions)',
    'Educational institutions showing high engagement (25% of users)',
    'China supplier network providing competitive pricing advantage',
    'Average transaction value growing 15% month-over-month'
  ],
  riskFactors: [
    'Early stage with limited transaction history',
    'Dependency on Nigerian market (83% of users)',
    'Competition from established procurement platforms',
    'Regulatory changes in cross-border trade'
  ]
};

export default function InvestorReport() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate access token
    const token = searchParams?.get('token');
    const reportId = params?.id;
    
    // In production, this would validate against your backend
    // For demo purposes, using hardcoded credentials
    if (token && token.startsWith('view-only-') && reportId) {
      setIsValidToken(true);
    }
    setLoading(false);
  }, [params?.id, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">Invalid or expired access token. Please request a new link.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{investorReportData.companyName}</h1>
                  <p className="text-gray-600">{investorReportData.reportTitle}</p>
                </div>
              </div>
              <Badge variant="secondary">View-Only Report</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Report Date</p>
              <p className="font-medium">{investorReportData.reportDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{investorReportData.overview.totalUsers}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">${investorReportData.overview.totalRevenue}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{investorReportData.overview.conversionRate}%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">{investorReportData.overview.activeSuppliers}</p>
                <p className="text-sm text-gray-600">Active Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2" />
                Revenue Growth (2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessChart 
                data={investorReportData.monthlyData} 
                type="area" 
                dataKey="revenue"
                color="#10b981"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                User Acquisition (2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessChart 
                data={investorReportData.monthlyData} 
                type="bar" 
                dataKey="users"
                color="#3b82f6"
              />
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {investorReportData.keyMetrics.map((metric, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">{metric.value}</p>
                    <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights & Risk Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {investorReportData.marketInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {investorReportData.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{risk}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Investment Opportunity</h3>
            <p className="text-gray-600 mb-4">
              Suplar is positioned to capture the growing African B2B procurement market with innovative blockchain technology and strong early traction.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact for Investment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            This report contains forward-looking statements and projections. Past performance does not guarantee future results. 
            All financial data is preliminary and subject to audit. For investment inquiries, please contact info.suplar@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}