import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_USERS } from '../data/mockData';

const STORAGE_KEY_USER = 'smartpolice_active_user';
const STORAGE_KEY_ALL_USERS = 'smartpolice_registered_users';

// Initialize local users storage with defaults if empty
const getStoredUsers = (): UserProfile[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALL_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return DEMO_USERS;
  }
};

export const authService = {
  getCurrentUser: (): UserProfile | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  login: async (email: string, password?: string, role: UserRole = 'citizen'): Promise<{ user: UserProfile | null; error?: string }> => {
    // 1. Try real Supabase auth if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'TestPass@123',
        });

        if (error) {
          return { user: null, error: error.message };
        }

        if (data.user) {
          // Fetch profile from supabase 'profiles' table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const activeUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
            phone: profile?.phone || data.user.user_metadata?.phone,
            role: profile?.role || (email.includes('admin') || role === 'admin' ? 'admin' : 'citizen'),
            badgeNumber: profile?.badge_number,
            department: profile?.department,
            state: profile?.state,
            createdAt: profile?.created_at || new Date().toISOString(),
          };

          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(activeUser));
          return { user: activeUser };
        }
      } catch (err: any) {
        console.warn('Supabase auth failed, falling back to local auth mode:', err.message);
      }
    }

    // 2. Demo / Simulated local authentication
    await new Promise((resolve) => setTimeout(resolve, 400));
    const allUsers = getStoredUsers();
    let found = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!found) {
      // Auto-create user for demo convenience if standard citizen email
      if (email.toLowerCase().includes('admin') || role === 'admin') {
        return { user: null, error: 'Admin account not found. Use admin@smartpolice.in for testing.' };
      }

      found = {
        id: 'usr-' + Date.now(),
        email: email.trim().toLowerCase(),
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
        role: 'citizen',
        createdAt: new Date().toISOString(),
      };
      allUsers.push(found);
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(allUsers));
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(found));
    return { user: found };
  },

  register: async (
    fullName: string,
    email: string,
    phone: string,
    password?: string,
    state?: string
  ): Promise<{ user: UserProfile | null; error?: string }> => {
    // 1. If Supabase is connected
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || 'DefaultSecure@123',
          options: {
            data: {
              full_name: fullName,
              phone: phone,
              role: 'citizen',
              state: state || 'Delhi',
            },
          },
        });

        if (error) {
          return { user: null, error: error.message };
        }

        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            email,
            fullName,
            phone,
            role: 'citizen',
            state,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
          return { user: newUser };
        }
      } catch (err: any) {
        console.warn('Supabase sign up error, falling back to local mode:', err.message);
      }
    }

    // 2. Local fallback registration
    await new Promise((resolve) => setTimeout(resolve, 400));
    const allUsers = getStoredUsers();
    const existing = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      return { user: null, error: 'An account with this email already exists. Please log in.' };
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      role: 'citizen',
      state: state || 'Delhi',
      createdAt: new Date().toISOString(),
    };

    allUsers.push(newUser);
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(allUsers));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    return { user: newUser };
  },

  logout: async (): Promise<void> => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Supabase sign out error:', err);
      }
    }
    localStorage.removeItem(STORAGE_KEY_USER);
  }
};
