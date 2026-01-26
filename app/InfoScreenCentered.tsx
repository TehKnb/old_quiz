'use client';

type Props = {
  title: string;
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
        <div
          className={`
            ${hasImage ? 'text-center md:text-left' : 'text-center'}
          `}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>

          <p className="text-slate-700 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
            {text}
          </p>

          {/* BUTTONS */}
          <div
            className={`
              flex items-center
              ${hasImage ? 'justify-start gap-6' : 'justify-center gap-6'}
            `}
          >
            {onPrev && (
              <button
                onClick={onPrev}
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Назад
              </button>
            )}

            <button
              onClick={onNext}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition"
            >
              Продовжити
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
