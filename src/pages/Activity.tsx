import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const activities = [
  { id: "movie", label: "Movie Night", emoji: "🎬" },
  { id: "dinner", label: "Fine Dining", emoji: "🍽️" },
  { id: "hike", label: "Outdoor Adventure", emoji: "🏃‍♂️" },
  { id: "museum", label: "Cultural Visit", emoji: "🏛️" },
  { id: "picnic", label: "Picnic", emoji: "🧺" },
  { id: "concert", label: "Live Music", emoji: "🎵" },
];

const Activity = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedActivity) {
      toast.error("Please select an activity first!");
      return;
    }
    localStorage.setItem("dateActivity", selectedActivity);
    navigate("/food");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Choose an Activity</h1>
          <p className="text-muted-foreground">What would you like to do on your date?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedActivity === activity.id ? "border-primary border-2" : ""
              }`}
              onClick={() => setSelectedActivity(activity.id)}
            >
              <div className="text-center space-y-2">
                <span className="text-4xl">{activity.emoji}</span>
                <h3 className="text-xl font-semibold">{activity.label}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/mood")}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Activity;