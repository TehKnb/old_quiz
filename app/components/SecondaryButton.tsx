'use client';

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

export function SecondaryButton({
  onClick,
  children = 'Попереднє питання',
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        px-4 py-2
        md:px-6 md:py-4
        text-sm md:text-base
        rounded-xl md:rounded-2xl
        text-slate-600
        bg-transparent
        hover:text-black
        transition
      "
    >
      {children}
    </button>
  );
}
