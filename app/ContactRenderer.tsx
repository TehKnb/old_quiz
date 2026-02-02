'use client';

import { useState } from 'react';

type Props = {
  name: string;
  phone: string;
  onChange: (field: 'name' | 'phone', value: string) => void;
  onSubmit: () => Promise<void> | void; // 👈 може бути async
};

export function ContactRenderer({
  name,
  phone,
  onChange,
  onSubmit,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 🚀 FIRE & FORGET
    try {
      void onSubmit(); // ⛔ не await!
    } catch (e) {
      console.error('Submit error:', e);
    }

    // 👉 UI одразу піде у наступний step
  };

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');

    if (!digits.startsWith('380')) {
      onChange('phone', '380');
      return;
    }

    if (digits.length > 12) return;

    onChange('phone', digits);
  };

  const isValid =
    name.trim().length > 1 &&
    phone.startsWith('380') &&
    phone.length === 12;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-slate-900">
      <div className="w-full max-w-xl">

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ми вже аналізуємо ваші відповіді.
        </h2>

        <p className="text-slate-700 mb-10 leading-relaxed">
          Для того, щоб отримати більш детальну інформацію про ситуацію
          у вашому бізнесі та про те, як наша навчальна програма може
          допомогти вам примножити чистий прибуток — залиште контактні дані:
        </p>

        <div className="space-y-6">

          <input
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Імʼя*"
            className="w-full px-4 py-4 rounded-xl bg-slate-100 focus:ring-2 focus:ring-black"
          />

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
              className="flex-1 px-4 py-4 rounded-xl bg-slate-100 focus:ring-2 focus:ring-black"
            />
          </div>

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

          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full py-5 bg-black text-white rounded-2xl text-lg font-semibold disabled:opacity-40"
          >
            {isSubmitting ? '…' : 'Отримати результат'}
          </button>

        </div>
      </div>
    </div>
  );
}
