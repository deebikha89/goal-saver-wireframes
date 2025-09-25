import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Coins, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useState } from "react";
import MobileNotification from "./MobileNotification";

interface AddMoneyProps {
  onNavigate?: (screen: string) => void;
  onAddTransaction?: (amount: number, paymentMethod: string) => void;
}

const AddMoney = ({ onNavigate, onAddTransaction }: AddMoneyProps) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleAddMoney = () => {
    if (amount && selectedMethod && onAddTransaction) {
      const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
      onAddTransaction(parseFloat(amount), selectedPaymentMethod?.name || "Unknown");
    }
    
    // Show mobile notification
    setShowNotification(true);
    
    // Navigate back to details after a short delay
    setTimeout(() => {
      onNavigate?.('details');
    }, 2000);
  };

  const quickAmounts = [25, 50, 100, 200];
  
  const paymentMethods = [
    {
      id: "checking",
      name: "Checking Account",
      detail: "****1234",
      icon: Building2,
      type: "Bank Account"
    },
    {
      id: "debit",
      name: "Debit Card",
      detail: "****5678",
      icon: CreditCard,
      type: "Visa Debit"
    },
    {
      id: "mobile",
      name: "Mobile Wallet",
      detail: "Apple Pay",
      icon: Smartphone,
      type: "Digital Wallet"
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      
      <MobileNotification
        title="Funds Added Successfully!"
        description={`KD ${amount} has been added to your Emergency Fund`}
        show={showNotification}
        onDismiss={() => setShowNotification(false)}
      />
      
      {/* Header */}
      <div className="bg-header p-6 text-header-foreground relative shadow-sm z-10">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-header-foreground hover:bg-header-foreground/10"
            onClick={() => onNavigate?.('details')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-header-foreground">Add Money</h1>
        </div>
        
        <Card className="bg-base/10 border-base/20 text-header-foreground p-4 shadow-sm">
          <div className="text-center">
            <div className="text-sm opacity-70 mb-1">Adding to</div>
            <div className="font-semibold">Emergency Fund</div>
            <div className="text-sm opacity-70">KD 3,250 of KD 5,000</div>
          </div>
        </Card>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Amount Input */}
        <Card className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Amount to Add</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-muted-foreground">KD</span>
              <Input 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-12 text-2xl h-14 text-center font-semibold border-input"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant={amount === quickAmount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-sm"
                >
                  KD {quickAmount}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <method.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">{method.name}</div>
                    <div className="text-xs text-muted-foreground">{method.detail}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{method.type}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Schedule Option */}
        <Card className="p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 rounded border-border" />
            <div>
              <div className="font-medium text-sm text-foreground">Make this recurring</div>
              <div className="text-xs text-muted-foreground mt-1">
                Automatically add this amount every month
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        {amount && selectedMethod && (
          <Card className="p-4 bg-accent/5 border-accent/20">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-foreground">KD {amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transfer time</span>
                <span className="font-medium text-foreground">Instant</span>
              </div>
              <div className="border-t border-accent/20 pt-2 mt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">New balance</span>
                  <span className="font-semibold text-accent">KD {(3250 + parseFloat(amount || "0")).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Add Button */}
        <Button 
          className="w-full bg-gradient-to-r from-base to-base/90 hover:from-base/90 hover:to-base/80 text-base-foreground"
          disabled={!amount || !selectedMethod}
          size="lg"
          onClick={handleAddMoney}
        >
          <Coins className="h-4 w-4 mr-2" />
          Add KD {amount || "0"} to Goal
        </Button>
      </div>
    </div>
  );
};

export default AddMoney;