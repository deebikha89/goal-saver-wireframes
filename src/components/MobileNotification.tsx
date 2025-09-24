import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface MobileNotificationProps {
  title: string;
  description: string;
  show: boolean;
  onDismiss: () => void;
}

const MobileNotification = ({ title, description, show, onDismiss }: MobileNotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
        <button 
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileNotification;