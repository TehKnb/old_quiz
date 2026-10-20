'use client';

import { useLayoutEffect, useRef } from 'react';
import { ProgressBar } from './components/ProgressBar';
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
  singleLineTitle?: boolean; // заголовок в один рядок: шрифт зменшується під ширину
  navAfterOptionsMobile?: boolean; // на телефоні кнопки одразу під варіантами, а не внизу екрана
};

export function QuestionChoiceMobile({
  progress,
  imageUrl,
  question,
  value,
  onSelect,
  onNext,
  onPrev,
  singleLineTitle,
  navAfterOptionsMobile,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Підганяємо розмір шрифту, щоб заголовок влазив в один рядок
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!singleLineTitle || !el) return;

    const fit = () => {
      el.style.fontSize = '';
      const base = parseFloat(getComputedStyle(el).fontSize);
      const ratio = el.clientWidth / el.scrollWidth;
      if (ratio < 1) {
        el.style.fontSize = `${Math.floor(base * ratio * 10) / 10}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, [singleLineTitle, question.text]);

  return (
    <div className="min-h-screen bg-white px-4 py-4 md:py-16 flex flex-col text-slate-900">
      {/* MAIN CONTENT */}
      <div
        className={`
          ${navAfterOptionsMobile ? 'md:flex-1 pt-1' : 'flex-1 pt-4'} flex
          items-start md:items-center
          justify-start md:justify-center
          md:pt-0
        `}
      >
        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-10 items-center">
          {/* IMAGE */}
          <div className="w-full flex justify-center items-center mb-4 md:mb-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-auto rounded-3xl"
            />
          </div>

          {/* QUESTION + OPTIONS */}
          <div className="w-full flex flex-col justify-center">
            {/* QUESTION */}
            <h1
              ref={titleRef}
              className={`text-2xl md:text-4xl font-bold text-center ${
                navAfterOptionsMobile ? 'mb-4 md:mb-6' : 'mb-6'
              } text-slate-900 ${
                singleLineTitle ? 'whitespace-nowrap overflow-hidden' : ''
              }`}
            >
              {question.text}
            </h1>

            {/* SUBTITLE */}
            {question.subtitle && (
              <p className="text-sm md:text-base text-slate-600 text-center mb-8">
                {question.subtitle}
              </p>
            )}

            {/* OPTIONS */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${
                navAfterOptionsMobile ? 'mb-2 md:mb-6' : 'mb-6'
              }`}
            >
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

      {/* BUTTONS */}
      <div className="flex justify-between items-center pt-4">
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