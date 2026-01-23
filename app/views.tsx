import { ArrowRight, CheckCircle2, BrainCircuit, Play } from 'lucide-react';
import { questions, videoDatabase } from './data';
import type { InfoScreenConfig } from './data';

// --- Екран 1: Привітання ---
export const IntroView = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <BrainCircuit className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Безкоштовний аудит бізнесу</h1>
      <p className="text-lg text-slate-600">ШІ підбере стратегію росту та відео-кейс під вашу нішу.</p>
      <button onClick={onStart} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 mx-auto">
        Розпочати <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Екран 2: Квіз ---
export const QuizView = ({ 
  questionIndex, 
  answers, 
  onAnswer, 
  onNext 
}: { 
  questionIndex: number; 
  answers: Record<string, string>; 
  onAnswer: (val: string) => void; 
  onNext: () => void; 
}) => {
  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8">
        <div>
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Питання {questionIndex + 1}/{questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{currentQuestion.text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => onAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onNext()}
                autoFocus
              />
            )}
            {currentQuestion.type === 'choice' && currentQuestion.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => onAnswer(opt)}
                className={`w-full p-4 text-left rounded-xl border-2 transition ${answers[currentQuestion.id] === opt ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={onNext} disabled={!answers[currentQuestion.id]} className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition flex items-center gap-2">
              Далі <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Екран 3: Контакти ---
export const ContactView = ({ 
  form, 
  setForm, 
  onSubmit 
}: { 
  form: { name: string; phone: string }; 
  setForm: (f: any) => void; 
  onSubmit: (e: React.FormEvent) => void; 
}) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-6 h-6 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Аналіз готовий!</h2>
      <p className="text-slate-600 mb-6">Введіть контакти, щоб відкрити результат.</p>
      
      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <input required type="text" placeholder="Ваше ім'я" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="tel" placeholder="Телефон" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-600/20">
          Отримати розбір
        </button>
      </form>
    </div>
  </div>
);

// --- Екран 4: Завантаження ---
export const LoadingView = () => (
  <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
    <h2 className="text-xl font-bold">ШІ аналізує ваші відповіді...</h2>
  </div>
);

// --- Екран 5: Результат ---
export const ResultView = ({ data, name, niche }: { data: any, name: string, niche: string }) => {
  const { video, analysis, recommendation } = data;
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{name}, ваш план готовий!</h1>
          <p className="text-slate-600">Стратегія для ніші: <strong>{niche}</strong></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold">Аналіз AI</h3>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap mb-4">{analysis}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-medium text-yellow-800">💡 Рекомендація: {recommendation}</p>
              </div>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
               {video.platform === 'youtube' ? (
                 <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.videoId}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
               ) : (
                 <div className="flex items-center justify-center h-full text-white">Vimeo Player Placeholder</div>
               )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Наступний крок</h3>
              <p className="mb-6 text-blue-100 text-sm">Ми підготували для вас індивідуальну пропозицію.</p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">Записатись на консультацію</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function InfoView({
  info,
  progress,
  onNext,
}: {
  info: InfoScreenConfig;
  progress: number;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F6F9FF] flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-lg p-8 md:p-12">

        {/* PROGRESS */}
        <div className="mb-6">
          <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* IMAGE (ONLY IF EXISTS) */}
        {info.imageDesktop && (
          <div className="hidden md:flex justify-center mb-8">
            <img
              src={info.imageDesktop}
              alt=""
              className="max-h-[260px] object-contain"
            />
          </div>
        )}

        {info.imageMobile && (
          <div className="md:hidden mb-6">
            <img
              src={info.imageMobile}
              alt=""
              className="w-full rounded-3xl object-contain"
            />
          </div>
        )}

        {/* CONTENT */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          {info.title}
        </h1>

        <p className="text-slate-700 text-center whitespace-pre-wrap leading-relaxed max-w-2xl mx-auto">
          {info.text}
        </p>

        {/* BUTTON */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onNext}
            className="px-10 py-4 rounded-2xl bg-black text-white font-semibold hover:bg-slate-800 transition"
          >
            {info.buttonText ?? 'Далі'}
          </button>
        </div>
      </div>
    </div>
  );
}
