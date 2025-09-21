import { Home, BarChart3, Settings, User, Archive, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'admin' | 'vendor';
}

export const BottomNav = ({ activeTab, onTabChange, userRole }: BottomNavProps) => {
  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'log-items', label: 'Log Items', icon: Archive },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const vendorTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const tabs = userRole === 'admin' ? adminTabs : vendorTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 h-auto min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};