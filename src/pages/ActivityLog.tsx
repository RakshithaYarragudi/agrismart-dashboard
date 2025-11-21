import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

interface Activity {
  id: number;
  date: string;
  title: string;
  description: string;
  category: string;
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      date: "2025-01-15",
      title: "Applied NPK Fertilizer",
      description: "Applied 100kg of NPK 10:26:26 fertilizer to the wheat field",
      category: "Fertilization",
    },
    {
      id: 2,
      date: "2025-01-12",
      title: "Irrigation Completed",
      description: "Drip irrigation system run for 3 hours in the morning",
      category: "Irrigation",
    },
    {
      id: 3,
      date: "2025-01-10",
      title: "Pest Inspection",
      description: "Inspected for aphids and applied neem oil spray as preventive measure",
      category: "Pest Control",
    },
  ]);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddActivity = () => {
    const activity: Activity = {
      id: activities.length + 1,
      ...newActivity,
    };
    setActivities([activity, ...activities]);
    setNewActivity({
      title: "",
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsDialogOpen(false);
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Fertilization: "status-success",
      Irrigation: "status-info",
      "Pest Control": "status-warning",
      Planting: "bg-primary/10 text-primary border-primary/20",
      Harvesting: "bg-accent/10 text-accent border-accent/20",
    };
    return colors[category] || "status-info";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Activity Log</h1>
          <p className="text-muted-foreground">Track and manage your farming activities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>Record a new farming activity or task</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Applied fertilizer"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Fertilization, Irrigation"
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the activity in detail..."
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  rows={4}
                />
              </div>
              <Button onClick={handleAddActivity} className="w-full">Add Activity</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Activities</p>
            <p className="text-3xl font-bold mt-2">{activities.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-3xl font-bold mt-2">
              {activities.filter((a) => new Date(a.date).getMonth() === new Date().getMonth()).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Last Activity</p>
            <p className="text-lg font-semibold mt-2">
              {activities.length > 0 ? new Date(activities[0].date).toLocaleDateString() : "N/A"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-3xl font-bold mt-2">{new Set(activities.map((a) => a.category)).size}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold mb-2">No activities yet</p>
              <p className="text-sm text-muted-foreground mb-4">Start tracking your farming activities</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Activity
              </Button>
            </CardContent>
          </Card>
        ) : (
          activities.map((activity) => (
            <Card key={activity.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                    <CardDescription className="mt-2">{activity.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
