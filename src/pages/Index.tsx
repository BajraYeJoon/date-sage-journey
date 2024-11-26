import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <span className="inline-block text-secondary text-sm font-medium px-3 py-1 rounded-full bg-secondary/10">
            Welcome to Date Scheduler
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Plan Your Perfect Date
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create memorable experiences with our intuitive date planning tool. Choose your mood,
            activities, and let us handle the details.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="glass" className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <h3 className="font-semibold mb-2">Set the Mood</h3>
            <p className="text-sm text-gray-600">Choose the perfect atmosphere for your date</p>
          </Card>

          <Card variant="glass" className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold mb-2">Pick Activities</h3>
            <p className="text-sm text-gray-600">Select from curated activities that match your style</p>
          </Card>

          <Card variant="glass" className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold mb-2">Schedule It</h3>
            <p className="text-sm text-gray-600">Find the perfect time and lock it in</p>
          </Card>
        </div>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate("/mood")}
          className="mx-auto"
        >
          Start Planning
        </Button>
      </div>
    </div>
  );
};

export default Index;