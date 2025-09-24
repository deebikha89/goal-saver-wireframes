import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  PiggyBank, 
  Send, 
  Receipt, 
  Eye, 
  EyeOff,
  Target,
  TrendingUp,
  ArrowRight,
  Bell,
  Settings,
  User
} from "lucide-react";
import { useState } from "react";

interface BankingDashboardProps {
  onNavigate?: (screen: string) => void;
}

const BankingDashboard = ({ onNavigate }: BankingDashboardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Current Account",
      number: "****1234",
      balance: 15750.50,
      type: "checking"
    },
    {
      id: 2,
      name: "Savings Account", 
      number: "****5678",
      balance: 45200.75,
      type: "savings"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      description: "Salary Deposit",
      amount: 5500.00,
      date: "Today",
      type: "credit"
    },
    {
      id: 2,
      description: "Online Purchase",
      amount: -125.50,
      date: "Yesterday", 
      type: "debit"
    },
    {
      id: 3,
      description: "ATM Withdrawal",
      amount: -200.00,
      date: "Sep 22",
      type: "debit"
    }
  ];

  const quickActions = [
    { icon: Send, label: "Transfer", action: "transfer" },
    { icon: Receipt, label: "Pay Bills", action: "bills" },
    { icon: CreditCard, label: "Cards", action: "cards" },
    { icon: PiggyBank, label: "Invest", action: "invest" }
  ];

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      {/* ABK Logo Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url('/lovable-uploads/bfb00db2-3d74-4130-883c-e02f7238466b.png')`
        }}
      ></div>
      
      {/* Header */}
      <div className="bg-header p-6 text-header-foreground relative shadow-sm z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-medium text-header-foreground">Good Morning</h1>
            <p className="text-sm text-header-foreground/70">Ahmed Al-Rashid</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Goal-Based Savings Banner */}
        <Card 
          className="bg-gradient-to-r from-base to-base/90 border-base-foreground/20 text-base-foreground cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => onNavigate?.('goals')}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-base-foreground/20 p-2 rounded-full">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-base-foreground">Goal-Based Savings</h3>
                  <p className="text-xs text-base-foreground/90">Start saving for your dreams</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-base-foreground/20 text-base-foreground hover:bg-base-foreground/30">
                New Feature
              </Badge>
              <span className="text-xs text-base-foreground/80">Set & achieve financial goals</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Account Balance */}
      <div className="p-4 -mt-4 relative z-10">
        <Card className="p-4 bg-gradient-to-br from-background to-muted/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Total Balance</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
              className="h-8 w-8"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {showBalance ? "KD 60,951.25" : "KD ••••••"}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+2.5% this month</span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6 relative z-10">
        <h3 className="font-semibold mb-3 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex-col h-16 gap-1"
              size="sm"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Accounts */}
      <div className="px-4 mb-6 relative z-10">
        <h3 className="font-semibold mb-3 text-foreground">My Accounts</h3>
        <div className="space-y-3">
          {accounts.map((account) => (
            <Card key={account.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{account.name}</h4>
                  <p className="text-sm text-muted-foreground">{account.number}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {showBalance ? `KD ${account.balance.toLocaleString()}` : "KD ••••••"}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {account.type}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mb-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}KD {Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankingDashboard;