'use client';

type Option = {
  label: string;
  image: string;
};

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
  onPrev?: () => void; // 👈 ОБОВʼЯЗКОВО
};

export function QuestionChoiceCards({
  progress,
  question,
  value,
  onSelect,
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

          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {question.options.map((opt) => {
              const active = value === opt.label;

              return (
                <button
                  key={opt.label}
                  onClick={() => onSelect(opt.label)}
                  className={`rounded-2xl overflow-hidden transition border
                    ${active
                      ? 'border-blue-600 ring-2 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <div className="aspect-square bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center">
                    <img
                      src={opt.image}
                      alt=""
                      className="w-40 h-40 object-contain"
                    />
                  </div>

                  <div className="p-4 text-left font-medium">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
