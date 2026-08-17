'use client';
import { Instagram, Youtube, Facebook } from 'lucide-react';

function TelegramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.94 4.3 18.9 19.06c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19l-10.75 6.77-4.63-1.45c-1.01-.32-1.03-1.01.21-1.5l18.1-6.98c.84-.3 1.57.2 1.27 1.26z" />
    </svg>
  );
}

export function ResultStaticView() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div className="w-full flex justify-center">
          <img
            src="https://i.ibb.co/5gJvr5YB/s-Gbexw6dp-Qa-Yq0-Kqgt2-Y5iq-As-Nzw4bw-Dlr-L5-Y8-ZX.jpg"
            alt="Менеджер"
            className="w-full h-auto max-h-[720px] object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Дякуємо!
          </h1>

          <p className="text-slate-700 mb-6 leading-relaxed max-w-xl">
            А поки Ви очікуєте — отримайте доступ до закритого Telegram-каналу
            нашого клубу. Всередині — матеріали, розбори та анонси зустрічей,
            які не публікуємо у відкритих каналах.
          </p>

          {/* BONUS CARD */}
          <div className="flex items-center gap-4 rounded-2xl px-6 py-4 mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-100 shadow-sm">
            <span className="text-3xl">🎁</span>
            <span className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
              ЧІТКИЙ ПЛАН РОСТУ ТА ЗНИЖКА 50% <br />
              <span className="text-slate-700 font-medium">НА НАВЧАННЯ</span>
            </span>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center justify-center md:justify-start gap-5 mb-8">
            
              href="https://www.instagram.com/konsnabis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-black transition"
              aria-label="Instagram"
            >
              <Instagram size={26} />
            </a>
            
              href="https://www.youtube.com/channel/UCaMoBw9HpdDUQH9ba_EbQ2w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-black transition"
              aria-label="YouTube"
            >
              <Youtube size={26} />
            </a>
            
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
          
            href="https://t.me/+7mXOHceFdUY4MWJi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[#229ED9] text-white font-semibold hover:bg-[#1B8CC0] transition"
          >
            <TelegramIcon size={22} />
            Долучитись до каналу
          </a>
        </div>
      </div>
    </div>
  );
}
