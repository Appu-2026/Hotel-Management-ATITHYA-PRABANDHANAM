import React from 'react';
import { X, QrCode, ExternalLink, Printer, Copy, Check } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose, tableData, hotelName }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !tableData) return null;

  const guestUrl = `${window.location.origin}/guest?hotelId=${tableData.hotelId || 'H101'}&table=${encodeURIComponent(
    tableData.tableNo
  )}&type=${encodeURIComponent(tableData.type || 'table')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(guestUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-sky-50 text-sky-700 mb-2 border border-sky-200">
            <QrCode className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{tableData.tableNo} Table Tag</h3>
          <p className="text-xs text-slate-500 mt-1">{hotelName || 'Grand Taj Imperial Palace'}</p>
        </div>

        {/* Dynamic Simulated QR Tag Card */}
        <div className="bg-stone-50 p-6 rounded-2xl text-slate-900 shadow-inner flex flex-col items-center justify-center text-center border-2 border-sky-500/20 mb-6">
          <div className="font-extrabold text-slate-900 text-sm tracking-wider uppercase mb-1">
            {hotelName}
          </div>
          <div className="text-[11px] font-bold text-sky-700 mb-4 bg-sky-100/80 px-3 py-1 rounded-full border border-sky-200">
            SCAN QR TO ORDER FOOD & PAY INSTANTLY
          </div>

          {/* SVG Visual QR Pattern */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 relative">
            <svg
              className="w-44 h-44 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Position Squares */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="currentColor" />
              <rect x="9" y="9" width="17" height="17" rx="2" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" fill="currentColor" />

              <rect x="70" y="5" width="25" height="25" rx="3" fill="currentColor" />
              <rect x="74" y="9" width="17" height="17" rx="2" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" fill="currentColor" />

              <rect x="5" y="70" width="25" height="25" rx="3" fill="currentColor" />
              <rect x="9" y="74" width="17" height="17" rx="2" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" fill="currentColor" />

              {/* Pattern dots */}
              <rect x="35" y="10" width="6" height="6" rx="1" />
              <rect x="45" y="10" width="6" height="6" rx="1" />
              <rect x="55" y="10" width="6" height="6" rx="1" />
              <rect x="35" y="20" width="6" height="6" rx="1" />
              <rect x="50" y="20" width="6" height="6" rx="1" />
              <rect x="10" y="35" width="6" height="6" rx="1" />
              <rect x="20" y="35" width="6" height="6" rx="1" />
              <rect x="35" y="35" width="6" height="6" rx="1" />
              <rect x="45" y="35" width="16" height="16" rx="2" fill="#0284c7" />
              <rect x="70" y="35" width="6" height="6" rx="1" />
              <rect x="80" y="35" width="6" height="6" rx="1" />
              <rect x="10" y="45" width="6" height="6" rx="1" />
              <rect x="25" y="45" width="6" height="6" rx="1" />
              <rect x="70" y="45" width="6" height="6" rx="1" />
              <rect x="85" y="45" width="6" height="6" rx="1" />
              <rect x="10" y="55" width="6" height="6" rx="1" />
              <rect x="35" y="55" width="6" height="6" rx="1" />
              <rect x="55" y="55" width="6" height="6" rx="1" />
              <rect x="75" y="55" width="6" height="6" rx="1" />
              <rect x="35" y="70" width="6" height="6" rx="1" />
              <rect x="45" y="70" width="6" height="6" rx="1" />
              <rect x="60" y="70" width="6" height="6" rx="1" />
              <rect x="75" y="70" width="6" height="6" rx="1" />
              <rect x="35" y="80" width="6" height="6" rx="1" />
              <rect x="50" y="80" width="6" height="6" rx="1" />
              <rect x="70" y="80" width="15" height="15" rx="2" fill="#0284c7" />
            </svg>
          </div>

          <div className="mt-4 font-black text-2xl text-slate-900 tracking-tight">
            {tableData.tableNo}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Powered by ATITHYA PRABANDHANAM
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2">
          <a
            href={guestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
          >
            <ExternalLink className="w-4 h-4" /> Test Live QR Guest View
          </a>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Link Copied!' : 'Copy Guest Link'}
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
