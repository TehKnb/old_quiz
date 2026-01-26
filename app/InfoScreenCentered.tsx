'use client';

import { GiftPopover } from './components/GiftPopover';

type Props = {
  title: string;
  text: string;
  onNext: () => void;
};

export function InfoScreenCentered({ title, text, onNext }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900">

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl text-center">

          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            {title}
          </h1>

          <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {text}
          </p>

        </div>
      </div>

      {/* NAV */}
      <div className="flex justify-between items-center px-4 pb-6">
        <div />

        <GiftPopover />

        <button
          onClick={onNext}
          className="px-8 py-4 bg-black text-white rounded-2xl transition hover:bg-slate-900"
        >
          Далі
        </button>
      </div>
    </div>
  );
}
