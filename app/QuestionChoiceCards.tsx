type Props = {
  progress: number;
  question: {
    text: string;
    options: {
      label: string;
      image: string;
    }[];
  };
  value?: string;
  onSelect: (v: string) => void;
  onPrev?: () => void;
};

export function QuestionChoiceCards({
  progress,
  question,
  value,
  onSelect,
  onPrev,
}: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* PROGRESS */}
      <div className="w-full px-4 pt-4">
        <div className="h-[3px] bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl">

          {/* QUESTION */}
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            {question.text}
          </h2>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {question.options.map((opt) => {
              const active = value === opt.label;

              return (
                <button
                  key={opt.label}
                  onClick={() => onSelect(opt.label)}
                  className={`
                    rounded-2xl overflow-hidden transition border
                    ${active
                      ? 'border-blue-600 ring-2 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  {/* IMAGE */}
                  <div className="aspect-square w-full bg-slate-100">
                    <img
                      src={opt.image}
                      alt={opt.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* LABEL */}
                  <div
                    className={`
                      py-4 text-center font-medium
                      ${active ? 'text-blue-600' : 'text-slate-800'}
                    `}
                  >
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* NAV */}
          {onPrev && (
            <div className="mt-10">
              <button onClick={onPrev} className="text-slate-500">
                Назад
              </button>
            </div>
          )}

            {/* VISUAL ONLY NEXT */}
            <button
                disabled
                className="px-8 py-4 rounded-2xl bg-black text-white opacity-40 cursor-default"
            >
                Далі
            </button>

        </div>
      </div>
    </div>
  );
}
