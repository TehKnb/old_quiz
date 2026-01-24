'use client';

type Props = {
  progress: number;
  question: {
    text: string;
    options: string[];
  };
  value?: string;
  onSelect: (v: string) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export function QuestionChoiceMobile({
  progress,
  question,
  value,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="min-h-screen bg-white px-4 py-4 flex flex-col">

      {/* PROGRESS */}
      <div className="mb-4">
        <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* IMAGE */}
      <img
        src="https://i.ibb.co/kVChV0gM/Tf1.png"
        alt=""
        className="w-full rounded-3xl mb-4"
      />

      {/* QUESTION */}
      <h1 className="text-xl font-bold text-center mb-4">
        {question.text}
      </h1>

      {/* OPTIONS */}
      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((opt) => {
          const active = value === opt;

          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`
                px-4 py-4 rounded-2xl border text-left
                ${active ? 'border-black' : 'border-slate-300'}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* BUTTONS */}
      <div className="mt-auto flex justify-between items-center">
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
          className="px-8 py-4 bg-black text-white rounded-2xl disabled:opacity-40"
        >
          Далі →
        </button>
      </div>
    </div>
  );
}
