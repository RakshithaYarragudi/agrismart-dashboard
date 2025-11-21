import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Search, ExternalLink } from "lucide-react";

export default function Pesticides() {
  const products = [
    {
      name: "Neem Oil Organic Pesticide",
      category: "Organic",
      description: "Natural pest control solution for a wide range of insects and fungal diseases",
      usage: "Dilute 2ml per liter of water, spray during early morning or evening",
      price: "₹450",
      rating: 4.5,
    },
    {
      name: "Systemic Insecticide - Imidacloprid",
      category: "Insecticide",
      description: "Effective against aphids, whiteflies, and leaf miners with long-lasting protection",
      usage: "0.3ml per liter, spray at pest appearance, repeat after 15 days if needed",
      price: "₹320",
      rating: 4.3,
    },
    {
      name: "Fungicide - Mancozeb 75% WP",
      category: "Fungicide",
      description: "Broad-spectrum fungicide for prevention and control of various fungal diseases",
      usage: "2g per liter, apply at first sign of disease, weekly intervals",
      price: "₹280",
      rating: 4.6,
    },
    {
      name: "NPK 19:19:19 Water Soluble Fertilizer",
      category: "Fertilizer",
      description: "Complete nutrition for all growth stages with balanced NPK ratio",
      usage: "5g per liter for foliar spray, 10g per liter for fertigation",
      price: "₹650",
      rating: 4.7,
    },
    {
      name: "Bio-Pesticide - Bacillus thuringiensis",
      category: "Bio-Pesticide",
      description: "Biological control for caterpillars and larvae, safe for beneficial insects",
      usage: "1-2ml per liter, spray when larvae are small, repeat weekly",
      price: "₹380",
      rating: 4.4,
    },
    {
      name: "Herbicide - Glyphosate 41% SL",
      category: "Herbicide",
      description: "Post-emergence weed control for annual and perennial weeds",
      usage: "30ml per liter, spray on weeds avoiding crop contact",
      price: "₹420",
      rating: 4.2,
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Organic: "status-success",
      Insecticide: "status-warning",
      Fungicide: "status-info",
      Fertilizer: "bg-primary/10 text-primary border-primary/20",
      "Bio-Pesticide": "bg-accent/10 text-accent border-accent/20",
      Herbicide: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    };
    return colors[category] || "status-info";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Pesticides Store</h1>
        <p className="text-muted-foreground">Browse recommended pesticides, fertilizers, and agricultural products</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="card-hover flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline" className={getCategoryColor(product.category)}>
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-warning">★</span>
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-1 text-muted-foreground">Usage Instructions</p>
                  <p className="text-sm">{product.usage}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">per unit</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <ShoppingBag className="h-3 w-3 mr-2" />
                  Amazon
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <ShoppingBag className="h-3 w-3 mr-2" />
                  Flipkart
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <ShoppingBag className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Product Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                These products are recommended based on your crop selection and local conditions. Always follow label instructions and safety guidelines when using agricultural chemicals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
