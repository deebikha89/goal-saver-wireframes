import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useState } from "react";

interface AddMoneyProps {
  onNavigate?: (screen: string) => void;
}

const AddMoney = ({ onNavigate }: AddMoneyProps) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

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
    <div className="max-w-sm mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-accent/80 p-6 text-accent-foreground">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-accent-foreground hover:bg-accent-foreground/20"
            onClick={() => onNavigate?.('details')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Add Money</h1>
        </div>
        
        <Card className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground p-4">
          <div className="text-center">
            <div className="text-sm opacity-90 mb-1">Adding to</div>
            <div className="font-semibold">Emergency Fund</div>
            <div className="text-sm opacity-90">$3,250 of $5,000</div>
          </div>
        </Card>
      </div>

      <div className="p-4 space-y-6">
        {/* Amount Input */}
        <Card className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Amount to Add</Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
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
                  ${quickAmount}
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
                <span className="font-medium text-foreground">${amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transfer time</span>
                <span className="font-medium text-foreground">Instant</span>
              </div>
              <div className="border-t border-accent/20 pt-2 mt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">New balance</span>
                  <span className="font-semibold text-accent">${(3250 + parseFloat(amount || "0")).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Add Button */}
        <Button 
          className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
          disabled={!amount || !selectedMethod}
          size="lg"
          onClick={() => onNavigate?.('details')}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Add ${amount || "0"} to Goal
        </Button>
      </div>
    </div>
  );
};

export default AddMoney;