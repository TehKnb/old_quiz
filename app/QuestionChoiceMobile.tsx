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

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center">
        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-10 items-center">

          {/* IMAGE */}
          <div className="w-full flex justify-center items-center mb-4 md:mb-0">
            <img
              src="https://i.ibb.co/gbTjSYMm/y-Tr0aw-Rv-FNbbh4nl-Bg-IBSj6-O2r-GXUOtjqhr-EJv0p.png"
              alt=""
              className="w-full h-auto rounded-3xl"
            />
          </div>

          {/* QUESTION + OPTIONS */}
          <div className="w-full flex flex-col justify-center">

            {/* QUESTION */}
            <h1 className="text-xl font-bold text-center md:text-left mb-6">
              {question.text}
            </h1>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {question.options.map((opt) => {
                const active = value === opt;

                return (
                  <button
                    key={opt}
                    onClick={() => onSelect(opt)}
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
          disabled={!value}
          className="px-8 py-4 bg-black text-white rounded-2xl disabled:opacity-40"
        >
          Далі →
        </button>
      </div>
    </div>
  );
}
