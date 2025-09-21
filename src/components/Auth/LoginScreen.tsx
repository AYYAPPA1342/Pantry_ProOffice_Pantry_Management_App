import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Building2, Package } from 'lucide-react';
import { MobileLayout } from '@/components/Layout/MobileLayout';

interface LoginScreenProps {
  onLogin: (role: 'admin' | 'vendor') => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'vendor' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Status Bar */}
      <div className="mobile-status px-4 py-2 text-white text-sm font-medium">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white/70 rounded-full"></div>
              <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            </div>
            <span className="ml-2">📶</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card px-4 py-6 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Pantry Management</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Welcome! Please select your role to proceed.
          </h2>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={selectedRole === 'admin' ? 'default' : 'outline'}
            onClick={() => setSelectedRole('admin')}
            className="h-24 flex flex-col items-center gap-2"
          >
            <Building2 className="h-8 w-8" />
            <span className="font-semibold">Company Admin</span>
          </Button>
          
          <Button
            variant={selectedRole === 'vendor' ? 'default' : 'outline'}
            onClick={() => setSelectedRole('vendor')}
            className="h-24 flex flex-col items-center gap-2"
          >
            <Package className="h-8 w-8" />
            <span className="font-semibold">Vendor</span>
          </Button>
        </div>

        {/* Login Form */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="your@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>
        </Card>

        {/* Sign In Button */}
        <Button
          onClick={handleLogin}
          disabled={!selectedRole || !email || !password}
          className="w-full h-12 font-semibold"
          size="lg"
        >
          Sign In
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <Button variant="link" className="text-primary">
            Forgot password?
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="h-6 w-6 rounded bg-muted"></div>
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="h-6 w-6 rounded bg-muted"></div>
            <span className="text-xs">Profile</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="h-6 w-6 rounded bg-muted"></div>
            <span className="text-xs">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};