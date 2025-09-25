import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Check } from "lucide-react";
import { useState } from "react";

// Import the generated images
import goalVacation from "@/assets/goal-vacation.jpg";
import goalEmergency from "@/assets/goal-emergency.jpg";
import goalHome from "@/assets/goal-home.jpg";
import goalEducation from "@/assets/goal-education.jpg";
import goalCar from "@/assets/goal-car.jpg";
import goalWedding from "@/assets/goal-wedding.jpg";
import goalMedical from "@/assets/goal-medical.jpg";
import goalMiscellaneous from "@/assets/goal-miscellaneous.jpg";

interface PhotoPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPhoto: (photo: string, category: string) => void;
  selectedPhoto?: string;
}

const PhotoPicker = ({ open, onOpenChange, onSelectPhoto, selectedPhoto }: PhotoPickerProps) => {
  const defaultPhotos = [
    {
      id: "vacation",
      name: "Vacation & Travel",
      image: goalVacation,
      icon: "✈️"
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      image: goalEmergency,
      icon: "⚡"
    },
    {
      id: "home",
      name: "Home & Property",
      image: goalHome,
      icon: "🏠"
    },
    {
      id: "education",
      name: "Education",
      image: goalEducation,
      icon: "🎓"
    },
    {
      id: "car",
      name: "Car & Vehicle",
      image: goalCar,
      icon: "🚗"
    },
    {
      id: "wedding",
      name: "Wedding",
      image: goalWedding,
      icon: "💍"
    },
    {
      id: "medical",
      name: "Medical & Health",
      image: goalMedical,
      icon: "🏥"
    },
    {
      id: "miscellaneous",
      name: "General Savings",
      image: goalMiscellaneous,
      icon: "🎯"
    }
  ];

  const handleSelectPhoto = (photo: { id: string; name: string; image: string }) => {
    onSelectPhoto(photo.image, photo.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Choose Goal Photo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a photo that represents your savings goal
          </p>
          
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {defaultPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handleSelectPhoto(photo)}
                className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
                  selectedPhoto === photo.image
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedPhoto === photo.image && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{photo.icon}</span>
                      <span className="text-xs text-white font-medium truncate">
                        {photo.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Upload Custom Photo
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Custom upload coming soon
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoPicker;