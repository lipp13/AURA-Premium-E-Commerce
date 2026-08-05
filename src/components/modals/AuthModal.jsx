import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, register } = useAuth();
  const [mode, setMode] = useState(authModalMode || 'login');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setError('');
  }, [authModalMode, isAuthModalOpen]);

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail.trim()) {
      setError('Masukkan alamat email Anda.');
      return;
    }
    if (!loginPassword) {
      setError('Masukkan password Anda.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(loginEmail, loginPassword);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 400);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!registerName.trim()) {
      setError('Masukkan nama lengkap Anda.');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (registerPassword.length < 6) {
      setError('Password minimal harus 6 karakter.');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      });
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 400);
  };

  const fillDemoAccount = () => {
    setLoginEmail('alex.vance@aura.design');
    setLoginPassword('password123');
    setError('');
  };

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} maxWidth="max-w-md">
      <div className="space-y-6">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex gap-4">
            <button
              onClick={() => handleModeSwitch('login')}
              className={`text-lg font-bold transition-colors relative pb-2 ${
                mode === 'login'
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              Masuk
              {mode === 'login' && (
                <motion.div
                  layoutId="authTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
                />
              )}
            </button>
            <button
              onClick={() => handleModeSwitch('register')}
              className={`text-lg font-bold transition-colors relative pb-2 ${
                mode === 'register'
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              Daftar Akun
              {mode === 'register' && (
                <motion.div
                  layoutId="authTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
                />
              )}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <Input
              label="Alamat Email"
              type="email"
              icon={Mail}
              placeholder="nama@domain.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk ke Akun'}
            </Button>

            {/* Quick Demo Credentials Assistant */}
            <div className="pt-2">
              <button
                type="button"
                onClick={fillDemoAccount}
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">Isi Otomatis Akun Demo</span>
                </div>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white font-mono">
                  alex.vance@aura.design
                </span>
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              icon={User}
              placeholder="Contoh: Budi Santoso"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />

            <Input
              label="Alamat Email"
              type="email"
              icon={Mail}
              placeholder="nama@domain.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="Minimal 6 karakter"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Input
              label="Konfirmasi Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}
            </Button>
          </form>
        )}

        {/* Footer switch text */}
        <div className="text-center text-xs text-neutral-500 pt-2 border-t border-neutral-200 dark:border-neutral-800">
          {mode === 'login' ? (
            <p>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => handleModeSwitch('register')}
                className="font-bold text-neutral-900 dark:text-white underline hover:opacity-80"
              >
                Daftar sekarang
              </button>
            </p>
          ) : (
            <p>
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className="font-bold text-neutral-900 dark:text-white underline hover:opacity-80"
              >
                Masuk di sini
              </button>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
