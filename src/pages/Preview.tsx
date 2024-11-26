import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email-service";

interface DateDetails {
  mood: string;
  activity: string;
  cuisine?: string;
  dateTime: string;
}

const Preview = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState<DateDetails | null>(null);
  const [email, setEmail] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mood = localStorage.getItem("dateMood");
    const activity = localStorage.getItem("dateActivity");
    const cuisine = localStorage.getItem("dateCuisine");
    const dateTime = localStorage.getItem("dateTime");

    if (!mood || !activity || !dateTime) {
      navigate("/");
      return;
    }

    setDetails({ mood, activity, cuisine, dateTime });
  }, [navigate]);

  const handleConfirm = async () => {
    if (!email || !partnerEmail) {
      toast.error("Please enter both email addresses!");
      return;
    }

    setIsLoading(true);
    try {
      const success = await sendEmail(email, partnerEmail, details!);

      if (success) {
        toast.success("Date details sent successfully!");
        localStorage.clear();
        navigate("/");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!details) return null;

  const [dateStr, timeStr] = details.dateTime.split("|");
  const date = new Date(dateStr);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Preview Your Date</h1>
          <p className="text-muted-foreground">
            Review and confirm your selections
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Date Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Mood</Label>
                <p className="text-lg">{details.mood}</p>
              </div>
              <div>
                <Label>Activity</Label>
                <p className="text-lg">{details.activity}</p>
              </div>
              {details.cuisine && (
                <div>
                  <Label>Cuisine</Label>
                  <p className="text-lg">{details.cuisine}</p>
                </div>
              )}
              <div>
                <Label>Date & Time</Label>
                <p className="text-lg">
                  {date.toLocaleDateString()} at {timeStr}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="partner-email">Partner's Email</Label>
                <Input
                  id="partner-email"
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="Enter your partner's email"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/calendar")}>
            Back
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Sending..." : "Confirm & Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;