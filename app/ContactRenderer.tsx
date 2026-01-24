'use client';

type Props = {
  name: string;
  phone: string;
  onChange: (field: 'name' | 'phone', value: string) => void;
  onSubmit: () => void;
};

export function ContactRenderer({
  name,
  phone,
  onChange,
  onSubmit,
}: Props) {
  // залишаємо тільки цифри, але НЕ дозволяємо прибрати 380
  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');

    // завжди починаємо з 380
    if (!digits.startsWith('380')) {
      onChange('phone', '380');
      return;
    }

    // максимум 12 цифр: 380 + 9
    if (digits.length > 12) return;

    onChange('phone', digits);
  };

  const isValid =
    name.trim().length > 1 &&
    phone.startsWith('380') &&
    phone.length === 12;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ми вже аналізуємо ваші відповіді.
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-600 mb-10 leading-relaxed">
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
            className="w-full px-4 py-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-black"
          />

          {/* PHONE */}
          <div className="flex gap-3">

            {/* COUNTRY CODE (STATIC) */}
            <div className="flex items-center gap-2 px-4 py-4 bg-slate-100 rounded-xl">
              <span className="text-xl">🇺🇦</span>
              <span className="font-medium">+380</span>
            </div>

            {/* PHONE INPUT */}
            <input
              value={phone.slice(3)} // показуємо тільки 9 цифр
              onChange={(e) =>
                handlePhoneChange('380' + e.target.value)
              }
              placeholder="XX XXX XXXX*"
              inputMode="numeric"
              className="flex-1 px-4 py-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* CHECKBOX */}
          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span>
              Я погоджуюсь з{' '}
              <a href="#" className="text-blue-600 underline">
                політикою конфіденційності
              </a>{' '}
              та правилами використання *
            </span>
          </label>

          {/* SUBMIT */}
          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="w-full py-5 bg-black text-white rounded-2xl text-lg disabled:opacity-40"
          >
            Отримати результат
          </button>
        </div>
      </div>
    </div>
  );
}
