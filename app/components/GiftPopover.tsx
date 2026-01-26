'use client';

import { useState } from 'react';

export function GiftPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        flex justify-center
        transition-all duration-300 ease-out
        ${open ? 'w-[220px]' : 'w-10'}
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
            shrink-0
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
            flex items-center gap-2
            w-full
            bg-gradient-to-r from-indigo-50 to-blue-50
            border border-blue-100
            rounded-2xl
            px-3 py-2
            shadow-sm
          "
        >
          <span className="text-xl shrink-0">🎁</span>

          <span className="text-xs font-medium text-slate-800 leading-tight">
            ЧІТКИЙ ПЛАН РОСТУ<br />
            та знижка <span className="font-semibold">50%</span>
          </span>
        </div>
      )}
    </div>
  );
}
