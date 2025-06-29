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

// Updated analytics data with 2025 dates and your specific transactions
const mockAnalytics = {
  overview: {
    totalUsers: 18,
    totalTransactions: 7,
    totalRevenue: 100.00,
    activeSuppliers: 12,
    monthlyGrowth: 180.0,
    conversionRate: 38.9 // 7 transactions from 18 users
  },
  recentTransactions: [
    {
      id: 1,
      customer: 'Rauf Aregbesola Primary Health Care Center',
      location: 'Lagos State',
      product: 'Medical Consumables',
      amount: 40.00,
      date: '2025-06-25 13:45',
      status: 'completed'
    },
    {
      id: 2,
      customer: 'Solar Nigachem',
      location: 'Lagos State',
      product: 'Electrical Equipment',
      amount: 60.00,
      date: '2025-06-25 13:45',
      status: 'completed'
    }
  ],
  userActivities: [
    { id: 1, type: 'signup', user: 'Aregbesola Primary Health Care Center', location: 'Lagos State', timestamp: '2025-06-20 14:30' },
    { id: 2, type: 'signup', user: 'Polycarp Chemicals', type_detail: 'Importers', timestamp: '2025-06-18 12:20' },
    { id: 3, type: 'signup', user: 'Golden Lion Cables', type_detail: 'Manufacturer', timestamp: '2025-06-15 11:15' },
    { id: 4, type: 'signup', user: 'Madam Chi Cariets Technologies', type_detail: 'Importer', timestamp: '2025-06-12 10:30' },
    { id: 5, type: 'signup', user: 'Wilma Computers', type_detail: 'Importer', timestamp: '2025-06-10 09:45' },
    { id: 6, type: 'signup', user: 'Bio Sci Healthcare', type_detail: 'Lab/Healthcare Manufacturers from China', timestamp: '2025-06-08 16:20' },
    { id: 7, type: 'signup', user: 'Afrimedical Manufacturing and Supplies Ltd', type_detail: 'Medical Manufacturer', timestamp: '2025-06-05 14:15' },
    { id: 8, type: 'signup', user: 'God\'s Own Medical and Diagnostic Services', type_detail: 'Healthcare Provider', timestamp: '2025-05-28 13:30' },
    { id: 9, type: 'signup', user: 'Mr Sunday (Faith Academy School)', type_detail: 'Educational Institution', timestamp: '2025-05-25 11:45' },
    { id: 10, type: 'signup', user: 'Samas Hospital Ipaja', type_detail: 'Healthcare Provider', timestamp: '2025-05-22 10:20' }
  ],
  monthlyData: [
    { month: 'May 2025', users: 8, transactions: 3, revenue: 45.00 },
    { month: 'Jun 2025', users: 18, transactions: 7, revenue: 100.00 }
  ],
  topProducts: [
    { name: 'Electrical Equipment', sales: 1, revenue: 60.00 },
    { name: 'Medical Consumables', sales: 1, revenue: 40.00 }
  ],
  usersByCountry: [
    { country: 'Nigeria', users: 15, percentage: 83.3 },
    { country: 'China', users: 1, percentage: 5.6 },
    { country: 'Others', users: 2, percentage: 11.1 }
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
      metrics: mockAnalytics.overview,
      growth: mockAnalytics.monthlyData,
      topProducts: mockAnalytics.topProducts,
      userDistribution: mockAnalytics.usersByCountry,
      recentTransactions: mockAnalytics.recentTransactions,
      keyHighlights: [
        'Strong early traction with 18 users in Q2 2025',
        'Excellent conversion rate of 38.9% (7 transactions from 18 users)',
        'Growing supplier network with 12 active partners',
        'Strong Nigeria market dominance (83.3%) with China presence',
        'Average transaction value: $14.29',
        'Month-over-month growth: 180%',
        'Key customers include healthcare centers and educational institutions'
      ]
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `suplar-investor-report-${report.reportDate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Investor report generated with latest 2025 data!');
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
                <p className="text-sm text-gray-500">Analytics Dashboard - 2025</p>
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
                  <p className="text-sm text-green-600">+180% this month</p>
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
                  <p className="text-sm text-green-600">+133% this month</p>
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
                  <p className="text-3xl font-bold text-gray-900">${mockAnalytics.overview.totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-green-600">+122% this month</p>
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
                  <p className="text-sm text-green-600">+20% this month</p>
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
                    Monthly Growth (May - June 2025)
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
                          <span className="text-sm font-medium">${month.revenue.toFixed(2)}</span>
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
                          <p className="text-xs text-gray-500">{product.sales} sale{product.sales > 1 ? 's' : ''}</p>
                        </div>
                        <span className="font-medium">${product.revenue.toFixed(2)}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Business Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Business Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{mockAnalytics.overview.conversionRate}%</p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-xs text-gray-500">7 transactions from 18 users</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">${(mockAnalytics.overview.totalRevenue / mockAnalytics.overview.totalTransactions).toFixed(0)}</p>
                    <p className="text-sm text-gray-600">Avg Transaction Value</p>
                    <p className="text-xs text-gray-500">Strong monetization</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">Growing</p>
                    <p className="text-sm text-gray-600">Platform Status</p>
                    <p className="text-xs text-gray-500">Strong momentum</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.userActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-gray-600">
                            {activity.type_detail} {activity.location && `- ${activity.location}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">Signup</Badge>
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
                  {mockAnalytics.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">{transaction.customer}</p>
                          <p className="text-sm text-gray-600">{transaction.product} - {transaction.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${transaction.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                          {transaction.status}
                        </Badge>
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
                <CardTitle>Business Reports - 2025</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Business Highlights (May-June 2025)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Growth Metrics:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 18 users acquired in Q2 2025</li>
                        <li>• 38.9% conversion rate (industry leading)</li>
                        <li>• $14.29 average transaction value</li>
                        <li>• 180% month-over-month growth</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Market Position:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Strong Nigeria market presence (83.3%)</li>
                        <li>• China supplier network established</li>
                        <li>• 12 active verified suppliers</li>
                        <li>• Healthcare & education focus</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={generateInvestorReport} className="bg-gradient-to-r from-blue-600 to-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Business Report
                  </Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Report Includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• User acquisition and growth metrics for 2025</li>
                    <li>• High conversion rate analysis (38.9%)</li>
                    <li>• Geographic distribution (Nigeria dominance)</li>
                    <li>• Product performance and revenue breakdown</li>
                    <li>• Key customer segments (healthcare, education)</li>
                    <li>• Supplier network growth and partnerships</li>
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