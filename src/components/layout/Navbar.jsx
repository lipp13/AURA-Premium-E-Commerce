import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  SlidersHorizontal,
  Scale,
  LogOut,
  LogIn,
  ChevronDown
} from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { useAuth } from "../../context/AuthContext";
import { SearchModal } from "../modals/SearchModal";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const { currentUser, isAuthenticated, openAuthModal, logout } = useAuth();

  const getUserInitials = (name) => {
    if (!name) return 'AU';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 glass-nav backdrop-blur-2xl border-b border-neutral-200/40 dark:border-neutral-800/40"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:h-20">
            {/* Logo */}
            <div className="justify-self-start pl-1 md:pl-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
                  AURA
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-10 justify-self-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? "text-neutral-900 dark:text-white font-semibold"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                aria-label="Search products"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Compare Icon */}
              <Link
                to="/compare"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors hidden md:flex"
                aria-label="Compare products"
              >
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                {compareList.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-bold flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors hidden md:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors hidden md:flex"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-bold flex items-center justify-center shadow-apple-sm">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Dashboard / Profile / Auth Menu */}
              {isAuthenticated ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center shadow-apple-sm">
                      {getUserInitials(currentUser?.name)}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                        className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-lg z-50 space-y-1"
                      >
                        <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
                          <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {currentUser?.name}
                          </p>
                          <p className="text-[10px] text-neutral-400 truncate">
                            {currentUser?.email}
                          </p>
                        </div>

                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard Profil</span>
                        </Link>

                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-500 hover:bg-rose-500/10 transition-colors font-medium text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar (Sign Out)</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 rounded-full text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity shadow-apple-sm"
                  >
                    Daftar
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors md:hidden"
                aria-label="Open mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#090909]/95 backdrop-blur-xl px-6 py-6"
            >
              <div className="space-y-6">
                {/* Navigation */}
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <span>{link.name}</span>

                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

                {/* User Menu */}
                <div className="space-y-2">
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Wishlist</span>
                    </div>

                    <span className="text-sm text-neutral-500">
                      {wishlist.length}
                    </span>
                  </Link>

                  <Link
                    to="/compare"
                    className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Scale className="w-5 h-5" />
                      <span>Compare</span>
                    </div>

                    <span className="text-sm text-neutral-500">
                      {compareList.length}
                    </span>
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5" />
                      <span>Cart</span>
                    </div>

                    <span className="text-sm text-neutral-500">
                      {totalItemsCount}
                    </span>
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center justify-between rounded-xl px-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white transition font-medium"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-bold text-[10px] flex items-center justify-center">
                            {getUserInitials(currentUser?.name)}
                          </div>
                          <span>Akun Saya ({currentUser?.name})</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-rose-500 hover:bg-rose-500/10 transition font-medium text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Keluar Akun</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openAuthModal('login');
                        }}
                        className="flex-1 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 font-bold text-xs text-neutral-900 dark:text-white"
                      >
                        Masuk
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openAuthModal('register');
                        }}
                        className="flex-1 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold text-xs"
                      >
                        Daftar
                      </button>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

                {/* Theme */}
                <div className="flex items-center justify-between rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Appearance
                  </span>

                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
