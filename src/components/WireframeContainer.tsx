import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, ArrowRight } from "lucide-react";
import BankingDashboard from "./BankingDashboard";
import GoalDashboard from "./GoalDashboard";
import CreateGoal from "./CreateGoal";
import GoalDetails from "./GoalDetails";
import AddMoney from "./AddMoney";
import WithdrawMoney from "./WithdrawMoney";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  icon: string;
  paymentMethod?: string;
}

interface Goal {
  name: string;
  target: number;
  current: number;
  deadline: string;
  monthlyContribution: number;
  daysLeft: number;
  onTrack: boolean;
}

const WireframeContainer = () => {
  const [currentScreen, setCurrentScreen] = useState("banking");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", date: "Sep 15", amount: 300, type: "Monthly Auto-Save", icon: "🔄" },
    { id: "2", date: "Sep 12", amount: -100, type: "Emergency Withdrawal", icon: "➖", paymentMethod: "Goal Savings" },
    { id: "3", date: "Sep 10", amount: 50, type: "Manual Add", icon: "➕" },
    { id: "4", date: "Aug 15", amount: 300, type: "Monthly Auto-Save", icon: "🔄" },
    { id: "5", date: "Aug 5", amount: 100, type: "Bonus Add", icon: "🎉" },
  ]);

  const [goal, setGoal] = useState<Goal>({
    name: "Emergency Fund",
    target: 5000,
    current: 3250,
    deadline: "December 31, 2024",
    monthlyContribution: 300,
    daysLeft: 45,
    onTrack: true
  });

  const addTransaction = (amount: number, paymentMethod: string) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: formattedDate,
      amount: parseFloat(amount.toString()),
      type: "Manual Add",
      icon: "➕",
      paymentMethod
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update goal current amount
    setGoal(prev => ({
      ...prev,
      current: prev.current + parseFloat(amount.toString()),
      onTrack: (prev.current + parseFloat(amount.toString())) >= (prev.target * 0.8) // Simple on-track logic
    }));
  };

  const withdrawTransaction = (amount: number, reason: string) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: formattedDate,
      amount: -parseFloat(amount.toString()), // Negative amount for withdrawal
      type: reason || "Manual Withdraw",
      icon: "➖",
      paymentMethod: "Goal Savings"
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update goal current amount (ensure it doesn't go below 0)
    setGoal(prev => ({
      ...prev,
      current: Math.max(0, prev.current - parseFloat(amount.toString())),
      onTrack: Math.max(0, prev.current - parseFloat(amount.toString())) >= (prev.target * 0.8)
    }));
  };

  const screens = [
    { id: "banking", name: "Banking Dashboard", component: BankingDashboard },
    { id: "goals", name: "Goals Dashboard", component: GoalDashboard },
    { id: "create", name: "Create Goal", component: CreateGoal },
    { id: "details", name: "Goal Details", component: GoalDetails },
    { id: "addmoney", name: "Add Money", component: AddMoney },
    { id: "withdraw", name: "Withdraw Money", component: WithdrawMoney },
  ];

  const CurrentComponent = screens.find(screen => screen.id === currentScreen)?.component || BankingDashboard;

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderCurrentComponent = () => {
    const baseProps = { onNavigate: handleNavigate };
    
    switch (currentScreen) {
      case 'details':
        return <GoalDetails {...baseProps} transactions={transactions} goal={goal} />;
      case 'addmoney':
        return <AddMoney {...baseProps} onAddTransaction={addTransaction} />;
      case 'withdraw':
        return <WithdrawMoney {...baseProps} onWithdrawTransaction={withdrawTransaction} goal={goal} />;
      case 'banking':
        return <BankingDashboard {...baseProps} />;
      case 'goals':
        return <GoalDashboard {...baseProps} />;
      case 'create':
        return <CreateGoal {...baseProps} />;
      default:
        return <BankingDashboard {...baseProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-header via-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">ABK Mobile Banking</h1>
          </div>
          <p className="text-muted-foreground text-lg">Retail Banking & Goal-Based Savings</p>
        </div>

        {/* Screen Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {screens.map((screen) => (
            <Button
              key={screen.id}
              variant={currentScreen === screen.id ? "default" : "outline"}
              onClick={() => setCurrentScreen(screen.id)}
              size="sm"
            >
              {screen.name}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Mobile Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Mobile Frame */}
              <div className="bg-foreground rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden" style={{ width: '320px', height: '640px' }}>
                    <div className="h-full overflow-auto">
                      {renderCurrentComponent()}
                    </div>
                  </div>
              </div>
              {/* Mobile Details */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
                iPhone 14 Pro
              </div>
            </div>
          </div>

          {/* Screen Description */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                {screens.find(s => s.id === currentScreen)?.name}
              </h2>
              
              {currentScreen === "banking" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The main banking dashboard provides a comprehensive overview of accounts, 
                    balances, and quick access to banking services with a prominent goal-based savings feature.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Account balance overview with privacy controls</li>
                      <li>Quick action buttons for common tasks</li>
                      <li>Goal-based savings banner with call-to-action</li>
                      <li>Recent transaction history</li>
                      <li>Multiple account management</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentScreen === "goals" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The main dashboard shows all active savings goals with progress indicators, 
                    total savings summary, and quick actions.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Visual progress bars for each goal</li>
                      <li>Total savings across all goals</li>
                      <li>Quick add money buttons</li>
                      <li>Goal categories with color coding</li>
                      <li>Deadline tracking</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentScreen === "create" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Streamlined goal creation with photo upload, category selection, 
                    and automatic savings setup.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Visual goal representation with photos</li>
                      <li>Pre-defined category icons</li>
                      <li>Target amount and date selection</li>
                      <li>Optional monthly auto-save setup</li>
                      <li>Draft saving functionality</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentScreen === "details" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Detailed view of individual goals with progress tracking, 
                    recent activity, and management options.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Large progress visualization</li>
                      <li>Days remaining countdown</li>
                      <li>On-track status indicator</li>
                      <li>Transaction history</li>
                      <li>Auto-save management</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentScreen === "addmoney" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Simple money addition interface with multiple payment methods 
                    and recurring options.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Quick amount selection</li>
                      <li>Multiple payment methods</li>
                      <li>Recurring payment option</li>
                      <li>Real-time balance preview</li>
                      <li>Instant transfer confirmation</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentScreen === "withdraw" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Secure withdrawal interface with amount validation 
                    and withdrawal limits.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Quick amount selection</li>
                      <li>Balance validation</li>
                      <li>Withdrawal reason tracking</li>
                      <li>Transaction limits</li>
                      <li>Real-time balance updates</li>
                    </ul>
                  </div>
                </div>
              )}
            </Card>

            {/* User Flow */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-foreground">User Flow</h3>
              <div className="space-y-3">
                {screens.map((screen, index) => (
                  <div key={screen.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentScreen === screen.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`${currentScreen === screen.id ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                      {screen.name}
                    </span>
                    {index < screens.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireframeContainer;