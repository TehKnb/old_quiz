'use client';

type Props = {
  value: number; // 0–100
};

export function ProgressBar({ value }: Props) {
  const getColor = () => {
    if (value < 25) return 'bg-red-500';
    if (value < 50) return 'bg-orange-500';
    if (value < 75) return 'bg-blue-500';
    return 'bg-green-600';
  };

  return (
    <div className="w-full px-4 pt-4 md:pt-6">
      <div className="h-3 md:h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-300
            ${getColor()}
          `}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
