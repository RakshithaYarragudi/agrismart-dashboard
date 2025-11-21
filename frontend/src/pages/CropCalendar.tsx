import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Droplets, Bug, Calendar as CalendarIcon } from "lucide-react";

export default function CropCalendar() {
  const stages = [
    {
      name: "Sowing",
      duration: "Days 1-7",
      color: "bg-chart-1",
      tasks: ["Prepare soil", "Apply base fertilizer", "Sow seeds at recommended depth"],
    },
    {
      name: "Germination",
      duration: "Days 8-15",
      color: "bg-chart-2",
      tasks: ["Maintain soil moisture", "Monitor temperature", "Protect from birds"],
    },
    {
      name: "Vegetative",
      duration: "Days 16-45",
      color: "bg-chart-3",
      tasks: ["Apply nitrogen fertilizer", "Regular irrigation", "Weed control"],
    },
    {
      name: "Flowering",
      duration: "Days 46-75",
      color: "bg-chart-4",
      tasks: ["Reduce nitrogen", "Increase phosphorus", "Monitor for pests"],
    },
    {
      name: "Fruiting",
      duration: "Days 76-105",
      color: "bg-chart-5",
      tasks: ["Potassium application", "Disease control", "Water management"],
    },
    {
      name: "Harvesting",
      duration: "Days 106-120",
      color: "bg-primary",
      tasks: ["Check maturity", "Prepare equipment", "Post-harvest handling"],
    },
  ];

  const schedules = [
    {
      category: "Fertilizer Schedule",
      icon: Sprout,
      items: [
        { week: "Week 1", action: "Base fertilizer - NPK 10:26:26", amount: "100 kg/acre" },
        { week: "Week 3", action: "Nitrogen top dressing", amount: "50 kg/acre" },
        { week: "Week 6", action: "Foliar spray - Micronutrients", amount: "As per label" },
        { week: "Week 8", action: "Potassium boost", amount: "30 kg/acre" },
      ],
    },
    {
      category: "Irrigation Schedule",
      icon: Droplets,
      items: [
        { week: "Week 1-2", action: "Light irrigation daily", amount: "15mm" },
        { week: "Week 3-6", action: "Irrigation every 3 days", amount: "25mm" },
        { week: "Week 7-10", action: "Irrigation every 5 days", amount: "30mm" },
        { week: "Week 11+", action: "Reduce irrigation", amount: "20mm" },
      ],
    },
    {
      category: "Pest Control",
      icon: Bug,
      items: [
        { week: "Week 2", action: "Preventive spray - Neem oil", amount: "2ml/liter" },
        { week: "Week 5", action: "Monitor for aphids", amount: "Weekly check" },
        { week: "Week 7", action: "Fungicide application", amount: "As needed" },
        { week: "Week 10", action: "Final pest inspection", amount: "Spot treatment" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Crop Calendar</h1>
        <p className="text-muted-foreground">Complete timeline and schedules for Wheat cultivation</p>
      </div>

      {/* Growth Stages Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Growth Stages Timeline
          </CardTitle>
          <CardDescription>Visual representation of crop development phases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline bar */}
            <div className="flex h-8 rounded-lg overflow-hidden mb-6">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className={`${stage.color} flex-1 flex items-center justify-center text-xs font-semibold text-white transition-all hover:opacity-80`}
                >
                  {stage.name}
                </div>
              ))}
            </div>

            {/* Stage details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: `hsl(var(--chart-${(index % 5) + 1}))` }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                    <Badge variant="outline" className="w-fit">{stage.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {stage.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {schedules.map((schedule, index) => {
          const Icon = schedule.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="h-5 w-5 text-primary" />
                  {schedule.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-1">
                        <Badge variant="outline" className="status-success">{item.week}</Badge>
                      </div>
                      <p className="text-sm font-medium mt-2">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Calendar Alerts */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg">📅 Upcoming Tasks This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span><strong>Today:</strong> Apply nitrogen top dressing (Week 3)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-warning"></div>
              <span><strong>Tomorrow:</strong> Irrigation scheduled - 25mm</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-info"></div>
              <span><strong>In 3 days:</strong> Weekly pest monitoring due</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
