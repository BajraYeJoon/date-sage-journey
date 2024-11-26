import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const moods = [
  { id: "romantic", label: "Romantic", emoji: "❤️" },
  { id: "adventurous", label: "Adventurous", emoji: "🌟" },
  { id: "casual", label: "Casual", emoji: "😊" },
  { id: "fancy", label: "Fancy", emoji: "✨" },
];

const Mood = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedMood) {
      toast.error("Please select a mood first!");
      return;
    }
    localStorage.setItem("dateMood", selectedMood);
    navigate("/activity");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Set the Mood</h1>
          <p className="text-muted-foreground">Choose the perfect atmosphere for your date</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moods.map((mood) => (
            <Card
              key={mood.id}
              className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedMood === mood.id ? "border-primary border-2" : ""
              }`}
              onClick={() => setSelectedMood(mood.id)}
            >
              <div className="text-center space-y-2">
                <span className="text-4xl">{mood.emoji}</span>
                <h3 className="text-xl font-semibold">{mood.label}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Mood;