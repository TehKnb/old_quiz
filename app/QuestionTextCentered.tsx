'use client';

type Props = {
  progress: number;
  question: {
    text: string;
    subtitle?: string;
    placeholder?: string;
  };
  value?: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export function QuestionTextCentered({
  progress,
  question,
  value,
  onChange,
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
        <div className="w-full max-w-2xl flex flex-col items-center text-center">

          {/* QUESTION */}
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {question.text}
          </h2>

          {/* SUBTITLE */}
          {question.subtitle && (
            <p className="text-sm md:text-base text-slate-500 mb-8">
              {question.subtitle}
            </p>
          )}

          {/* INPUT */}
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="
              w-full max-w-md
              px-6 py-4
              rounded-2xl
              bg-slate-100
              border border-transparent
              focus:outline-none focus:border-black
              text-base
            "
          />

          {/* NAV */}
          <div className="flex justify-between w-full max-w-md mt-10">
            {onPrev ? (
              <button onClick={onPrev} className="text-slate-500">
                Назад
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onNext}
              disabled={!value || !value.trim()}
              className="px-8 py-4 rounded-2xl bg-black text-white disabled:opacity-40"
            >
              Далі
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
