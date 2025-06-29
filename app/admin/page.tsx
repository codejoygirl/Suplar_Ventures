'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Globe,
  Eye,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  LogOut,
  Shield
} from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';

// Realistic analytics data for a 2-month-old business (started May 2024)
const mockAnalytics = {
  overview: {
    totalUsers: 15,
    totalTransactions: 8,
    totalRevenue: 2847.50,
    activeSuppliers: 10,
    monthlyGrowth: 67.0, // Higher growth rate for early stage
    conversionRate: 53.3 // 8 transactions from 15 users
  },
  recentActivity: [
    { id: 1, type: 'signup', user: 'Dr. Adebayo Ogundimu', company: 'Lagos Medical Center', timestamp: '2025-01-15 14:30' },
    { id: 2, type: 'transaction', user: 'Fatima Al-Hassan', amount: '$89.99', product: 'Digital Blood Pressure Monitor', timestamp: '2025-01-15 13:45' },
    { id: 3, type: 'signup', user: 'James Ochieng', company: 'Nairobi Manufacturing Ltd', timestamp: '2025-01-14 12:20' },
    { id: 4, type: 'transaction', user: 'Sarah Mensah', amount: '$245.99', product: 'Ergonomic Office Chair', timestamp: '2025-01-14 11:15' },
    { id: 5, type: 'inquiry', user: 'Ahmed Kone', subject: 'Medical Equipment Inquiry', timestamp: '2025-01-13 10:30' }
  ],
  monthlyData: [
    { month: 'May 2024', users: 3, transactions: 1, revenue: 89.99 },
    { month: 'Jun 2024', users: 5, transactions: 2, revenue: 334.98 },
    { month: 'Jul 2024', users: 8, transactions: 3, revenue: 579.97 },
    { month: 'Aug 2024', users: 10, transactions: 4, revenue: 824.96 },
    { month: 'Sep 2024', users: 12, transactions: 6, revenue: 1247.94 },
    { month: 'Oct 2024', users: 15, transactions: 8, revenue: 2847.50 }
  ],
  topProducts: [
    { name: 'Digital Blood Pressure Monitor', sales: 3, revenue: 269.97 },
    { name: 'Ergonomic Office Chair', sales: 2, revenue: 491.98 },
    { name: 'Industrial Cable Set', sales: 2, revenue: 91.00 },
    { name: 'Surgical Gloves (Box)', sales: 1, revenue: 24.99 },
    { name: 'Laboratory Microscope', sales: 1, revenue: 1299.99 }
  ],
  usersByCountry: [
    { country: 'Nigeria', users: 9, percentage: 60.0 },
    { country: 'China', users: 6, percentage: 40.0 },
    { country: 'Kenya', users: 0, percentage: 0.0 },
    { country: 'Ghana', users: 0, percentage: 0.0 },
    { country: 'Others', users: 0, percentage: 0.0 }
  ]
};

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminStore();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const generateInvestorReport = () => {
    const report = {
      reportDate: new Date().toISOString().split('T')[0],
      period: selectedPeriod,
      businessAge: '6 months (Started May 2024)',
      metrics: mockAnalytics.overview,
      growth: mockAnalytics.monthlyData,
      topProducts: mockAnalytics.topProducts,
      userDistribution: mockAnalytics.usersByCountry,
      keyHighlights: [
        'Strong early traction with 15 users in 6 months',
        'High conversion rate of 53.3% (8 transactions from 15 users)',
        'Growing supplier network with 10 active partners',
        'Focus markets: Nigeria (60%) and China (40%)',
        'Average transaction value: $355.94',
        'Month-over-month growth: 67%'
      ]
    };
    
    // In production, this would generate a PDF or send to backend
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `suplar-investor-report-${report.reportDate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Investor report generated! This shows realistic early-stage metrics for a 6-month-old startup.');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Suplar Admin</h1>
                <p className="text-sm text-gray-500">Analytics Dashboard - 6 Months in Business</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={generateInvestorReport}>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{mockAnalytics.overview.totalUsers}</p>
                  <p className="text-sm text-green-600">+{mockAnalytics.overview.monthlyGrowth}% this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-3xl font-bold text-gray-900">{mockAnalytics.overview.totalTransactions}</p>
                  <p className="text-sm text-green-600">+33% this month</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${mockAnalytics.overview.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+128% this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-3xl font-bold text-gray-900">{mockAnalytics.overview.activeSuppliers}</p>
                  <p className="text-sm text-green-600">+25% this month</p>
                </div>
                <Package className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Monthly Growth (Since May 2024)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.monthlyData.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{month.users} users</span>
                          <span className="text-sm text-gray-600">{month.transactions} transactions</span>
                          <span className="text-sm font-medium">${month.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} sales</p>
                        </div>
                        <span className="font-medium">${product.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users by Country */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Users by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {mockAnalytics.usersByCountry.map((country, index) => (
                    <div key={index} className="text-center">
                      <p className="font-medium">{country.country}</p>
                      <p className="text-2xl font-bold text-blue-600">{country.users}</p>
                      <p className="text-sm text-gray-500">{country.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics for Early Stage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Early Stage Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{mockAnalytics.overview.conversionRate}%</p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-xs text-gray-500">8 transactions from 15 users</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">${(mockAnalytics.overview.totalRevenue / mockAnalytics.overview.totalTransactions).toFixed(0)}</p>
                    <p className="text-sm text-gray-600">Avg Transaction Value</p>
                    <p className="text-xs text-gray-500">Strong early monetization</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">6</p>
                    <p className="text-sm text-gray-600">Months in Business</p>
                    <p className="text-xs text-gray-500">Started May 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.recentActivity.filter(activity => activity.type === 'signup').map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">New Signup</Badge>
                        <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.recentActivity.filter(activity => activity.type === 'transaction').map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.product}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{activity.amount}</p>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investor Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Early Stage Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Traction Metrics:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 15 users acquired in 6 months</li>
                        <li>• 53.3% conversion rate (industry avg: 2-3%)</li>
                        <li>• $355.94 average transaction value</li>
                        <li>• 67% month-over-month growth</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Market Position:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Strong Nigeria market presence (60%)</li>
                        <li>• Growing China supplier network (40%)</li>
                        <li>• 10 active verified suppliers</li>
                        <li>• Focus on B2B & B2G segments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={generateInvestorReport} className="bg-gradient-to-r from-blue-600 to-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Investor Report
                  </Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Report Includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Early-stage user acquisition metrics (6 months)</li>
                    <li>• High conversion rate analysis (53.3%)</li>
                    <li>• Geographic distribution (Nigeria & China focus)</li>
                    <li>• Product performance and revenue breakdown</li>
                    <li>• Supplier network growth and partnerships</li>
                    <li>• Growth projections and market opportunity</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}