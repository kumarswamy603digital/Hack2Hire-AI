import { useState } from "react";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useTeamManagement, TeamMember } from "@/hooks/useTeamManagement";
import { useAuthContext } from "@/contexts/AuthContext";
import { AppRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  Users,
  UserCheck,
  GraduationCap,
  Search,
  RefreshCw,
  Loader2,
  Plus,
  Trash2,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

function AdminDashboardContent() {
  const { user } = useAuthContext();
  const { members, isLoading, refreshMembers, updateMemberRole, addRole, removeRole, getStats } = useTeamManagement();
  const stats = getStats();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<AppRole | "all">("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<AppRole>("candidate");
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesRole = roleFilter === "all" || member.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const handleAddRole = async () => {
    if (!selectedMember) return;
    setIsUpdating(true);
    await addRole(selectedMember.user_id, pendingRole);
    setIsUpdating(false);
    setIsRoleDialogOpen(false);
    setSelectedMember(null);
  };

  const handleRemoveRole = async (member: TeamMember, role: AppRole) => {
    if (member.user_id === user?.id && role === "admin") {
      return; // Can't remove own admin role
    }
    await removeRole(member.user_id, role);
  };

  const getRoleBadgeVariant = (role: AppRole) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "recruiter":
        return "default";
      default:
        return "secondary";
    }
  };

  const getRoleIcon = (role: AppRole) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "recruiter":
        return <UserCheck className="w-3 h-3" />;
      default:
        return <GraduationCap className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Admin Dashboard
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Manage team members, assign roles, and control access permissions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-xl p-5 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <Crown className="w-6 h-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.admins}</div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <UserCheck className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.recruiters}</div>
              <div className="text-sm text-muted-foreground">Recruiters</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <GraduationCap className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.candidates}</div>
              <div className="text-sm text-muted-foreground">Candidates</div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as AppRole | "all")}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={refreshMembers} disabled={isLoading}>
                <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
              </Button>
            </div>
          </div>

          {/* Team Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No team members found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {member.full_name || "Unnamed"}
                            {member.user_id === user?.id && (
                              <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.roles.map((role) => (
                            <Badge
                              key={role}
                              variant={getRoleBadgeVariant(role)}
                              className="capitalize gap-1"
                            >
                              {getRoleIcon(role)}
                              {role}
                              {member.user_id !== user?.id && member.roles.length > 1 && (
                                <button
                                  onClick={() => handleRemoveRole(member, role)}
                                  className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(member.created_at).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMember(member);
                            setIsRoleDialogOpen(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Add Role Dialog */}
          <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Role</DialogTitle>
                <DialogDescription>
                  Add a new role to {selectedMember?.full_name || selectedMember?.email}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Select value={pendingRole} onValueChange={(v) => setPendingRole(v as AppRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                    <SelectItem value="recruiter">Recruiter - Manage candidates</SelectItem>
                    <SelectItem value="candidate">Candidate - Take assessments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="hero" onClick={handleAddRole} disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Role"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  return (
    <ProtectedRoute requiredRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
