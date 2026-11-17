import React from 'react';

export default function Footer({ isDark = false }) {
  return (
    <footer
      className={`w-full py-3.5 px-4 sm:px-6 lg:px-8 mt-auto border-t transition-colors ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400'
          : 'bg-white border-slate-200 text-slate-500 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-end">
        <p className="text-[11px] sm:text-xs font-medium text-center sm:text-right text-slate-500 leading-snug">
          © 2026 Atithya Prabandhanam (
          <span className={isDark ? 'text-sky-400 font-semibold' : 'text-sky-700 font-semibold'}>
            • EXCELLENCE IN HOSPITALITY
          </span>
          ). All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
