import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Coffee, 
  Users, 
  AlertTriangle, 
  DollarSign,
  Archive,
  FileText,
  Package
} from 'lucide-react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { BottomNav } from '@/components/Navigation/BottomNav';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminDashboard = ({ onNavigate, activeTab, onTabChange }: AdminDashboardProps) => {
  const metrics = [
    {
      title: 'Daily Items Consumed',
      value: '1,250',
      icon: Coffee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Visitors',
      value: '350',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Low Stock Alerts',
      value: '12',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Weekly Spending',
      value: '$4,500',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivity = [
    {
      title: 'Coffee added',
      subtitle: 'By John Doe, 12 units',
      time: '5 min ago',
      icon: Coffee,
      color: 'text-blue-600'
    },
    {
      title: 'Biscuits consumed',
      subtitle: 'By Jane Smith, 2 units',
      time: '1 hr ago',
      icon: Coffee,
      color: 'text-orange-600'
    },
    {
      title: 'Tea restocked',
      subtitle: 'By Admin, 50 units',
      time: '3 hrs ago',
      icon: Coffee,
      color: 'text-green-600'
    },
    {
      title: 'Items sold',
      subtitle: '10 units to customer #123',
      time: 'Yesterday',
      icon: Package,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileLayout title="Admin Dashboard">
        <div className="p-4 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="metric-card p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground font-medium">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onNavigate('log-consumption')}
                className="h-16 flex flex-col items-center gap-2"
              >
                <Archive className="h-5 w-5" />
                <span className="font-semibold">Log Consumption</span>
              </Button>
              
              <Button
                onClick={() => onNavigate('reports')}
                variant="outline"
                className="h-16 flex flex-col items-center gap-2"
              >
                <FileText className="h-5 w-5" />
                <span className="font-semibold">View Reports</span>
              </Button>
            </div>
            
            <Button
              onClick={() => onNavigate('manage-items')}
              variant="outline"
              className="w-full h-16 flex items-center justify-center gap-2"
            >
              <Package className="h-5 w-5" />
              <span className="font-semibold">Manage Items</span>
            </Button>
          </div>

          {/* Recent Activity */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="activity-item flex items-start gap-3 p-3 rounded-lg">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
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