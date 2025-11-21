import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudRain, Sprout, Calendar, ShoppingBag, DollarSign, ListTodo, Thermometer, Droplets, Wind } from "lucide-react";

export default function Home() {
  const quickActions = [
    {
      title: "Crop Recommendation",
      description: "Get AI-powered crop suggestions based on your soil and location",
      icon: Sprout,
      path: "/crop-recommendation",
      color: "text-primary",
    },
    {
      title: "Crop Calendar",
      description: "View detailed schedules for planting, fertilizing, and harvesting",
      icon: Calendar,
      path: "/crop-calendar",
      color: "text-accent",
    },
    {
      title: "Pesticides Store",
      description: "Browse and purchase recommended pesticides and fertilizers",
      icon: ShoppingBag,
      path: "/pesticides",
      color: "text-info",
    },
    {
      title: "Cost Estimator",
      description: "Calculate costs and expected profits for your crops",
      icon: DollarSign,
      path: "/cost-estimator",
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Welcome to AgriSmart AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your intelligent farming companion for better crop decisions, weather insights, and increased profitability
        </p>
      </div>

      {/* Weather Summary Card */}
      <Card className="card-hover bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" />
                Today's Weather
              </CardTitle>
              <CardDescription>Current conditions in your area</CardDescription>
            </div>
            <Link to="/weather">
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">28°C</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <Droplets className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">65%</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Wind className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">12 km/h</p>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} to={action.path}>
                <Card className="card-hover h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-secondary ${action.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{action.title}</CardTitle>
                        <CardDescription className="mt-2">{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Log Link */}
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <ListTodo className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Activity Log</h3>
              <p className="text-sm text-muted-foreground">Track your farming activities and tasks</p>
            </div>
          </div>
          <Link to="/activity-log">
            <Button variant="outline">View Log</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
