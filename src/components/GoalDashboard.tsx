import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface GoalDashboardProps {
  onNavigate?: (screen: string) => void;
}

const GoalDashboard = ({ onNavigate }: GoalDashboardProps) => {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 5000,
      current: 3250,
      deadline: "Dec 2024",
      color: "bg-primary",
      progress: 65
    },
    {
      id: 2,
      name: "Dream Vacation",
      target: 8000,
      current: 2100,
      deadline: "Jun 2025",
      color: "bg-accent",
      progress: 26
    },
    {
      id: 3,
      name: "New Car",
      target: 25000,
      current: 8500,
      deadline: "Sep 2025",
      color: "bg-warning",
      progress: 34
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">My Goals</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => onNavigate?.('create')}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Total Saved</span>
            </div>
            <div className="text-2xl font-bold">KD 13,850</div>
            <div className="text-sm opacity-90">Across 3 goals</div>
          </div>
        </Card>
      </div>

      {/* Goals List */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Active Goals</h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate?.('create')}>
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </div>

        {goals.map((goal) => (
          <Card key={goal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${goal.color}`}></div>
                  <div>
                    <h3 className="font-medium text-foreground">{goal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </div>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">KD {goal.current.toLocaleString()}</span>
                  <span className="text-muted-foreground">KD {goal.target.toLocaleString()}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {goal.progress}% complete
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onNavigate?.('addmoney')}
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  Add Money
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate?.('details')}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <Card className="p-4 bg-muted/30">
          <h3 className="font-medium mb-3 text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => onNavigate?.('create')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => onNavigate?.('details')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Progress
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoalDashboard;