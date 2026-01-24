type Props = {
  progress: number;
  question: {
    text: string;
    subtitle?: string; // 👈 додали
    options: string[];
  };
  value?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export function QuestionChoiceCentered({
  progress,
  question,
  value,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

        {/* PROGRESS */}
        <div className="w-full px-4 pt-4 md:pt-6">
        <div className="h-[3px] bg-slate-200 rounded-full overflow-hidden">
            <div
            className="h-full bg-black transition-all"
            style={{ width: `${progress}%` }}
            />
        </div>
        </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">

          <div className="flex flex-col items-center text-center">

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {question.text}
            </h2>

            {question.subtitle && (
            <p className="text-sm md:text-base text-slate-500 text-center mb-8">
                {question.subtitle}
            </p>
            )}

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
              {question.options.map((opt) => {
                const active = value === opt;

                return (
                  <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`
                      rounded-2xl px-6 py-5 text-left transition
                      ${active
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 hover:border-slate-400'}
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* NAV */}
            <div className="flex justify-between w-full">
              {onPrev ? (
                <button onClick={onPrev} className="text-slate-500">
                  Назад
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={onNext}
                disabled={!value}
                className="px-8 py-4 rounded-2xl bg-black text-white disabled:opacity-40"
              >
                Далі
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

