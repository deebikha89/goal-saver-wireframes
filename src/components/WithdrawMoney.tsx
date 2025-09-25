import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, AlertCircle, Coins } from "lucide-react";

interface WithdrawMoneyProps {
  onNavigate?: (screen: string) => void;
  onWithdrawTransaction?: (amount: number, reason: string) => void;
  goal?: {
    name: string;
    current: number;
    target: number;
  };
}

const WithdrawMoney = ({ onNavigate, onWithdrawTransaction, goal }: WithdrawMoneyProps) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const quickAmounts = [50, 100, 200, 500];
  const currentBalance = goal?.current || 3250;
  const maxWithdraw = Math.min(currentBalance, 1000); // Limit withdrawals

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setSelectedAmount(value);
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= currentBalance) {
      onWithdrawTransaction?.(withdrawAmount, reason || "Goal Withdrawal");
      onNavigate?.('details');
    }
  };

  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= currentBalance;

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
          <h1 className="text-lg font-semibold text-header-foreground">Withdraw Money</h1>
          <div className="w-10"></div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-base/20 rounded-full flex items-center justify-center mb-4">
            <Coins className="h-8 w-8 text-header-foreground" />
          </div>
          <p className="text-header-foreground/70">
            Available: KD {currentBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Amount Input */}
      <div className="p-4 -mt-4 relative z-20">
        <Card className="p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Withdrawal Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  KD
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-12 text-lg font-semibold"
                  max={currentBalance}
                />
              </div>
              {parseFloat(amount) > currentBalance && (
                <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Amount exceeds available balance</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Reason (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g., Emergency expense, Goal achieved"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Amounts */}
      <div className="px-4 mb-6 relative z-10">
        <h3 className="font-medium mb-3 text-foreground">Quick Amounts</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map((value) => (
            <Button
              key={value}
              variant={selectedAmount === value ? "default" : "outline"}
              onClick={() => handleQuickAmount(value)}
              disabled={value > currentBalance}
              className="h-12"
            >
              KD {value}
            </Button>
          ))}
        </div>
      </div>

      {/* Withdrawal Limits */}
      <div className="px-4 mb-6 relative z-10">
        <Card className="p-4 bg-muted/50">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Withdrawal Limits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maximum per transaction: KD {maxWithdraw.toLocaleString()}</li>
                <li>• Cannot exceed current goal balance</li>
                <li>• Withdrawals may affect goal progress</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-6 relative z-10">
        <Button 
          onClick={handleWithdraw}
          disabled={!isValidAmount}
          className="w-full h-12 text-base font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        >
          Withdraw KD {amount || "0"}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawMoney;