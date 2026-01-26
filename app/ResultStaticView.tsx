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
        <div className="flex flex-col items-start">

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Дякуємо!
          </h1>

          <p className="text-slate-700 mb-6 leading-relaxed max-w-xl">
            Наш менеджер звʼяжеться з Вами протягом 30 хвилин.
            А поки що Ви можете ознайомитись з базовою 7-ми тижневою
            програмою для підприємців.
          </p>

          {/* BONUS CARD */}
          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-4 mb-6">
            <span className="text-2xl">🎁</span>
            <span className="text-sm font-medium text-slate-800">
              Чіткий план росту та знижка 50% <br /> на навчання
            </span>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://www.instagram.com/konsnabis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-black transition"
              aria-label="Instagram"
            >
              <Instagram />
            </a>

            <a
              href="https://www.youtube.com/channel/UCaMoBw9HpdDUQH9ba_EbQ2w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-black transition"
              aria-label="YouTube"
            >
              <Youtube />
            </a>

            <a
              href="https://www.facebook.com/konsnabis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-black transition"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
          </div>

          {/* MAIN CTA */}
          <a
            href="https://biznes-club-knb.com/prymnozhte-chystyi-prybutok-quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              px-8 py-4
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
