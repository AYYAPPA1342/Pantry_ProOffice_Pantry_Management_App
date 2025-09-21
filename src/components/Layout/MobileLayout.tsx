import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

export const MobileLayout = ({
  children,
  title,
  showBack = false,
  onBack,
  rightAction,
  className = ""
}: MobileLayoutProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
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
      <div className="bg-primary px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {showBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
          
          <h1 className="text-lg font-semibold text-primary-foreground">
            {title}
          </h1>
          
          {rightAction || <div className="w-10" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};