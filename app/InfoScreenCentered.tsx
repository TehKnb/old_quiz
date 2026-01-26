'use client';

import { GiftPopover } from './components/GiftPopover';

type Props = {
  title?: string;
  text: string;
  imageUrl?: string;
  onNext: () => void;
  onPrev?: () => void;
};

export function InfoScreenCentered({
  title,
  text,
  imageUrl,
  onNext,
  onPrev,
}: Props) {
  const hasImage = Boolean(imageUrl);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-4 text-slate-900">

      {/* CONTENT */}
      <div
        className={`
          w-full max-w-6xl mx-auto
          ${hasImage
            ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center'
            : 'flex flex-col items-center text-center'
          }
        `}
      >

        {/* IMAGE */}
        {hasImage && (
          <div className="w-full flex justify-center">
            <img
              src={imageUrl}
              alt=""
              className="w-full max-w-xl rounded-3xl"
            />
          </div>
        )}

        {/* TEXT */}
        <div className={`${hasImage ? 'text-center md:text-left' : 'text-center'}`}>
          {title && (
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>
          )}

          {typeof text === 'string' && (
          <p className="text-slate-700 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
            {text}
          </p>
          )}

          {Array.isArray(text) && (
            <div className="space-y-4">
                {text.map((block, idx) => {
                if (block.type === 'quote') {
                    return (
                    <div
                        key={idx}
                        className="bg-slate-100 rounded-2xl px-6 py-4 text-center"
                    >
                        <p className="text-slate-800 italic mb-2">
                        “{block.content}”
                        </p>
                        {block.author && (
                        <p className="text-sm text-slate-500">
                            — {block.author}
                        </p>
                        )}
                    </div>
                    );
                }

                return null;
                })}
            </div>
            )}


          {/* NAV BAR */}
          <div className="w-full max-w-xl mx-auto md:mx-0">
            <div className="flex items-center justify-between gap-4">

              {/* BACK */}
              <div className="flex-1">
                {onPrev && (
                  <button
                    onClick={onPrev}
                    className="w-full text-left text-slate-600 hover:text-slate-900 transition"
                  >
                    Назад
                  </button>
                )}
              </div>

              {/* GIFT */}
              <div className="flex justify-center shrink-0">
                <GiftPopover />
              </div>

              {/* NEXT */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={onNext}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition"
                >
                  Далі
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
