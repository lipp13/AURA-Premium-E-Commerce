import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-xs font-medium text-neutral-500 dark:text-neutral-400 py-3">
      <Link to="/" className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 opacity-40" />
          {item.link ? (
            <Link to={item.link} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 dark:text-white font-semibold truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
