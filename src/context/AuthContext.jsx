import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 'usr_1',
    name: 'Alex Vance',
    email: 'alex.vance@aura.design',
    password: 'password123',
    phone: '+39 02 889 102',
    address: 'Via Montenapoleone 8',
    city: 'Milan',
    country: 'Italy',
    zip: '20121',
    role: 'VIP Inner Circle',
    avatar: null
  }
];

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  // Load users list from localStorage or initialize with DEFAULT_USERS
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('aura_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored users:', e);
      }
    }
    return DEFAULT_USERS;
  });

  // Load current user session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('aura_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing stored current user:', e);
      }
    }
    // Default logged in user for instant preview experience if desired, or null
    return DEFAULT_USERS[0];
  });

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem('aura_users', JSON.stringify(users));
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aura_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aura_current_user');
    }
  }, [currentUser]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      addToast(`Selamat datang kembali, ${foundUser.name}!`, 'success');
      closeAuthModal();
      return { success: true };
    } else {
      const emailExists = users.some((u) => u.email.toLowerCase() === trimmedEmail);
      const errorMsg = emailExists
        ? 'Password yang Anda masukkan salah.'
        : 'Akun dengan email ini belum terdaftar.';
      addToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    }
  };

  const register = ({ name, email, password }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      const errorMsg = 'Email ini sudah terdaftar. Silakan login.';
      addToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      phone: '',
      address: '',
      city: '',
      country: '',
      zip: '',
      role: 'Member',
      avatar: null
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    addToast(`Pendaftaran berhasil! Selamat datang di AURA, ${newUser.name}.`, 'success');
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    const userName = currentUser?.name || 'User';
    setCurrentUser(null);
    addToast(`Berhasil keluar dari akun (${userName}).`, 'info');
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const newProfile = { ...currentUser, ...updatedData };
    setCurrentUser(newProfile);

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === newProfile.id ? newProfile : u))
    );
    addToast('Profil berhasil diperbarui', 'success');
  };

  const updatePassword = (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, message: 'Tidak ada sesi login.' };
    if (currentUser.password !== currentPassword) {
      const errorMsg = 'Password lama Anda salah.';
      addToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    }

    const updated = { ...currentUser, password: newPassword };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    addToast('Password berhasil diubah!', 'success');
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated: !!currentUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
