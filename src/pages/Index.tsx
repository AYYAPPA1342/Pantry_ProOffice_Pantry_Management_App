import { useState } from 'react';
import { LoginScreen } from '@/components/Auth/LoginScreen';
import { AdminDashboard } from '@/components/Dashboard/AdminDashboard';
import { LogConsumption } from '@/components/Consumption/LogConsumption';
import { ReportsScreen } from '@/components/Reports/ReportsScreen';
import { VendorDashboard } from '@/components/Vendor/VendorDashboard';

type UserRole = 'admin' | 'vendor' | null;
type Screen = 'login' | 'dashboard' | 'log-consumption' | 'reports' | 'vendor-dashboard';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') {
      setCurrentScreen('dashboard');
      setActiveTab('dashboard');
    } else {
      setCurrentScreen('vendor-dashboard');
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('login');
    setActiveTab('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Map tab to screen
    switch (tab) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'log-items':
        setCurrentScreen('log-consumption');
        break;
      case 'reports':
        setCurrentScreen('reports');
        break;
      case 'home':
        setCurrentScreen('vendor-dashboard');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    if (userRole === 'admin') {
      setCurrentScreen('dashboard');
      setActiveTab('dashboard');
    } else {
      setCurrentScreen('vendor-dashboard');
      setActiveTab('home');
    }
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentScreen === 'dashboard' && userRole === 'admin') {
    return (
      <AdminDashboard
        onNavigate={handleNavigate}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    );
  }

  if (currentScreen === 'log-consumption' && userRole === 'admin') {
    return <LogConsumption onBack={handleBack} />;
  }

  if (currentScreen === 'reports' && userRole === 'admin') {
    return (
      <ReportsScreen
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    );
  }

  if (currentScreen === 'vendor-dashboard' && userRole === 'vendor') {
    return (
      <VendorDashboard
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
    );
  }

  return <LoginScreen onLogin={handleLogin} />;
};

export default Index;
