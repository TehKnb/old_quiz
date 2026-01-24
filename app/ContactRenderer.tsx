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
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Залиште контакти
        </h2>

        <div className="space-y-4 mb-6">
          <input
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ваше імʼя"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Телефон"
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <button
          onClick={onSubmit}
          className="w-full py-4 bg-black text-white rounded-xl"
        >
          Отримати результат
        </button>
      </div>
    </div>
  );
}
