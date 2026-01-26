'use client';

import { GiftPopover } from './components/GiftPopover';

type Props = {
  title: string;
  text: string;
  imageUrl?: string;
  onNext: () => void;
};

export function InfoScreenCentered({
  title,
  text,
  imageUrl,
  onNext,
}: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-4">

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        {imageUrl && (
          <div className="w-full flex justify-center">
            <img
              src={imageUrl}
              alt=""
              className="w-full max-w-xl rounded-3xl"
            />
          </div>
        )}

        {/* TEXT */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>

          <p className="text-slate-700 mb-8 leading-relaxed">
            {text}
          </p>

          <button
            onClick={onNext}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-medium"
          >
            Продовжити
          </button>
        </div>

      </div>
    </div>
  );
}
