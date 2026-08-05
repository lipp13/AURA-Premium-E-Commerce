import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, currentUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in
  if (isAuthenticated) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center space-y-6 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Anda Sudah Masuk
        </h2>
        <p className="text-sm text-neutral-500">
          Anda saat ini terhubung sebagai <span className="font-semibold text-neutral-900 dark:text-white">{currentUser?.name}</span> ({currentUser?.email}).
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/dashboard')}>
            Buka Dashboard Profil
          </Button>
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Kembali ke Toko
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Silakan masukkan alamat email.');
      return;
    }
    if (!password) {
      setError('Silakan masukkan password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const fillDemoAccount = () => {
    setEmail('alex.vance@aura.design');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'Masuk Akun' }]} />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-lg overflow-hidden">
        {/* Left Side Banner */}
        <div className="p-8 md:p-12 bg-neutral-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              AURA Design Experience
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Akses riwayat pesanan, koleksi favorit, pelacakan pengiriman instan, dan diskon eksklusif member.
            </p>
          </div>

          <div className="relative z-10 pt-12 space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/50 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Akun Demo Tersedia</span>
              </div>
              <p className="text-xs text-neutral-300">
                Email: <code className="font-mono text-white">alex.vance@aura.design</code><br />
                Password: <code className="font-mono text-white">password123</code>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Masuk ke Akun Anda
            </h2>
            <p className="text-xs text-neutral-500">
              Masukkan kredensial terdaftar untuk melanjutkan
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Alamat Email"
              type="email"
              icon={Mail}
              placeholder="nama@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Memproses Sign In...' : 'Masuk Sekarang'}
            </Button>
          </form>

          <button
            type="button"
            onClick={fillDemoAccount}
            className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 transition-all font-semibold"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Gunakan Akun Demo
          </button>

          <div className="text-center text-xs text-neutral-500 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            Belum memiliki akun AURA?{' '}
            <Link to="/register" className="font-bold text-neutral-900 dark:text-white underline hover:opacity-80">
              Daftar akun baru →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
