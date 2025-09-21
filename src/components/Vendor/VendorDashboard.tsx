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
  const revenueData = [
    { label: 'Monthly Revenue', value: '$12,450', icon: DollarSign },
    { label: 'Items Sold', value: '485', icon: Package },
    { label: 'Pending Receipts', value: '5', icon: Receipt },
    { label: 'Payment Status', value: 'Paid', icon: CheckCircle }
  ];

  const priceItems = [
    { id: 'coffee', name: 'Coffee', currentPrice: 2.00 },
    { id: 'tea', name: 'Tea', currentPrice: 1.50 },
    { id: 'biscuits', name: 'Biscuits', currentPrice: 0.75 },
    { id: 'snacks', name: 'Snacks', currentPrice: 1.20 }
  ];

  const logoutAction = (
    <Button 
      variant="ghost" 
      onClick={onLogout} 
      className="text-primary-foreground hover:bg-white/10"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileLayout title="Vendor Portal" rightAction={logoutAction}>
        <div className="p-4 space-y-6">
          {/* Revenue Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Revenue Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {revenueData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="metric-card p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{item.value}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Payment Status */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Paid</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Price Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Price Management</h3>
            <div className="space-y-3">
              {priceItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Current price per unit</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">$</span>
                        <Input
                          type="number"
                          value={item.currentPrice.toFixed(2)}
                          className="w-20 h-8 text-center"
                          step="0.01"
                        />
                      </div>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2">
              <Receipt className="h-5 w-5" />
              <span className="font-semibold">View Receipts</span>
            </Button>
            
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Update Inventory</span>
            </Button>
          </div>

          {/* Recent Transactions */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {[
                { item: 'Coffee', amount: '$24.00', time: '2 hrs ago', status: 'completed' },
                { item: 'Tea & Biscuits', amount: '$8.25', time: '4 hrs ago', status: 'completed' },
                { item: 'Snacks Bundle', amount: '$15.60', time: '1 day ago', status: 'pending' }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{transaction.item}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-foreground">{transaction.amount}</p>
                    <div className="flex items-center gap-1">
                      {transaction.status === 'completed' ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Clock className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </MobileLayout>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        userRole="vendor" 
      />
    </div>
  );
};