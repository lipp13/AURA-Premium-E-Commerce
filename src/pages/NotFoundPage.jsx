import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="pt-40 pb-32 max-w-xl mx-auto px-4 text-center space-y-6">
      <span className="text-6xl font-extrabold text-neutral-300 dark:text-neutral-700 tracking-tighter">404</span>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto">
        The architectural page or product space you requested has been moved or does not exist.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" /> Browse Shop
          </Button>
        </Link>
      </div>
    </div>
  );
};
