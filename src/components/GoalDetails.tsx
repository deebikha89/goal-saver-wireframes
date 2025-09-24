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
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      {/* ABK Logo Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/bfb00db2-3d74-4130-883c-e02f7238466b.png')`,
          backgroundSize: '120px 80px',
          backgroundPosition: '20px 40px',
          opacity: '0.85'
        }}
      ></div>
      
      {/* Header */}
      <div className="bg-header p-6 text-header-foreground relative shadow-sm z-10">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-header-foreground hover:bg-header-foreground/10"
            onClick={() => onNavigate?.('goals')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-base/20 rounded-full flex items-center justify-center">
            <Target className="h-8 w-8 text-header-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-1 text-header-foreground">{goal.name}</h1>
            <div className="flex items-center justify-center gap-2 text-header-foreground/70">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{goal.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 -mt-8 relative z-20">
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
      <div className="px-4 mb-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-gradient-to-r from-base to-base/90 hover:from-base/90 hover:to-base/80 text-base-foreground"
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
      <div className="px-4 mb-6 relative z-10">
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
      <div className="px-4 relative z-10">
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