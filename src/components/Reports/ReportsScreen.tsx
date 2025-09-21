import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  TrendingDown,
  Download,
  Coffee,
  Package,
  Droplets,
  Zap
} from 'lucide-react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { BottomNav } from '@/components/Navigation/BottomNav';

interface ReportsScreenProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ReportsScreen = ({ activeTab, onTabChange }: ReportsScreenProps) => {
  const timeRanges = ['Daily', 'Weekly', 'Monthly'];
  const activeRange = 'Monthly';

  const consumptionData = [
    { date: '2023-11-28', item: 'Coffee', qty: 5, visitorType: 'Staff' },
    { date: '2023-11-28', item: 'Snack Bar', qty: 2, visitorType: 'Guest' },
    { date: '2023-11-27', item: 'Water Bottle', qty: 3, visitorType: 'Staff' },
    { date: '2023-11-27', item: 'Energy Drink', qty: 1, visitorType: 'Guest' },
    { date: '2023-11-26', item: 'Sandwich', qty: 1, visitorType: 'Staff' },
    { date: '2023-11-26', item: 'Coffee', qty: 4, visitorType: 'Guest' }
  ];

  const itemBreakdown = [
    { name: 'Coffee', percentage: 45, color: 'bg-blue-500' },
    { name: 'Snacks', percentage: 25, color: 'bg-orange-500' },
    { name: 'Water', percentage: 15, color: 'bg-cyan-500' },
    { name: 'Soft Drinks', percentage: 10, color: 'bg-green-500' },
    { name: 'Others', percentage: 5, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileLayout title="Reports & Analytics">
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <Card className="p-4">
            <div className="text-center text-sm text-muted-foreground font-medium">
              2023-11-01 - 2023-11-30
            </div>
          </Card>

          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={range === activeRange ? 'default' : 'ghost'}
                className="flex-1 rounded-md"
                size="sm"
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="metric-card p-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Consumption</h3>
                <p className="text-2xl font-bold text-foreground">2,345 units</p>
              </div>
            </Card>
            
            <Card className="metric-card p-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Cost Summary</h3>
                <p className="text-2xl font-bold text-foreground">$5,123.50</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">5% from last month</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Most Consumed */}
          <Card className="metric-card p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Most Consumed</h3>
              <p className="text-xl font-bold text-foreground">Coffee (789 units)</p>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+8% from last month</span>
              </div>
            </div>
          </Card>

          {/* Consumption Trends Chart Placeholder */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Consumption Trends</h3>
            <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Chart visualization</p>
              </div>
            </div>
          </Card>

          {/* Item Breakdown */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Item Breakdown</h3>
            <div className="space-y-3">
              {itemBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Options */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>

          {/* Detailed Consumption */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Consumption</h3>
            <div className="space-y-3">
              {consumptionData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{entry.item}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-foreground">Qty: {entry.qty}</p>
                    <p className="text-xs text-muted-foreground">{entry.visitorType}</p>
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
        userRole="admin" 
      />
    </div>
  );
};