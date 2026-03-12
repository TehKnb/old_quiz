'use client';

import { GiftPopover } from './components/GiftPopover';

type Props = {
  progress: number;
  imageUrl: string;
  question: {
    text: string;
    subtitle?: string;
    options: string[];
  };
  value?: string;
  onSelect: (v: string) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export function QuestionChoiceMobile({
  progress,
  imageUrl,
  question,
  value,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="h-full bg-white px-4 py-2 md:py-1 flex flex-col text-slate-900">
      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 flex items-center">
        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-6 items-center min-h-0">
          
          {/* IMAGE */}
          <div className="w-full flex justify-center items-center mb-3 md:mb-0 min-h-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-auto rounded-3xl object-contain max-h-[30vh] md:max-h-[42vh]"
            />
          </div>

          {/* QUESTION + OPTIONS */}
          <div className="w-full flex flex-col justify-center min-h-0">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
              {question.text}
            </h1>

            {question.subtitle && (
              <p className="text-sm md:text-sm text-slate-600 text-center mb-4">
                {question.subtitle}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3">
              {question.options.map((opt) => {
                const active = value === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onSelect(opt)}
                    className={`
                      px-4 py-3 md:py-2 rounded-2xl text-left transition font-medium
                      ${
                        active
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-900 hover:border-slate-400'
                      }
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
      <div className="flex justify-between items-center pt-2 md:pt-1 shrink-0">
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

        <GiftPopover />

        <button
          onClick={onNext}
          disabled={!value}
          className="px-8 py-4 md:py-3 bg-black text-white rounded-2xl disabled:opacity-40 transition"
        >
          Далі
        </button>
      </div>
    </div>
  );
}