import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, Calendar, DollarSign, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    soilType: "",
    landSize: "",
    budget: "",
    lastCrop: "",
    location: "",
    nearForest: "",
  });
  
  const [showResults, setShowResults] = useState(false);

  const recommendations = [
    {
      name: "Wheat",
      soilSuitability: "Excellent",
      duration: "120-150 days",
      costPerAcre: "₹15,000",
      expectedProfit: "₹45,000",
      pestRisk: 25,
      season: "Rabi",
    },
    {
      name: "Rice",
      soilSuitability: "Good",
      duration: "90-120 days",
      costPerAcre: "₹18,000",
      expectedProfit: "₹42,000",
      pestRisk: 45,
      season: "Kharif",
    },
    {
      name: "Sugarcane",
      soilSuitability: "Very Good",
      duration: "12-18 months",
      costPerAcre: "₹35,000",
      expectedProfit: "₹85,000",
      pestRisk: 35,
      season: "Perennial",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-success";
    if (risk < 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskBgColor = (risk: number) => {
    if (risk < 30) return "bg-success";
    if (risk < 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Crop Recommendation</h1>
        <p className="text-muted-foreground">Get AI-powered crop suggestions tailored to your farm</p>
      </div>

      {/* Recommendation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Details</CardTitle>
          <CardDescription>Fill in your farm information for personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                    <SelectItem value="peaty">Peaty</SelectItem>
                    <SelectItem value="chalky">Chalky</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size (acres)</Label>
                <Input
                  id="landSize"
                  type="number"
                  placeholder="Enter land size"
                  value={formData.landSize}
                  onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (&lt; ₹50,000)</SelectItem>
                    <SelectItem value="medium">Medium (₹50,000 - ₹2,00,000)</SelectItem>
                    <SelectItem value="high">High (&gt; ₹2,00,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastCrop">Last Crop Grown</Label>
                <Input
                  id="lastCrop"
                  placeholder="e.g., Rice, Wheat"
                  value={formData.lastCrop}
                  onChange={(e) => setFormData({ ...formData, lastCrop: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nearForest">Near Forest/Hilly Area?</Label>
                <Select value={formData.nearForest} onValueChange={(value) => setFormData({ ...formData, nearForest: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Sprout className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h2 className="font-display text-2xl font-semibold">Recommended Crops</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((crop, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <Badge variant="outline" className="mt-2 status-info">
                        {crop.season} Season
                      </Badge>
                    </div>
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Soil Suitability</span>
                      <span className="font-semibold text-success">{crop.soilSuitability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{crop.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cost/Acre</span>
                      <span className="font-semibold">{crop.costPerAcre}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected Profit</span>
                      <span className="font-semibold text-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {crop.expectedProfit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pest Risk</span>
                      <span className={`font-semibold ${getRiskColor(crop.pestRisk)}`}>
                        {crop.pestRisk}%
                      </span>
                    </div>
                    <Progress value={crop.pestRisk} className="h-2" indicatorClassName={getRiskBgColor(crop.pestRisk)} />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Crop Calendar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
