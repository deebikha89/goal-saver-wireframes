import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Target, Calendar as CalendarIcon, Coins, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { format, differenceInMonths, differenceInWeeks, differenceInYears } from "date-fns";
import { cn } from "@/lib/utils";
import PhotoPicker from "./PhotoPicker";

interface CreateGoalProps {
  onNavigate?: (screen: string) => void;
}

const CreateGoal = ({ onNavigate }: CreateGoalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [targetDate, setTargetDate] = useState<Date>();
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("monthly");
  const [calculatedContribution, setCalculatedContribution] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("");
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);

  // Auto-calculate contribution based on target amount, date, and frequency
  useEffect(() => {
    if (targetAmount && targetDate) {
      const amount = parseFloat(targetAmount.replace(/,/g, ''));
      if (!isNaN(amount) && amount > 0) {
        const now = new Date();
        let periods = 0;
        
        switch (frequency) {
          case "weekly":
            periods = differenceInWeeks(targetDate, now);
            break;
          case "monthly":
            periods = differenceInMonths(targetDate, now);
            break;
          case "half-yearly":
            periods = Math.ceil(differenceInMonths(targetDate, now) / 6);
            break;
          case "yearly":
            periods = differenceInYears(targetDate, now);
            break;
          default:
            periods = differenceInMonths(targetDate, now);
        }
        
        if (periods > 0) {
          setCalculatedContribution(Math.ceil(amount / periods));
        } else {
          setCalculatedContribution(0);
        }
      } else {
        setCalculatedContribution(0);
      }
    } else {
      setCalculatedContribution(0);
    }
  }, [targetAmount, targetDate, frequency]);

  const handlePhotoSelect = (photo: string, category: string) => {
    setSelectedPhoto(photo);
    setSelectedPhotoCategory(category);
  };

  const categories = [
    { icon: "🏠", name: "Home", color: "bg-blue-100" },
    { icon: "✈️", name: "Travel", color: "bg-green-100" },
    { icon: "🚗", name: "Car", color: "bg-yellow-100" },
    { icon: "💍", name: "Wedding", color: "bg-pink-100" },
    { icon: "🎓", name: "Education", color: "bg-purple-100" },
    { icon: "⚡", name: "Emergency", color: "bg-red-100" },
    { icon: "🎁", name: "Gift", color: "bg-orange-100" },
    { icon: "🎂", name: "Birthday", color: "bg-indigo-100" },
    { icon: "📦", name: "Miscellaneous", color: "bg-gray-100" },
  ];

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-header to-background min-h-screen relative">
      
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
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30 overflow-hidden">
              {selectedPhoto ? (
                <img 
                  src={selectedPhoto} 
                  alt="Selected goal" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Camera className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPhotoPicker(true)}
            >
              {selectedPhoto ? "Change Photo" : "Add Photo"}
            </Button>
            <p className="text-xs text-muted-foreground">
              {selectedPhoto ? selectedPhotoCategory : "Add a photo to visualize your goal"}
            </p>
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
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-muted-foreground">KD</span>
                <Input 
                  id="targetAmount" 
                  placeholder="5,000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="pl-9 border-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium">Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal relative",
                      !targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {targetDate ? format(targetDate, "MMM dd, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
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

        {/* Contribution Settings */}
        <Card className="p-4 space-y-4">
          <Label className="text-sm font-medium">Contribution Settings</Label>
          
          {/* Frequency Selection */}
          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm font-medium">Contribution Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="half-yearly">Half Yearly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calculated Contribution Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Suggested {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Contribution
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-muted-foreground">KD</span>
              <Input 
                value={calculatedContribution > 0 ? calculatedContribution.toLocaleString() : "0"}
                readOnly
                className="pl-9 border-input bg-muted/30"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {calculatedContribution > 0 
                ? `Based on your target amount and date, save KD ${calculatedContribution.toLocaleString()} ${frequency.replace('-', ' ')}`
                : "Enter target amount and date to see suggested contribution"
              }
            </p>
          </div>
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

      <PhotoPicker
        open={showPhotoPicker}
        onOpenChange={setShowPhotoPicker}
        onSelectPhoto={handlePhotoSelect}
        selectedPhoto={selectedPhoto}
      />
    </div>
  );
};

export default CreateGoal;