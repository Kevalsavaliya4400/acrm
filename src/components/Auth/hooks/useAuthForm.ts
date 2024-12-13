import { useState } from 'react';
import { useAuth } from '../../../contexts/auth/AuthContext';

interface AuthFormState {
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' } | null;
}

export function useAuthForm() {
  const [state, setState] = useState<AuthFormState>({
    loading: false,
    toast: null
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setToast = (toast: AuthFormState['toast']) => {
    setState(prev => ({ ...prev, toast }));
  };

  const handleError = (error: unknown) => {
    setToast({
      message: error instanceof Error ? error.message : 'An error occurred',
      type: 'error'
    });
  };

  return {
    ...state,
    setLoading,
    setToast,
    handleError
  };
}