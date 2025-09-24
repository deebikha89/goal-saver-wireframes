import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, ArrowRight } from "lucide-react";
import GoalDashboard from "./GoalDashboard";
import CreateGoal from "./CreateGoal";
import GoalDetails from "./GoalDetails";
import AddMoney from "./AddMoney";

const WireframeContainer = () => {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const screens = [
    { id: "dashboard", name: "Goals Dashboard", component: GoalDashboard },
    { id: "create", name: "Create Goal", component: CreateGoal },
    { id: "details", name: "Goal Details", component: GoalDetails },
    { id: "addmoney", name: "Add Money", component: AddMoney },
  ];

  const CurrentComponent = screens.find(screen => screen.id === currentScreen)?.component || GoalDashboard;

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Mobile Banking Wireframes</h1>
          </div>
          <p className="text-muted-foreground text-lg">Goal-Based Savings Account Screens</p>
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
                      <CurrentComponent onNavigate={handleNavigate} />
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
              
              {currentScreen === "dashboard" && (
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