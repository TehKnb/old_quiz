'use client';

import { ArrowRight } from 'lucide-react';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function PrimaryButton({
  onClick,
  disabled,
  children = 'Далі',
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex items-center gap-3
        px-8 py-4
        rounded-2xl
        bg-black
        text-white
        font-semibold
        disabled:opacity-40
        hover:bg-slate-800
        transition
      "
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
