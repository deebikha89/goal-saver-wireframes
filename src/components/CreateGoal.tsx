import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Target, Calendar, DollarSign, Camera } from "lucide-react";
import { useState } from "react";

interface CreateGoalProps {
  onNavigate?: (screen: string) => void;
}

const CreateGoal = ({ onNavigate }: CreateGoalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { icon: "🏠", name: "Home", color: "bg-blue-100" },
    { icon: "✈️", name: "Travel", color: "bg-green-100" },
    { icon: "🚗", name: "Car", color: "bg-yellow-100" },
    { icon: "💍", name: "Wedding", color: "bg-pink-100" },
    { icon: "🎓", name: "Education", color: "bg-purple-100" },
    { icon: "⚡", name: "Emergency", color: "bg-red-100" },
  ];

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      {/* ABK Logo Background Pattern */}
      <div 
        className="absolute inset-0 opacity-3 pointer-events-none z-0 bg-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/bfb00db2-3d74-4130-883c-e02f7238466b.png')`,
          backgroundSize: '120px 80px',
          backgroundPosition: '20px 40px'
        }}
      ></div>
      
      {/* Header */}
      <div className="bg-header p-6 text-header-foreground relative shadow-sm z-10">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-header-foreground hover:bg-header-foreground/10"
            onClick={() => onNavigate?.('goals')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-header-foreground">Create New Goal</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Goal Image */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm">
              Add Photo
            </Button>
            <p className="text-xs text-muted-foreground">Add a photo to visualize your goal</p>
          </div>
        </Card>

        {/* Goal Details */}
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalName" className="text-sm font-medium">Goal Name</Label>
            <Input 
              id="goalName" 
              placeholder="e.g., Dream Vacation to Italy"
              className="border-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount" className="text-sm font-medium">Target Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="targetAmount" 
                  placeholder="5,000"
                  className="pl-9 border-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium">Target Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="deadline" 
                  type="date"
                  className="pl-9 border-input"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Category Selection */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Choose Category</Label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCategory === category.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-center space-y-1">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="text-xs font-medium">{category.name}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Contribution */}
        <Card className="p-4 space-y-4">
          <Label className="text-sm font-medium">Monthly Contribution (Optional)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="200"
              className="pl-9 border-input"
            />
          </div>
          <p className="text-xs text-muted-foreground">We'll automatically save this amount each month</p>
        </Card>

        {/* Create Button */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full bg-gradient-to-r from-base to-base/90 hover:from-base/90 hover:to-base/80 text-base-foreground"
            onClick={() => onNavigate?.('goals')}
          >
            <Target className="h-4 w-4 mr-2" />
            Create Goal
          </Button>
          <Button variant="outline" className="w-full">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;