'use client';

import { useState } from 'react';

type Props = {
  name: string;
  city: string; // ✅ додали
  phone: string;
  onChange: (field: 'name' | 'city' | 'phone', value: string) => void; // ✅ розширили
  onSubmit: () => void;
};

export function ContactRenderer({
  name,
  city, // ✅ додали
  phone,
  onChange,
  onSubmit,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;

    const digits = phone.replace(/\D/g, '');

    if (!digits.startsWith('380') || digits.length !== 12) {
      alert('"380" вже введені, будь ласка, введіть коректний номер телефону');
      return;
    }

    setIsSubmitting(true);
    onSubmit();
  };

  // тільки цифри, фіксований +380, максимум 15 для UX
  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');

    if (!digits.startsWith('380')) {
      onChange('phone', '380');
      return;
    }

    if (digits.length > 15) return;

    onChange('phone', digits);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-slate-900">
      <div className="w-full max-w-xl">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ми вже аналізуємо ваші відповіді.
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-700 mb-10 leading-relaxed">
          Для того, щоб отримати більш детальну інформацію про ситуацію
          у вашому бізнесі та про те, як наша навчальна програма може
          допомогти вам примножити чистий прибуток — залиште контактні дані:
        </p>

        {/* FORM */}
        <div className="space-y-6">

          {/* NAME */}
          <input
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Імʼя*"
            className="
              w-full px-4 py-4 rounded-xl
              bg-slate-100
              text-slate-900
              placeholder:text-slate-500
              outline-none
              focus:ring-2 focus:ring-black
            "
          />

          {/* CITY (optional) ✅ */}
          <input
            value={city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Місто (необов'язково)"
            className="
              w-full px-4 py-4 rounded-xl
              bg-slate-100
              text-slate-900
              placeholder:text-slate-500
              outline-none
              focus:ring-2 focus:ring-black
            "
          />

          {/* PHONE */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-4 bg-slate-100 rounded-xl">
              <span className="text-xl">🇺🇦</span>
              <span className="font-medium">+380</span>
            </div>

            <input
              value={phone.slice(3)}
              onChange={(e) =>
                handlePhoneChange('380' + e.target.value)
              }
              placeholder="XX XXX XXXX*"
              inputMode="numeric"
              className="
                flex-1 px-4 py-4 rounded-xl
                bg-slate-100
                text-slate-900
                placeholder:text-slate-500
                outline-none
                focus:ring-2 focus:ring-black
              "
            />
          </div>

          {/* CHECKBOX */}
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span>
              Я погоджуюсь з{' '}
              <a href="#" className="text-blue-600 underline">
                політикою конфіденційності
              </a>{' '}
              та правилами використання *
            </span>
          </label>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="
              w-full py-5
              bg-black text-white
              rounded-2xl text-lg
              font-semibold
              flex items-center justify-center gap-3
              disabled:opacity-40
              transition
            "
          >
            {isSubmitting && (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}

            {isSubmitting ? '…' : 'Отримати результат'}
          </button>

          {/* BONUS */}
          <div
            className="
              w-full
              flex flex-col items-center justify-center
              text-center
              gap-2
              px-5 py-4
              rounded-2xl
              bg-gradient-to-r from-indigo-50 to-blue-50
              border border-blue-100
            "
          >
            <span className="text-2xl">🎁</span>

            <span className="text-sm font-medium text-slate-800 leading-snug">
              ЧІТКИЙ ПЛАН РОСТУ<br />
              та знижка <span className="font-semibold">50%</span> на навчання
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}