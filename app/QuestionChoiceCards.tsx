'use client';

import { ProgressBar } from './components/ProgressBar';

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
    <div className="min-h-screen bg-white flex flex-col text-slate-900">

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl">

          {/* QUESTION */}
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-slate-900">
            {question.text}
          </h2>

          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {question.options.map((opt, index) => {
              const active = value === opt.label;
              const isThirdMobile = index === 2;

              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onSelect(opt.label)}
                  className={`
                    rounded-2xl overflow-hidden transition
                    border bg-white
                    text-slate-900
                    ${
                      active
                        ? 'border-blue-600 ring-2 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }
                    ${isThirdMobile
                      ? 'col-span-2 justify-self-center max-w-[260px]'
                      : ''}
                    md:col-span-1 md:justify-self-auto md:max-w-none
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
                      py-3 md:py-4
                      text-center
                      font-medium
                      text-slate-900
                      ${active ? 'text-blue-600' : ''}
                    `}
                  >
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* NAV */}
          <div className="mt-10 flex justify-between items-center">
            {onPrev ? (
              <button
                onClick={onPrev}
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Назад
              </button>
            ) : (
              <div />
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
    </div>
  );
}
