'use client';

import { useState } from 'react';

export function GiftPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      {/* GIFT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-slate-100
          hover:bg-slate-200
          transition
          text-xl
        "
        aria-label="Подарунок"
      >
        🎁
      </button>

      {/* POPOVER */}
      {open && (
        <div
          className="
            absolute
            bottom-14
            left-1/2
            -translate-x-1/2
            w-[280px]
            rounded-2xl
            bg-gradient-to-r from-indigo-50 to-blue-50
            border border-blue-100
            shadow-lg
            px-5 py-4
            z-50
            text-center
          "
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🎁</span>
            <span className="font-semibold text-slate-900 text-sm">
              ЧІТКИЙ ПЛАН РОСТУ
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-snug">
            та <span className="font-semibold">знижка 50%</span><br />
            на навчання
          </p>
        </div>
      )}
    </div>
  );
}
