import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, TrendingUp, Calendar, Plus, Minus, Settings, Share2 } from "lucide-react";

interface GoalDetailsProps {
  onNavigate?: (screen: string) => void;
  transactions?: Array<{
    id: string;
    date: string;
    amount: number;
    type: string;
    icon: string;
    paymentMethod?: string;
  }>;
}

const GoalDetails = ({ onNavigate, transactions }: GoalDetailsProps) => {
  const goal = {
    name: "Emergency Fund",
    target: 5000,
    current: 3250,
    deadline: "December 31, 2024",
    monthlyContribution: 300,
    progress: 65,
    daysLeft: 45,
    onTrack: true
  };

  const recentTransactions = transactions || [
    { id: "1", date: "Sep 15", amount: 300, type: "Monthly Auto-Save", icon: "🔄" },
    { id: "2", date: "Sep 10", amount: 50, type: "Manual Add", icon: "➕" },
    { id: "3", date: "Aug 15", amount: 300, type: "Monthly Auto-Save", icon: "🔄" },
    { id: "4", date: "Aug 5", amount: 100, type: "Bonus Add", icon: "🎉" },
  ];

  return (
    <div className="max-w-sm mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground relative">
        {/* ABK Logo */}
        <div className="absolute top-4 right-4">
          <img 
            src="/lovable-uploads/bfb00db2-3d74-4130-883c-e02f7238466b.png" 
            alt="ABK Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        <div className="flex items-center justify-between mb-6 mr-20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => onNavigate?.('goals')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Target className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-1">{goal.name}</h1>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{goal.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 -mt-8 relative z-10">
        <Card className="p-6 shadow-lg">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                KD {goal.current.toLocaleString()}
              </div>
              <div className="text-muted-foreground">
                of KD {goal.target.toLocaleString()} goal
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={goal.progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{goal.progress}% complete</span>
                <span>KD {(goal.target - goal.current).toLocaleString()} to go</span>
              </div>
            </div>

            {goal.onTrack && (
              <div className="flex items-center justify-center gap-2 text-success text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>On track to reach goal</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
            onClick={() => onNavigate?.('addmoney')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Money
          </Button>
          <Button variant="outline">
            <Minus className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Monthly Contribution */}
      <div className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Auto-Save</h3>
              <p className="text-sm text-muted-foreground">Monthly contribution</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">KD {goal.monthlyContribution}</div>
              <Button variant="ghost" size="sm" className="text-xs h-auto p-0">
                Edit
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
        <h3 className="font-semibold mb-3 text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {recentTransactions.slice(0, 6).map((transaction) => (
            <Card key={transaction.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg">{transaction.icon}</div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date}
                      {transaction.paymentMethod && ` • ${transaction.paymentMethod}`}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-success">
                  +KD {transaction.amount}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-6"></div>
    </div>
  );
};

export default GoalDetails;