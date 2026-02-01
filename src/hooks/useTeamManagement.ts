import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile, AppRole } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface TeamMember extends Profile {
  roles: AppRole[];
}

export function useTeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeamMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch all profiles (admin only due to RLS)
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast.error("Failed to load team members");
        setIsLoading(false);
        return;
      }

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
      }

      // Combine profiles with roles
      const membersWithRoles: TeamMember[] = (profiles || []).map((profile) => ({
        ...profile,
        roles: (roles || [])
          .filter((r) => r.user_id === profile.user_id)
          .map((r) => r.role as AppRole),
      }));

      setMembers(membersWithRoles);
    } catch (err) {
      console.error("Team fetch error:", err);
      toast.error("Failed to load team");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const updateMemberRole = useCallback(async (userId: string, newRole: AppRole) => {
    try {
      // First, delete existing roles for this user
      const { error: deleteError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        toast.error("Failed to update role");
        return { error: deleteError };
      }

      // Then insert the new role
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: newRole });

      if (insertError) {
        toast.error("Failed to assign new role");
        return { error: insertError };
      }

      toast.success("Role updated successfully");
      await fetchTeamMembers();
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update role";
      toast.error(message);
      return { error: { message } };
    }
  }, [fetchTeamMembers]);

  const addRole = useCallback(async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role });

      if (error) {
        if (error.code === "23505") {
          toast.error("User already has this role");
        } else {
          toast.error("Failed to add role");
        }
        return { error };
      }

      toast.success("Role added successfully");
      await fetchTeamMembers();
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add role";
      toast.error(message);
      return { error: { message } };
    }
  }, [fetchTeamMembers]);

  const removeRole = useCallback(async (userId: string, role: AppRole) => {
    try {
      // Don't allow removing the last role
      const member = members.find((m) => m.user_id === userId);
      if (member && member.roles.length <= 1) {
        toast.error("Cannot remove the last role. Users must have at least one role.");
        return { error: { message: "Cannot remove last role" } };
      }

      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);

      if (error) {
        toast.error("Failed to remove role");
        return { error };
      }

      toast.success("Role removed successfully");
      await fetchTeamMembers();
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remove role";
      toast.error(message);
      return { error: { message } };
    }
  }, [fetchTeamMembers, members]);

  const getStats = useCallback(() => {
    const admins = members.filter((m) => m.roles.includes("admin")).length;
    const recruiters = members.filter((m) => m.roles.includes("recruiter")).length;
    const candidates = members.filter((m) => m.roles.includes("candidate")).length;
    return { total: members.length, admins, recruiters, candidates };
  }, [members]);

  return {
    members,
    isLoading,
    refreshMembers: fetchTeamMembers,
    updateMemberRole,
    addRole,
    removeRole,
    getStats,
  };
}
