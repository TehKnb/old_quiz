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
  imageUrl,
  question,
  value,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col text-slate-900">

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 w-full">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-2 md:gap-10">

          {/* IMAGE */}
          <div className="w-full flex justify-center mb-6 md:mb-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-auto rounded-3xl"
            />
          </div>

          {/* QUESTION + OPTIONS */}
          <div className="w-full flex flex-col">

            {/* QUESTION */}
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
              {question.text}
            </h1>

            {/* SUBTITLE */}
            {question.subtitle && (
              <p className="text-sm md:text-base text-slate-600 text-center mb-8">
                {question.subtitle}
              </p>
            )}

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((opt) => {
                const active = value === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onSelect(opt)}
                    className={`
                      px-4 py-4 rounded-2xl text-left transition
                      font-medium
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

      {/* ===== NAV (ALWAYS VISIBLE) ===== */}
      <div className="w-full max-w-5xl mx-auto pt-8 flex justify-between items-center">
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
          className="px-8 py-4 bg-black text-white rounded-2xl disabled:opacity-40 transition"
        >
          Далі
        </button>
      </div>

    </div>
  );
}
