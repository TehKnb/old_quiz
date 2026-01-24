'use client';

type Props = {
  progress: number;
  question: {
    text: string;
    helperText?: string;
    options: string[];
  };
  values: string[];
  onToggle: (v: string) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export function QuestionMultipleCentered({
  progress,
  question,
  values,
  onToggle,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="min-h-screen bg-white px-4 py-4 flex flex-col">

      {/* PROGRESS */}
      <div className="mb-6">
        <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">

          {/* QUESTION */}
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
            {question.text}
          </h1>

          {/* HELPER TEXT */}
          {question.helperText && (
            <p className="text-sm md:text-base text-slate-500 text-center mb-8">
              {question.helperText}
            </p>
          )}

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {question.options.map((opt) => {
              const active = values.includes(opt);

              return (
                <button
                  key={opt}
                  onClick={() => onToggle(opt)}
                  className={`
                    px-4 py-4 rounded-2xl text-left transition
                    ${active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-black hover:border-slate-400'}
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
        {/* BUTTONS */}
      <div className="flex justify-between items-center pt-4">
        {onPrev ? (
          <button onClick={onPrev} className="text-slate-500">
            Назад
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onNext}
          disabled={values.length === 0}
          className="px-8 py-4 bg-black text-white rounded-2xl disabled:opacity-40"
        >
          Далі
        </button>
      </div>

      </div>

      
    </div>
  );
}
