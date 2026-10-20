'use client';

// Плашка-подарунок біля кнопки «Далі» на всіх питаннях (завжди розкрита)
export function GiftPopover() {
  return (
    <div
      className="
        flex items-center gap-2
        min-w-0
        bg-gradient-to-r from-indigo-50 to-blue-50
        border border-blue-100
        rounded-2xl
        px-3 py-2
        shadow-sm
      "
    >
      <span className="text-xl shrink-0">🎁</span>

      <span className="text-xs font-medium text-slate-800 leading-tight whitespace-nowrap">
        ЗНИЖКА <span className="font-semibold">40%</span><br />
        НА НАВЧАННЯ
      </span>
    </div>
  );
}
