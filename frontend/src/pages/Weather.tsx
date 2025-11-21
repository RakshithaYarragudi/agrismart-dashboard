import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Thermometer, Droplets, Wind, Sun, CloudSnow, AlertTriangle } from "lucide-react";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({
    location: "Mumbai, Maharashtra",
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    rainForecast: "Light rain expected tomorrow",
    condition: "Partly Cloudy",
  });

  const alerts = [
    { type: "warning", message: "Heatwave expected next week - ensure adequate irrigation", icon: Sun },
    { type: "info", message: "Good conditions for sowing wheat in the coming days", icon: CloudRain },
  ];

  const forecast = [
    { day: "Today", temp: 28, condition: "Partly Cloudy", rain: 20 },
    { day: "Tomorrow", temp: 26, condition: "Light Rain", rain: 60 },
    { day: "Wed", temp: 27, condition: "Cloudy", rain: 40 },
    { day: "Thu", temp: 29, condition: "Sunny", rain: 10 },
    { day: "Fri", temp: 30, condition: "Sunny", rain: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Weather Dashboard</h1>
        <p className="text-muted-foreground">Real-time weather updates and forecasts for your location</p>
      </div>

      {/* Location Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your location (e.g., Mumbai, Maharashtra)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Current Weather - {weatherData.location}
          </CardTitle>
          <CardDescription>{weatherData.condition}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-card">
              <Thermometer className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <Droplets className="h-8 w-8 text-info mx-auto mb-2" />
              <p className="text-3xl font-bold">{weatherData.humidity}%</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <Wind className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-3xl font-bold">{weatherData.windSpeed}</p>
              <p className="text-sm text-muted-foreground">km/h</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <CloudRain className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">60%</p>
              <p className="text-sm text-muted-foreground">Rain Chance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Weather Alerts</h2>
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <Card key={index} className={alert.type === "warning" ? "border-warning/50 bg-warning/5" : "border-info/50 bg-info/5"}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <Icon className={`h-5 w-5 mt-0.5 ${alert.type === "warning" ? "text-warning" : "text-info"}`} />
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                  </div>
                  <Badge variant="outline" className={alert.type === "warning" ? "status-warning" : "status-info"}>
                    {alert.type}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 5-Day Forecast */}
      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold">5-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">{day.day}</p>
                <Sun className="h-8 w-8 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold mb-1">{day.temp}°C</p>
                <p className="text-sm text-muted-foreground mb-2">{day.condition}</p>
                <Badge variant="outline" className="status-info">
                  {day.rain}% rain
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
