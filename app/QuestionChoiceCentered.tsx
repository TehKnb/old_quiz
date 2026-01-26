'use client';

import { ProgressBar } from './components/ProgressBar';
import { GiftPopover } from './components/GiftPopover';

type Props = {
  progress: number;
  question: {
    text: string;
    subtitle?: string;
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
    <div className="min-h-screen bg-white flex flex-col text-slate-900">


      {/* CONTENT */}
      <div className="flex-1 flex items-start md:items-center px-4 pt-6 md:pt-0">
        <div className="w-full max-w-3xl">

          <div className="flex flex-col items-center text-center">

            {/* TITLE */}
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-slate-900">
              {question.text}
            </h2>

            {/* SUBTITLE */}
            {question.subtitle && (
              <p className="text-sm md:text-base text-slate-600 mb-8 max-w-xl">
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
                    type="button"
                    onClick={() => onSelect(opt)}
                    className={`
                      rounded-2xl px-6 py-5 text-left transition
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

            {/* NAV */}
            <div className="flex justify-between w-full">
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
                className="px-8 py-4 rounded-2xl bg-black text-white disabled:opacity-40 transition"
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
