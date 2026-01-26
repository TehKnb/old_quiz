'use client';

import { useState } from 'react';

export function GiftPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${
          open
            ? 'w-full max-w-[320px]'
            : 'w-10'
        }
      `}
    >
      {/* COLLAPSED */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            w-10 h-10
            flex items-center justify-center
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
      )}

      {/* EXPANDED */}
      {open && (
        <div
          className="
            flex items-center gap-3
            bg-gradient-to-r from-indigo-50 to-blue-50
            border border-blue-100
            rounded-2xl
            px-4 py-3
            shadow-sm
          "
        >
          <span className="text-2xl">🎁</span>

          <span className="text-sm font-medium text-slate-800 leading-tight">
            ЧІТКИЙ ПЛАН РОСТУ<br />
            та знижка <span className="font-semibold">50%</span> на навчання
          </span>
        </div>
      )}
    </div>
  );
}
