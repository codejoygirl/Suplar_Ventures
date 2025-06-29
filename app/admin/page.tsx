'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Shield,
  FileText,
  Share2,
  Copy,
  ExternalLink,
  LineChart
} from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { BusinessChart } from '@/components/business-chart';

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
    { month: 'Jan 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Feb 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Mar 2025', users: 0, transactions: 0, revenue: 0 },
    { month: 'Apr 2025', users: 0, transactions: 0, revenue: 0 },
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const generateShareableLink = () => {
    const reportId = `report-${Date.now()}`;
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/reports/investor/${reportId}?token=view-only-${reportId}`;
    setShareableLink(link);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    alert('Link copied to clipboard!');
  };

  const exportReport = (format: 'pdf' | 'csv') => {
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

    if (format === 'pdf') {
      // Generate PDF-like content
      const pdfContent = `
SUPLAR BUSINESS REPORT - ${report.reportDate}
===========================================

EXECUTIVE SUMMARY
-----------------
Total Users: ${report.metrics.totalUsers}
Total Transactions: ${report.metrics.totalTransactions}
Total Revenue: $${report.metrics.totalRevenue}
Conversion Rate: ${report.metrics.conversionRate}%
Monthly Growth: ${report.metrics.monthlyGrowth}%

GROWTH METRICS
--------------
${report.growth.map(month => `${month.month}: ${month.users} users, ${month.transactions} transactions, $${month.revenue}`).join('\n')}

TOP PRODUCTS
------------
${report.topProducts.map(product => `${product.name}: ${product.sales} sales, $${product.revenue} revenue`).join('\n')}

KEY HIGHLIGHTS
--------------
${report.keyHighlights.map(highlight => `• ${highlight}`).join('\n')}

RECENT TRANSACTIONS
-------------------
${report.recentTransactions.map(t => `${t.customer} - ${t.product} - $${t.amount} - ${t.date}`).join('\n')}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `suplar-business-report-${report.reportDate}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Generate CSV
      const csvContent = [
        ['Metric', 'Value'],
        ['Total Users', report.metrics.totalUsers],
        ['Total Transactions', report.metrics.totalTransactions],
        ['Total Revenue', `$${report.metrics.totalRevenue}`],
        ['Conversion Rate', `${report.metrics.conversionRate}%`],
        ['Monthly Growth', `${report.metrics.monthlyGrowth}%`],
        [''],
        ['Month', 'Users', 'Transactions', 'Revenue'],
        ...report.growth.map(month => [month.month, month.users, month.transactions, `$${month.revenue}`]),
        [''],
        ['Product', 'Sales', 'Revenue'],
        ...report.topProducts.map(product => [product.name, product.sales, `$${product.revenue}`])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `suplar-business-report-${report.reportDate}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    alert(`${format.toUpperCase()} report exported successfully!`);
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
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportReport(exportFormat)}>
                <Download className="w-4 h-4 mr-2" />
                Export {exportFormat.toUpperCase()}
              </Button>
              <Button variant="outline" onClick={generateShareableLink}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
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
              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="w-5 h-5 mr-2" />
                    Revenue Growth (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BusinessChart 
                    data={mockAnalytics.monthlyData} 
                    type="line" 
                    dataKey="revenue"
                    color="#10b981"
                  />
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    User Growth (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BusinessChart 
                    data={mockAnalytics.monthlyData} 
                    type="bar" 
                    dataKey="users"
                    color="#3b82f6"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Transaction Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Transaction Volume (2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BusinessChart 
                  data={mockAnalytics.monthlyData} 
                  type="area" 
                  dataKey="transactions"
                  color="#8b5cf6"
                />
              </CardContent>
            </Card>

            {/* Top Products & Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Users by Country
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.usersByCountry.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{country.country}</span>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">{country.users}</span>
                          <span className="text-sm text-gray-500 ml-2">({country.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

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
                  <h3 className="font-semibold text-lg mb-4">Export Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Download Reports:</h4>
                      <div className="flex space-x-2">
                        <Button onClick={() => exportReport('pdf')} variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button onClick={() => exportReport('csv')} variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download CSV
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Share with Investors:</h4>
                      <Button onClick={generateShareableLink} className="bg-gradient-to-r from-blue-600 to-green-600">
                        <Share2 className="w-4 h-4 mr-2" />
                        Generate Shareable Link
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
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

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Report Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• User acquisition and growth metrics for 2025</li>
                    <li>• High conversion rate analysis (38.9%)</li>
                    <li>• Geographic distribution (Nigeria dominance)</li>
                    <li>• Product performance and revenue breakdown</li>
                    <li>• Key customer segments (healthcare, education)</li>
                    <li>• Supplier network growth and partnerships</li>
                    <li>• Interactive charts and visual analytics</li>
                    <li>• Investor-ready presentation format</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Business Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Shareable Link (View-Only)</Label>
              <div className="flex space-x-2 mt-2">
                <Input value={shareableLink} readOnly className="flex-1" />
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Link Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View-only access (no editing permissions)</li>
                <li>• Real-time data updates</li>
                <li>• Professional investor presentation</li>
                <li>• Secure access with unique token</li>
                <li>• Mobile-friendly responsive design</li>
              </ul>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => window.open(shareableLink, '_blank')} className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview Report
              </Button>
              <Button onClick={() => setShowShareModal(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}