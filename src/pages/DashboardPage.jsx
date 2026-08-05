import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { User, Package, MapPin, Bell, Settings, LogOut, CheckCircle2, Clock, Truck, ShieldAlert, KeyRound } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { currentUser, isAuthenticated, logout, updateProfile, updatePassword, openAuthModal } = useAuth();
  const { addToast } = useToast();

  const [tab, setTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'notifications' | 'settings'

  // Profile Form State
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || '');
  const [profileCity, setProfileCity] = useState(currentUser?.city || '');
  const [profileCountry, setProfileCountry] = useState(currentUser?.country || '');
  const [profileZip, setProfileZip] = useState(currentUser?.zip || '');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfileEmail(currentUser.email || '');
      setProfilePhone(currentUser.phone || '');
      setProfileAddress(currentUser.address || '');
      setProfileCity(currentUser.city || '');
      setProfileCountry(currentUser.country || '');
      setProfileZip(currentUser.zip || '');
    }
  }, [currentUser]);

  const getUserInitials = (name) => {
    if (!name) return 'AU';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      address: profileAddress,
      city: profileCity,
      country: profileCountry,
      zip: profileZip,
    });
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast('Harap isi password lama dan password baru.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Password baru minimal 6 karakter.', 'error');
      return;
    }
    const res = updatePassword(currentPassword, newPassword);
    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  const dummyOrders = [
    {
      id: 'AU-849201',
      date: 'August 02, 2026',
      total: 349,
      status: 'In Transit',
      items: ['AURA Sound Studio Pro Headphones'],
      tracking: 'UPS 1Z9999999999999999'
    },
    {
      id: 'AU-710293',
      date: 'July 18, 2026',
      total: 850,
      status: 'Delivered',
      items: ['AURA Ergonomic Task Chair'],
      tracking: 'FedEx 7820192019'
    }
  ];

  // If user is not logged in (Guest State)
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ label: 'User Dashboard' }]} />
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-6 shadow-apple-lg">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              Akses Dashboard Terbatas
            </h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Silakan masuk ke akun Anda atau daftar untuk melihat pesanan aktif, kelola alamat pengiriman, dan pengaturan profil.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button fullWidth onClick={() => openAuthModal('login')}>
              Masuk ke Akun
            </Button>
            <Button variant="outline" fullWidth onClick={() => openAuthModal('register')}>
              Daftar Akun Baru
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'User Dashboard' }]} />

      {/* User Header Card */}
      <div className="p-8 rounded-3xl bg-neutral-900 text-white dark:bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-apple-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white text-black font-extrabold text-xl flex items-center justify-center shadow-apple-md">
            {getUserInitials(currentUser?.name)}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">{currentUser?.name}</h2>
            <p className="text-xs text-neutral-400">
              {currentUser?.role || 'AURA Member'} • {currentUser?.email}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="gap-2 text-white border-neutral-700 hover:bg-neutral-800"
        >
          <LogOut className="w-4 h-4" /> Keluar Sesi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
          {[
            { id: 'orders', label: 'Riwayat Pesanan', icon: Package },
            { id: 'profile', label: 'Detail Profil', icon: User },
            { id: 'addresses', label: 'Alamat Pengiriman', icon: MapPin },
            { id: 'notifications', label: 'Notifikasi & Preferensi', icon: Bell },
            { id: 'settings', label: 'Keamanan Akun', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  tab === item.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-apple-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="md:col-span-3 space-y-6">
          {/* Orders */}
          {tab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Pesanan Aktif & Riwayat
              </h3>
              {dummyOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-apple-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 text-xs">
                    <div>
                      <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">
                        {order.id}
                      </span>
                      <span className="text-neutral-400 ml-3">Dipesan pada {order.date}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        order.status === 'In Transit'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        {order.items.join(', ')}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Nomor Resi: {order.tracking}
                      </p>
                    </div>
                    <span className="text-lg font-bold">${order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <form
              onSubmit={handleSaveProfile}
              className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Detail Profil Pengguna
              </h3>
              <Input
                label="Nama Lengkap"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <Input
                label="Alamat Email"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
              <Input
                label="Nomor Telepon"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                placeholder="+62 812 3456 7890"
              />
              <Button type="submit">Simpan Perubahan Profil</Button>
            </form>
          )}

          {/* Addresses */}
          {tab === 'addresses' && (
            <form
              onSubmit={handleSaveProfile}
              className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Alamat Pengiriman Utama
              </h3>
              <Input
                label="Jalan / Alamat Lengkap"
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
                placeholder="Contoh: Jl. Sudirman No. 45"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Kota"
                  value={profileCity}
                  onChange={(e) => setProfileCity(e.target.value)}
                  placeholder="Jakarta"
                />
                <Input
                  label="Negara"
                  value={profileCountry}
                  onChange={(e) => setProfileCountry(e.target.value)}
                  placeholder="Indonesia"
                />
                <Input
                  label="Kode Pos"
                  value={profileZip}
                  onChange={(e) => setProfileZip(e.target.value)}
                  placeholder="10110"
                />
              </div>
              <Button type="submit">Perbarui Alamat Pengiriman</Button>
            </form>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Preferensi Notifikasi
              </h3>
              <label className="flex items-center gap-3 text-sm font-medium">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Terima pembaruan status pengiriman pesanan via WhatsApp/SMS</span>
              </label>
              <label className="flex items-center gap-3 text-sm font-medium">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Buletin e-mail penawaran produk baru & diskon khusus member</span>
              </label>
            </div>
          )}

          {/* Settings */}
          {tab === 'settings' && (
            <form
              onSubmit={handleSavePassword}
              className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Keamanan & Password Akun
              </h3>
              <Input
                label="Password Saat Ini"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="Password Baru"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button type="submit">Ubah Password Akun</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
