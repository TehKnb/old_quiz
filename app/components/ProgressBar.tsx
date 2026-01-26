'use client';

type Props = {
  value: number; // 0–100
};

export function ProgressBar({ value }: Props) {
  const progress = Math.max(0, Math.min(100, Math.round(value)));

  const getColor = () => {
    if (progress < 30) return 'bg-red-500 text-red-600';
    if (progress < 60) return 'bg-orange-500 text-orange-600';
    if (progress < 85) return 'bg-yellow-500 text-yellow-600';
    return 'bg-green-600 text-green-700';
  };

  const color = getColor();

  return (
    <div className="w-full px-4 pt-4 md:pt-6">

      {/* LABEL ROW */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs md:text-sm text-slate-500">
          Прогрес
        </span>

        <span className={`text-xs md:text-sm font-semibold ${color.replace('bg-', 'text-')}`}>
          {progress}%
        </span>
      </div>

      {/* BAR */}
      <div className="h-[6px] md:h-[8px] w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.split(' ')[0]} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
