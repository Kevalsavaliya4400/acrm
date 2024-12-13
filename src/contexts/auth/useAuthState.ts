import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '../../services/auth/authService';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user } = await authService.signIn(email, password);
    setUser(user);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { user } = await authService.signUp(email, password, fullName);
    setUser(user);
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    if (!user) return;
    const { user: updatedUser } = await authService.updateProfile(user.id, updates);
    setUser(updatedUser);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
}