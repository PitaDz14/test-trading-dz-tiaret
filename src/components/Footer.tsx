import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-400 py-6 text-center">
    <p className="text-sm">
      © {new Date().getFullYear()} جميع الحقوق محفوظة للسيد خالد دراغة
    </p>
  </footer>
);