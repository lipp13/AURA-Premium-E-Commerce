import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, currentUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center space-y-6 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Anda Sudah Memiliki Akun Active
        </h2>
        <p className="text-sm text-neutral-500">
          Saat ini Anda login sebagai <span className="font-semibold text-neutral-900 dark:text-white">{currentUser?.name}</span>.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/dashboard')}>
            Buka Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Kembali ke Belanja
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Masukkan nama lengkap Anda.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan email yang valid.');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sesuai dengan password.');
      return;
    }
    if (!agreeTerms) {
      setError('Anda harus menyetujui Syarat & Ketentuan layanan.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({ name, email, password });
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'Pendaftaran Akun' }]} />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-lg overflow-hidden">
        {/* Left Side Banner */}
        <div className="p-8 md:p-12 bg-neutral-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Join AURA Community
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Bergabung Bersama Kami
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Dapatkan pengalaman belanja furniture & audio eksklusif dengan garansi resmi, pengiriman cepat, dan poin prioritas.
            </p>
          </div>

          <div className="relative z-10 pt-8 space-y-3">
            {[
              'Gratis ongkir untuk pesanan pertama',
              'Akses awal ke koleksi produk edisi terbatas',
              'Manajemen pengembalian & garansi mudah',
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Buat Akun Baru
            </h2>
            <p className="text-xs text-neutral-500">
              Isi data berikut untuk mendaftar akun AURA Anda
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
              label="Nama Lengkap"
              type="text"
              icon={User}
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
                placeholder="Minimal 6 karakter"
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

            <Input
              label="Konfirmasi Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-neutral-500"
              />
              <span>Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi AURA.</span>
            </label>

            <Button fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? 'Mendaftarkan Akun...' : 'Daftar Akun Sekarang'}
            </Button>
          </form>

          <div className="text-center text-xs text-neutral-500 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            Sudah punya akun AURA?{' '}
            <Link to="/login" className="font-bold text-neutral-900 dark:text-white underline hover:opacity-80">
              Masuk di sini →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
