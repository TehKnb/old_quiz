'use client';

import { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';

type Props = {
  progress: number;
  children: ReactNode;
};

export function QuizLayout({ progress, children }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* FIXED HEADER */}
      <div className="shrink-0">
        <ProgressBar value={progress} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

    </div>
  );
}
