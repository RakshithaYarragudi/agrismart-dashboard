import { Link, useLocation } from "react-router-dom";
import { Home, CloudRain, Sprout, Calendar, ShoppingBag, DollarSign, ListTodo, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/weather", label: "Weather", icon: CloudRain },
  { path: "/crop-recommendation", label: "Crop Recommendation", icon: Sprout },
  { path: "/crop-calendar", label: "Crop Calendar", icon: Calendar },
  { path: "/pesticides", label: "Pesticides Store", icon: ShoppingBag },
  { path: "/cost-estimator", label: "Cost Estimator", icon: DollarSign },
  { path: "/activity-log", label: "Activity Log", icon: ListTodo },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">AgriSmart AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 flex-1">
            <NavLinks />
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-2 mt-8">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container py-8">{children}</main>

      <footer className="border-t bg-card mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriSmart AI. Empowering farmers with intelligent solutions.</p>
        </div>
      </footer>
    </div>
  );
};
