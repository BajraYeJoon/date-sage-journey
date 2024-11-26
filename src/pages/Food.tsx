import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const cuisines = [
  { id: "italian", label: "Italian", emoji: "🍝" },
  { id: "japanese", label: "Japanese", emoji: "🍱" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "indian", label: "Indian", emoji: "🍛" },
];

const Food = () => {
  const navigate = useNavigate();
  const [includeFoodPreferences, setIncludeFoodPreferences] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const handleNext = () => {
    if (includeFoodPreferences && !selectedCuisine) {
      toast.error("Please select a cuisine first!");
      return;
    }
    if (includeFoodPreferences) {
      localStorage.setItem("dateCuisine", selectedCuisine!);
    }
    navigate("/calendar");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Food Preferences</h1>
          <p className="text-muted-foreground">Choose your preferred cuisine</p>
        </div>

        <div className="flex items-center space-x-2 justify-center">
          <Switch
            id="food-toggle"
            checked={includeFoodPreferences}
            onCheckedChange={setIncludeFoodPreferences}
          />
          <Label htmlFor="food-toggle">Include food preferences</Label>
        </div>

        {includeFoodPreferences && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cuisines.map((cuisine) => (
              <Card
                key={cuisine.id}
                className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedCuisine === cuisine.id ? "border-primary border-2" : ""
                }`}
                onClick={() => setSelectedCuisine(cuisine.id)}
              >
                <div className="text-center space-y-2">
                  <span className="text-4xl">{cuisine.emoji}</span>
                  <h3 className="text-xl font-semibold">{cuisine.label}</h3>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/activity")}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Food;