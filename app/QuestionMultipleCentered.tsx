'use client';

import { ProgressBar } from './components/ProgressBar';
import { GiftPopover } from './components/GiftPopover';

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
    <div className="min-h-screen bg-white px-4 py-4 flex flex-col text-slate-900">


      {/* CONTENT */}
      <div
        className="
          flex-1 flex
          items-start md:items-center
          justify-start md:justify-center
          pt-4 md:pt-0
        "
      >
        <div className="w-full max-w-4xl">

          {/* QUESTION */}
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 text-slate-900">
            {question.text}
          </h1>

          {/* HELPER TEXT */}
          {question.helperText && (
            <p className="text-sm md:text-base text-slate-600 text-center mb-8">
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
                  type="button"
                  onClick={() => onToggle(opt)}
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

          {/* BUTTONS */}
          <div className="flex justify-between items-center">
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
              disabled={values.length === 0}
              className="px-8 py-4 bg-black text-white rounded-2xl disabled:opacity-40 transition"
            >
              Далі
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
