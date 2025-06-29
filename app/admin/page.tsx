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

// Mock analytics data - in production, this would come from your backend
const mockAnalytics = {
  overview: {
    totalUsers: 1247,
    totalTransactions: 3456,
    totalRevenue: 2847392.50,
    activeSuppliers: 89,
    monthlyGrowth: 23.5,
    conversionRate: 4.2
  },
  recentActivity: [
    { id: 1, type: 'signup', user: 'Dr. Adebayo Ogundimu', company: 'Lagos Medical Center', timestamp: '2025-01-15 14:30' },
    { id: 2, type: 'transaction', user: 'Fatima Al-Hassan', amount: '$1,299.99', product: 'Laboratory Microscope', timestamp: '2025-01-15 13:45' },
    { id: 3, type: 'signup', user: 'James Ochieng', company: 'Nairobi Manufacturing Ltd', timestamp: '2025-01-15 12:20' },
    { id: 4, type: 'transaction', user: 'Sarah Mensah', amount: '$245.99', product: 'Ergonomic Office Chair', timestamp: '2025-01-15 11:15' },
    { id: 5, type: 'inquiry', user: 'Ahmed Kone', subject: 'Bulk Medical Equipment Order', timestamp: '2025-01-15 10:30' }
  ],
  monthlyData: [
    { month: 'Jan', users: 156, transactions: 234, revenue: 234567 },
    { month: 'Feb', users: 189, transactions: 289, revenue: 289456 },
    { month: 'Mar', users: 234, transactions: 345, revenue: 345678 },
    { month: 'Apr', users: 267, transactions: 398, revenue: 398765 },
    { month: 'May', users: 298, transactions: 456, revenue: 456789 },
    { month: 'Jun', users: 334, transactions: 523, revenue: 523456 }
  ],
  topProducts: [
    { name: 'Digital Blood Pressure Monitor', sales: 234, revenue: 21056.66 },
    { name: 'Laboratory Microscope', sales: 67, revenue: 87099.33 },
    { name: 'Ergonomic Office Chair', sales: 145, revenue: 35668.55 },
    { name: 'Industrial Cable Set', sales: 189, revenue: 8599.50 },
    { name: 'Surgical Gloves (Box)', sales: 456, revenue: 11385.44 }
  ],
  usersByCountry: [
    { country: 'Nigeria', users: 567, percentage: 45.5 },
    { country: 'Kenya', users: 234, percentage: 18.8 },
    { country: 'Ghana', users: 189, percentage: 15.2 },
    { country: 'South Africa', users: 123, percentage: 9.9 },
    { country: 'Others', users: 134, percentage: 10.6 }
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
      userDistribution: mockAnalytics.usersByCountry
    };
    
    // In production, this would generate a PDF or send to backend
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `suplar-investor-report-${report.reportDate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Investor report generated! In production, this would be a formatted PDF sent directly to investors.');
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
                <p className="text-sm text-gray-500">Analytics Dashboard</p>
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
                  <p className="text-3xl font-bold text-gray-900">{mockAnalytics.overview.totalUsers.toLocaleString()}</p>
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
                  <p className="text-3xl font-bold text-gray-900">{mockAnalytics.overview.totalTransactions.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+15.3% this month</p>
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
                  <p className="text-sm text-green-600">+28.7% this month</p>
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
                  <p className="text-sm text-green-600">+12.1% this month</p>
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
                    Monthly Growth
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Platform Health</h3>
                    <p className="text-sm text-gray-600">Conversion Rate: {mockAnalytics.overview.conversionRate}%</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Growth Rate</h3>
                    <p className="text-sm text-gray-600">Monthly: +{mockAnalytics.overview.monthlyGrowth}%</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Revenue Growth</h3>
                    <p className="text-sm text-gray-600">YoY: +156%</p>
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
                    <li>• User acquisition and retention metrics</li>
                    <li>• Revenue growth and transaction volume</li>
                    <li>• Geographic distribution of users</li>
                    <li>• Top-performing product categories</li>
                    <li>• Platform health and conversion rates</li>
                    <li>• Growth projections and market analysis</li>
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