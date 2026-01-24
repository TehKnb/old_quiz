'use client';

type Props = {
  sellingText: string;
  video: {
    title: string;
    platform: 'youtube' | 'vimeo';
    videoId: string;
  };
};

export function ResultRenderer({ sellingText, video }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">

        <h2 className="text-2xl font-bold mb-4">
          Ваш результат
        </h2>

        <p className="text-slate-600 mb-8">
          {sellingText}
        </p>

        <div className="aspect-video mb-6">
          <iframe
            src={
              video.platform === 'vimeo'
                ? `https://player.vimeo.com/video/${video.videoId}`
                : `https://www.youtube.com/embed/${video.videoId}`
            }
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
