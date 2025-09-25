import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Calendar, Clock } from "lucide-react";
import { NotificationService } from "@/services/NotificationService";
import { useToast } from "@/hooks/use-toast";

interface ReminderSettingsProps {
  onNavigate?: (screen: string) => void;
  goal?: {
    name: string;
    monthlyContribution: number;
  };
}

const ReminderSettings = ({ onNavigate, goal }: ReminderSettingsProps) => {
  const [weeklyReminders, setWeeklyReminders] = useState(false);
  const [monthlyReminders, setMonthlyReminders] = useState(true);
  const [customAmount, setCustomAmount] = useState(goal?.monthlyContribution?.toString() || "300");
  const [reminderTime, setReminderTime] = useState("09:00");
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    try {
      const amount = parseFloat(customAmount);
      const goalName = goal?.name || "Emergency Fund";

      if (weeklyReminders) {
        await NotificationService.scheduleRecurringReminders(goalName, amount / 4, 'weekly');
      }

      if (monthlyReminders) {
        await NotificationService.scheduleRecurringReminders(goalName, amount, 'monthly');
      }

      toast({
        title: "✅ Reminders Set!",
        description: `Your ${weeklyReminders ? 'weekly and ' : ''}${monthlyReminders ? 'monthly ' : ''}reminders have been scheduled.`,
      });

      onNavigate?.('details');
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to set up reminders. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelReminders = async () => {
    try {
      await NotificationService.cancelAllReminders();
      toast({
        title: "Reminders Cancelled",
        description: "All scheduled reminders have been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel reminders.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      
      {/* Header */}
      <div className="bg-header p-6 text-header-foreground relative shadow-sm z-10">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-header-foreground hover:bg-header-foreground/10"
            onClick={() => onNavigate?.('details')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-header-foreground">Payment Reminders</h1>
          <div className="w-10"></div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-base/20 rounded-full flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-header-foreground" />
          </div>
          <p className="text-header-foreground/70">
            Set up automatic reminders to reach your goal
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 -mt-4 relative z-20 space-y-4">
        
        {/* Reminder Frequency */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 text-foreground">Reminder Frequency</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Weekly Reminders</p>
                  <p className="text-sm text-muted-foreground">Every week on the same day</p>
                </div>
              </div>
              <Switch
                checked={weeklyReminders}
                onCheckedChange={setWeeklyReminders}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Monthly Reminders</p>
                  <p className="text-sm text-muted-foreground">Every month on the same date</p>
                </div>
              </div>
              <Switch
                checked={monthlyReminders}
                onCheckedChange={setMonthlyReminders}
              />
            </div>
          </div>
        </Card>

        {/* Amount Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 text-foreground">Reminder Amount</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Amount per reminder
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  KD
                </span>
                <Input
                  type="number"
                  placeholder="300"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Reminder Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Preview */}
        {(weeklyReminders || monthlyReminders) && (
          <Card className="p-4 bg-muted/50">
            <h4 className="font-medium text-foreground mb-2">Preview</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              {weeklyReminders && (
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Weekly: "Add KD {(parseFloat(customAmount) / 4).toFixed(0)} to your {goal?.name || 'Emergency Fund'} goal!"</span>
                </div>
              )}
              {monthlyReminders && (
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Monthly: "Add KD {customAmount} to your {goal?.name || 'Emergency Fund'} goal!"</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSaveSettings}
            disabled={!weeklyReminders && !monthlyReminders}
            className="w-full h-12 text-base font-semibold"
          >
            Save Reminder Settings
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleCancelReminders}
            className="w-full"
          >
            Cancel All Reminders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettings;