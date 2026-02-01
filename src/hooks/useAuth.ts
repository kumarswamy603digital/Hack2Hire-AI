import { useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AppRole = "admin" | "recruiter" | "candidate";

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data as Profile;
    } catch (err) {
      console.error("Profile fetch error:", err);
      return null;
    }
  }, []);

  // Fetch user roles
  const fetchRoles = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching roles:", error);
        return [];
      }
      return (data || []).map((r) => r.role as AppRole);
    } catch (err) {
      console.error("Roles fetch error:", err);
      return [];
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer profile/role fetching to avoid deadlock
        if (session?.user) {
          setTimeout(async () => {
            const [profileData, rolesData] = await Promise.all([
              fetchProfile(session.user.id),
              fetchRoles(session.user.id),
            ]);
            setProfile(profileData);
            setRoles(rolesData);
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        Promise.all([
          fetchProfile(session.user.id),
          fetchRoles(session.user.id),
        ]).then(([profileData, rolesData]) => {
          setProfile(profileData);
          setRoles(rolesData);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchRoles]);

  // Sign up with email
  const signUp = useCallback(async (
    email: string, 
    password: string, 
    fullName?: string
  ) => {
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName || "",
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please sign in.");
        } else {
          toast.error(error.message);
        }
        return { error };
      }

      toast.success("Account created! Please check your email to confirm.");
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      toast.error(message);
      return { error: { message } };
    }
  }, []);

  // Sign in with email
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success("Welcome back!");
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      toast.error(message);
      return { error: { message } };
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return { error };
      }
      toast.success("Signed out successfully");
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      toast.error(message);
      return { error: { message } };
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return { error: { message: "Not authenticated" } };

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id);

      if (error) {
        toast.error(error.message);
        return { error };
      }

      // Refresh profile
      const newProfile = await fetchProfile(user.id);
      setProfile(newProfile);
      toast.success("Profile updated");
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
      return { error: { message } };
    }
  }, [user, fetchProfile]);

  // Role checks
  const hasRole = useCallback((role: AppRole) => roles.includes(role), [roles]);
  const isAdmin = useCallback(() => hasRole("admin"), [hasRole]);
  const isRecruiter = useCallback(() => hasRole("recruiter") || hasRole("admin"), [hasRole]);
  const isCandidate = useCallback(() => hasRole("candidate"), [hasRole]);

  // Get primary role (highest privilege)
  const getPrimaryRole = useCallback((): AppRole => {
    if (roles.includes("admin")) return "admin";
    if (roles.includes("recruiter")) return "recruiter";
    return "candidate";
  }, [roles]);

  return {
    user,
    session,
    profile,
    roles,
    isLoading,
    isAuthenticated: !!session,
    signUp,
    signIn,
    signOut,
    updateProfile,
    hasRole,
    isAdmin,
    isRecruiter,
    isCandidate,
    getPrimaryRole,
    refreshProfile: () => user && fetchProfile(user.id).then(setProfile),
    refreshRoles: () => user && fetchRoles(user.id).then(setRoles),
  };
}
