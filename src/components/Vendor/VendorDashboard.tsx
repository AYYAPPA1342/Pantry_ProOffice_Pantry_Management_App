import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DollarSign,
  Package,
  Receipt,
  CheckCircle,
  Clock,
  Edit2,
  LogOut
} from 'lucide-react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { BottomNav } from '@/components/Navigation/BottomNav';

interface VendorDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const VendorDashboard = ({ activeTab, onTabChange, onLogout }: VendorDashboardProps) => {
  const summaryData = [
    { label: 'Monthly Revenue', value: '$12,450', icon: DollarSign },
    { label: 'Items Sold', value: '485', icon: Package },
    { label: 'Pending Receipts', value: '5', icon: Receipt },
    { label: 'Payment Status', value: 'Paid', icon: CheckCircle }
  ];

  const recentOrders = [
    { item: 'Coffee', date: '2 hrs ago', quantity: 12, amount: '24.00' },
    { item: 'Tea & Biscuits', date: '4 hrs ago', quantity: 3, amount: '8.25' },
    { item: 'Snacks Bundle', date: '1 day ago', quantity: 8, amount: '15.60' }
  ];

  const [priceItems, setPriceItems] = useState([
    { id: 'coffee', name: 'Coffee', currentPrice: 2.00 },
    { id: 'tea', name: 'Tea', currentPrice: 1.50 },
    { id: 'biscuits', name: 'Biscuits', currentPrice: 0.75 },
    { id: 'snacks', name: 'Snacks', currentPrice: 1.20 }
  ]);

  const updatePrice = (itemId: string, newPrice: number) => {
    setPriceItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, currentPrice: newPrice } : item
    ));
  };

  const logoutAction = (
    <Button 
      variant="ghost" 
      onClick={onLogout} 
      className="text-primary-foreground hover:bg-white/10"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vendor Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Vendor Name</label>
                  <Input value="ABC Food Supplies" readOnly className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input value="contact@abcfoodsupplies.com" readOnly className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input value="+1 (555) 123-4567" readOnly className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Business License</label>
                  <Input value="BL-2024-001234" readOnly className="bg-muted" />
                </div>
              </div>
            </Card>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Notification Preferences</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notifications" defaultChecked />
                      <label htmlFor="email-notifications" className="text-sm">Email notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notifications" />
                      <label htmlFor="sms-notifications" className="text-sm">SMS notifications</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Zone</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        );
        
      default: // home tab
        return (
          <>
            {/* Account Summary */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                {summaryData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Price Management */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Price Management</h2>
              <div className="space-y-3">
                {priceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={item.currentPrice.toFixed(2)}
                        onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                        className="w-20 h-8 text-center"
                        step="0.01"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Update Prices</Button>
            </Card>

            {/* Recent Orders */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{order.item}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.quantity} units</p>
                      <p className="text-sm text-muted-foreground">${order.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        );
    }
  };

  return (
    <MobileLayout title="Vendor Dashboard" rightAction={logoutAction}>
      <div className="space-y-6">
        {renderContent()}
      </div>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        userRole="vendor" 
      />
    </MobileLayout>
  );
};