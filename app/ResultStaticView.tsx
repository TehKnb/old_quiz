'use client';

import { Instagram, Youtube, Facebook } from 'lucide-react';

export function ResultStaticView() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full h-full flex justify-center">
          <img
            src="https://i.ibb.co/5gJvr5YB/s-Gbexw6dp-Qa-Yq0-Kqgt2-Y5iq-As-Nzw4bw-Dlr-L5-Y8-ZX.jpg"
            alt="Менеджер"
            className="w-full h-auto max-h-[720px] object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Дякуємо!
          </h1>

          {/* TEXT */}
          <p className="text-slate-700 mb-6 leading-relaxed max-w-xl">
            Наш менеджер звʼяжеться з Вами протягом 30 хвилин.
            А поки що Ви можете ознайомитись з базовою 7-ми тижневою
            програмою для підприємців.
          </p>

          {/* BONUS CARD */}
          <div
            className="
              flex items-center gap-4
              rounded-2xl
              px-6 py-4
              mb-8
              bg-gradient-to-r from-indigo-50 to-blue-50
              border border-blue-100
              shadow-sm
            "
          >
            <span className="text-3xl">🎁</span>

            <span className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
              ЧІТКИЙ ПЛАН РОСТУ ТА ЗНИЖКА 50% <br />
              <span className="text-slate-700 font-medium">
                НА НАВЧАННЯ
              </span>
            </span>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center justify-center md:justify-start gap-5 mb-8">
            <a
              href="https://www.instagram.com/konsnabis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-black transition"
              aria-label="Instagram"
            >
              <Instagram size={26} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCaMoBw9HpdDUQH9ba_EbQ2w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-black transition"
              aria-label="YouTube"
            >
              <Youtube size={26} />
            </a>

            <a
              href="https://www.facebook.com/konsnabis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-black transition"
              aria-label="Facebook"
            >
              <Facebook size={26} />
            </a>
          </div>

          {/* MAIN CTA */}
          <a
            href="https://biznes-club-knb.com/prymnozhte-chystyi-prybutok-quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              px-10 py-4
              rounded-2xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            Ознайомитись з програмою
          </a>

        </div>
      </div>
    </div>
  );
}
