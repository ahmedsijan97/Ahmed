import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdminUserData {
  id: string;
  username: string;
  role: string;
  mustChangePassword?: boolean;
  lastLogin?: string;
}

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  adminUser: AdminUserData | null;
  token: string | null;
  loading: boolean;
  mustChangePassword: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string; attemptsLeft?: number }>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const TOKEN_KEY = 'sayed_admin_jwt_token';
const USER_KEY = 'sayed_admin_user_cache';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUserData | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    const currentToken = token || localStorage.getItem(TOKEN_KEY);
    if (!currentToken) {
      setAdminUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          setAdminUser(json.user);
          localStorage.setItem(USER_KEY, JSON.stringify(json.user));
        }
      } else {
        // Token expired or invalid
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setAdminUser(null);
      }
    } catch (err) {
      console.warn('Auth validation failed:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string; attemptsLeft?: number }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        return {
          success: false,
          error: json.error || 'Authentication failed.',
          attemptsLeft: json.attemptsLeft
        };
      }

      setToken(json.token);
      setAdminUser(json.user);
      try {
        localStorage.setItem(TOKEN_KEY, json.token);
        localStorage.setItem(USER_KEY, JSON.stringify(json.user));
      } catch {
        // ignore
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Unable to connect to login server.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      // ignore
    } finally {
      setToken(null);
      setAdminUser(null);
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } catch {
        // ignore
      }
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        return { success: false, error: json.error || 'Failed to change password.' };
      }

      if (adminUser) {
        const updated = { ...adminUser, mustChangePassword: false };
        setAdminUser(updated);
        localStorage.setItem(USER_KEY, JSON.stringify(updated));
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Server error changing password.' };
    }
  };

  const isAuthenticated = Boolean(token && adminUser);
  const mustChangePassword = Boolean(adminUser?.mustChangePassword);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        token,
        loading,
        mustChangePassword,
        login,
        logout,
        changePassword,
        checkAuth
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
}
