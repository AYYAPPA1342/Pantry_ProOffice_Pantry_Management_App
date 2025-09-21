import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Coffee, 
  Minus,
  Plus,
  Save,
  Calendar,
  Clock,
  Package
} from 'lucide-react';
import { MobileLayout } from '@/components/Layout/MobileLayout';

interface LogConsumptionProps {
  onBack: () => void;
}

interface Item {
  id: string;
  name: string;
  price: number;
  icon: any;
  quantity: number;
}

export const LogConsumption = ({ onBack }: LogConsumptionProps) => {
  const [visitorType, setVisitorType] = useState<'employee' | 'visitor'>('employee');
  const [notes, setNotes] = useState('');
  
  const [items, setItems] = useState<Item[]>([
    { id: 'tea', name: 'Tea', price: 1.50, icon: Coffee, quantity: 0 },
    { id: 'coffee', name: 'Coffee', price: 2.00, icon: Coffee, quantity: 0 },
    { id: 'biscuits', name: 'Biscuits', price: 0.75, icon: Package, quantity: 0 },
    { id: 'snacks', name: 'Other Snacks', price: 1.20, icon: Package, quantity: 0 }
  ]);

  const updateQuantity = (itemId: string, change: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ));
  };

  const handleSave = () => {
    // Save logic here
    onBack();
  };

  const saveAction = (
    <Button variant="ghost" onClick={handleSave} className="text-primary-foreground hover:bg-white/10">
      <Save className="h-5 w-5" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <MobileLayout
        title="Log Consumption"
        showBack
        onBack={onBack}
        rightAction={saveAction}
      >
        <div className="p-4 space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">Sat, Sep 20</span>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">05:15 PM</span>
            </Card>
          </div>

          {/* Visitor Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={visitorType === 'employee' ? 'default' : 'ghost'}
              onClick={() => setVisitorType('employee')}
              className="flex-1 rounded-md"
            >
              Employee
            </Button>
            <Button
              variant={visitorType === 'visitor' ? 'default' : 'ghost'}
              onClick={() => setVisitorType('visitor')}
              className="flex-1 rounded-md"
            >
              Visitor
            </Button>
          </div>

          {/* Item Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Item Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.id} className="p-4 space-y-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} / unit
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="quantity-button w-8 h-8 p-0"
                        disabled={item.quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="text-xl font-bold text-foreground min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="quantity-button w-8 h-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Notes/Comments</h3>
            <Textarea
              placeholder="Add any specific notes or comments about the consumption..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleSave} className="w-full h-12 font-semibold">
              Log Entry
            </Button>
            <Button variant="outline" className="w-full h-12 font-semibold">
              View Today's Log
            </Button>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
};