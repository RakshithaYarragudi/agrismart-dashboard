import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function CostEstimator() {
  const costBreakdown = {
    seeds: 3000,
    fertilizers: 5000,
    pesticides: 2500,
    irrigation: 2000,
    labor: 8000,
    equipment: 1500,
    misc: 1000,
  };

  const revenue = {
    expectedYield: "25 quintals/acre",
    marketPrice: "₹2,000/quintal",
    totalRevenue: 50000,
  };

  const netProfit = revenue.totalRevenue - Object.values(costBreakdown).reduce((a, b) => a + b, 0);
  const profitPercentage = ((netProfit / revenue.totalRevenue) * 100).toFixed(1);

  const chartData = [
    { name: "Seeds", cost: costBreakdown.seeds, revenue: 0 },
    { name: "Fertilizers", cost: costBreakdown.fertilizers, revenue: 0 },
    { name: "Pesticides", cost: costBreakdown.pesticides, revenue: 0 },
    { name: "Irrigation", cost: costBreakdown.irrigation, revenue: 0 },
    { name: "Labor", cost: costBreakdown.labor, revenue: 0 },
    { name: "Equipment", cost: costBreakdown.equipment, revenue: 0 },
    { name: "Total", cost: Object.values(costBreakdown).reduce((a, b) => a + b, 0), revenue: revenue.totalRevenue },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Cost & Profit Estimator</h1>
        <p className="text-muted-foreground">Calculate expected costs and returns for your crop</p>
      </div>

      {/* Selection Form */}
      <Card>
        <CardHeader>
          <CardTitle>Select Crop Details</CardTitle>
          <CardDescription>Choose your crop and land area for cost estimation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select defaultValue="wheat">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Land Area (acres)</Label>
              <Input type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label>Season</Label>
              <Select defaultValue="rabi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rabi">Rabi</SelectItem>
                  <SelectItem value="kharif">Kharif</SelectItem>
                  <SelectItem value="zaid">Zaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <span className="text-3xl font-bold">₹{Object.values(costBreakdown).reduce((a, b) => a + b, 0).toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">per acre</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">₹{revenue.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{revenue.expectedYield}</p>
          </CardContent>
        </Card>

        <Card className="bg-success/5 border-success/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="text-3xl font-bold text-success">₹{netProfit.toLocaleString()}</span>
            </div>
            <Badge variant="outline" className="status-success mt-2">
              {profitPercentage}% margin
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Detailed breakdown of expenses per acre</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(costBreakdown).map(([key, value]) => (
              <div key={key} className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground capitalize mb-1">{key}</p>
                <p className="text-xl font-bold">₹{value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost vs Revenue Analysis</CardTitle>
          <CardDescription>Visual comparison of expenses and income</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="hsl(var(--destructive))" name="Cost (₹)" />
              <Bar dataKey="revenue" fill="hsl(var(--success))" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Details */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Expected Yield</span>
              <span className="font-semibold">{revenue.expectedYield}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Current Market Price</span>
              <span className="font-semibold">{revenue.marketPrice}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-muted-foreground">Total Expected Revenue</span>
              <span className="font-semibold text-primary text-lg">₹{revenue.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
