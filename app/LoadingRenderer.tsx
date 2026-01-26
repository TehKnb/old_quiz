'use client';

type Props = {
  stages: { title: string; progress: number }[];
};

export function LoadingRenderer({ stages }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-slate-900">
      <div className="w-full max-w-md">

        <h2 className="text-xl font-bold text-center mb-6 text-slate-900">
          Аналізуємо ваш бізнес
        </h2>

        <div className="space-y-4">
          {stages.map((s) => (
            <div key={s.title}>
              <div className="flex justify-between text-sm mb-1 text-slate-700">
                <span>{s.title}</span>
                <span>{s.progress}%</span>
              </div>

              <div className="h-2 bg-slate-200 rounded">
                <div
                  className="h-full bg-black rounded transition-all"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
