import { Button } from "@/components/ui/button";
import { LogOut, User, Shield, BarChart3, Users, History, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import hack2hireLogo from "@/assets/hack2hire-logo.png";

export const Header = () => {
  const { isAuthenticated, isLoading, profile, signOut, getPrimaryRole, isAdmin } = useAuthContext();
  const primaryRole = getPrimaryRole();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "recruiter":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={hack2hireLogo} 
              alt="Hack2Hire AI" 
              className="h-10 w-auto object-contain"
            />
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/analyze" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resume
            </Link>
            <Link to="/jd-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              JD Analysis
            </Link>
            <Link to="/interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Interview
            </Link>
            <Link to="/practice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </Link>
            <Link to="/voice-interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Mic className="w-3 h-3" />
              Voice
            </Link>
            <Link to="/coding" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Coding
            </Link>
            <Link to="/skill-plan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Skill Plan
            </Link>
            {(isAdmin() || getPrimaryRole() === "recruiter") && (
              <>
                <Link to="/comparison" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Compare
                </Link>
                <Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Analytics
                </Link>
              </>
            )}
            {isAdmin() && (
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </Link>
            )}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline">
                      {profile?.full_name || profile?.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>My Account</span>
                    <Badge variant={getRoleBadgeVariant(primaryRole)} className="capitalize text-xs">
                      {primaryRole}
                    </Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/history" className="cursor-pointer">
                      <History className="w-4 h-4 mr-2" />
                      My History
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
