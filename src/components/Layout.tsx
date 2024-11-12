import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen bg-gray-900">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </div>
);