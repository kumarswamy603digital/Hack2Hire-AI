import { useState } from "react";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Building,
  Save,
  Loader2,
  Shield,
  Calendar,
} from "lucide-react";

function ProfileContent() {
  const { profile, roles, updateProfile, getPrimaryRole } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [companyName, setCompanyName] = useState(profile?.company_name || "");

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile({
      full_name: fullName,
      company_name: companyName,
    });
    setIsSaving(false);
    setIsEditing(false);
  };

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Your Profile
            </h1>
            <div className="flex items-center justify-center gap-2">
              {roles.map((role) => (
                <Badge key={role} variant={getRoleBadgeVariant(role)} className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Profile Information
              </h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Email (read-only) */}
              <div>
                <Label className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  value={profile?.email || ""}
                  disabled
                  className="bg-secondary/50"
                />
              </div>

              {/* Full Name */}
              <div>
                <Label className="flex items-center gap-2 text-muted-foreground mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Company Name */}
              <div>
                <Label className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building className="w-4 h-4" />
                  Company Name
                </Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your company name"
                />
              </div>

              {/* Roles (read-only) */}
              <div>
                <Label className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Shield className="w-4 h-4" />
                  Roles
                </Label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <Badge key={role} variant={getRoleBadgeVariant(role)} className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Contact an administrator to change your roles.
                </p>
              </div>

              {/* Member Since */}
              <div>
                <Label className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </Label>
                <p className="text-foreground">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unknown"}
                </p>
              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(profile?.full_name || "");
                    setCompanyName(profile?.company_name || "");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="glass-card rounded-xl p-6 mt-6">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Your Activity
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Interviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Practice Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">-</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
