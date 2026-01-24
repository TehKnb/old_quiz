'use client';

import { useState, useEffect, useRef } from 'react';
import { questions, videoDatabase, Question, infoScreens } from './data';
import { buildFlow, getQuestionProgress } from './flow';
import { InfoView } from './views';
import { ArrowRight } from 'lucide-react';
import { ImpactChart } from './ImpactChart';


const questionImagesById: Record<string, string> = {
  //niche: 'https://i.ibb.co/q3RG8r4f/Pc1.png',
  //marketing_understanding: 'https://i.ibb.co/JjwnhK1f/Pc2.png',

  niche: 'https://i.ibb.co/q3RG8r4f/Pc1.png',
  marketing_understanding: 'https://i.ibb.co/5gqPfQpG/389574de34d25597.png',
  ad_importance: 'https://i.ibb.co/vCb44WWP/Pc3.png',
  traffic_channel: 'https://i.ibb.co/DgR9vg9Y/Pc4.png',
  targetologist_experience: 'https://i.ibb.co/SDdnd9wc/Pc5.png',
  smm_specialist: 'https://i.ibb.co/rPT3300/Pc6.png',
  analytics_skills: 'https://i.ibb.co/V0zK1b7y/Pc7.png',
  kpi_tracking: 'https://i.ibb.co/9kkPgnYk/Pc8.png',
  team_size: 'https://i.ibb.co/Mkq9n04c/Pc9.png',
  team_quality: 'https://i.ibb.co/2YqmZTsr/Pc10.png',
  scripts: 'https://i.ibb.co/Fp91ZXC/Pc11.png',
  spin_upsell: 'https://i.ibb.co/5Whghxrt/Pc12.png',
  sales_training: 'https://i.ibb.co/QFYJ4r5q/Pc13.png',
  site_understanding: 'https://i.ibb.co/C55kw1VQ/Pc14.png',
  profit: 'https://i.ibb.co/kVyLBGSb/Pc15.png',
};

const questionImagesMobileById: Record<string, string> = {
  //niche: 'https://i.ibb.co/5gqPfQpG/389574de34d25597.png',
  //marketing_understanding: 'https://i.ibb.co/JjwnhK1f/Pc2.png',
  niche: 'https://i.ibb.co/q3RG8r4f/Pc1.png',
  marketing_understanding: 'https://i.ibb.co/5gqPfQpG/389574de34d25597.png',
  ad_importance: 'https://i.ibb.co/jvnzL5mT/Tf3.png',
  traffic_channel: 'https://i.ibb.co/bG4khCf/Tf4.png',
  targetologist_experience: 'https://i.ibb.co/fTZzM92/Tf5.png',
  smm_specialist: 'https://i.ibb.co/JjfW11yR/Tf6.png',
  analytics_skills: 'https://i.ibb.co/KJYgF5b/Tf7.png',
  kpi_tracking: 'https://i.ibb.co/8n9LwJM3/Tf8.png',
  team_size: 'https://i.ibb.co/qLHP4Qpw/Tf9.png',
  team_quality: 'https://i.ibb.co/PvT8g25N/Tf10.png',
  scripts: 'https://i.ibb.co/0ysjk3Sf/Tf11.png',
  spin_upsell: 'https://i.ibb.co/39PFTq5K/Tf12.png',
  sales_training: 'https://i.ibb.co/HLcfDXm7/Tf13.png',
  site_understanding: 'https://i.ibb.co/cXhHwyVS/Tf14.png',
  profit: 'https://i.ibb.co/99BnHX1c/Tf15.png',
};



type Step = 'quiz' | 'contact' | 'loading' | 'result';
type AnswerValue = string | string[];
type ImpactWeek = { week: number; impactScore: number; reason: string };
type ImpactResult = { weeksImpact: ImpactWeek[]; topWeeks: number[]; summary: string };
type ResultData = { sellingText: string; video: any; impact?: ImpactResult };

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

type LoadingStage = {
  title: string;
  progress: number;
};

export default function Home() {
  const [step, setStep] = useState<Step>('quiz');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [contactForm, setContactForm] = useState({ name: '', phone: '' });
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [utmParams, setUtmParams] = useState<UtmParams>({});
  const [quizUrl, setQuizUrl] = useState<string>('');
  const autoNextTimeout = useRef<number | null>(null);
  const leadSentRef = useRef(false);
  const flow = buildFlow(questions, infoScreens);
  const currentStep = flow[currentStepIndex];
  const currentQuestion: Question | null =
    currentStep?.type === 'question' ? currentStep.question : null;


  // ----- UTM + URL квіза -----
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { href, search } = window.location;
    setQuizUrl(href); // повна адреса сторінки

    if (!search) return;
    const params = new URLSearchParams(search);

    setUtmParams({
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    });
  }, []);

  // ----- робота з відповідями -----
  const setSingleAnswer = (value: string) => {
  if (!currentQuestion) return;
  setAnswers((prev) => ({
    ...prev,
    [currentQuestion.id]: value,
  }));
  };

  const toggleMultipleAnswer = (value: string) => {
    if (!currentQuestion) return;

    setAnswers((prev) => {
      const prevVal = prev[currentQuestion.id];
      const arr = Array.isArray(prevVal) ? prevVal : [];
      const exists = arr.includes(value);
      const nextArr = exists ? arr.filter((v) => v !== value) : [...arr, value];

      return {
        ...prev,
        [currentQuestion.id]: nextArr,
      };
    });
  };

  const setTextAnswer = (value: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };


  const hasAnswer = (): boolean => {
    if (!currentQuestion) return true; // для info дозволяємо "далі"

    const val = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(val) && val.length > 0;
    }
    if (typeof val === 'string') {
      return val.trim().length > 0;
    }
    return false;
  };

  // ----- нормалізація телефону -----
  const normalizePhone = (raw: string): string | null => {
    const digits = raw.replace(/\D/g, '');

    if (digits.startsWith('380') && digits.length === 12) {
      return digits;
    }
    if (digits.length === 10 && digits.startsWith('0')) {
      return '38' + digits.slice(1);
    }
    if (digits.length === 9) {
      return '380' + digits;
    }

    return null;
  };

  // ----- перехід по питаннях -----
  const handleNext = () => {
  // якщо на питанні — перевіряємо відповідь
    if (currentStep.type === 'question') {
      if (!hasAnswer()) return;
    }

    if (currentStepIndex < flow.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      setStep('contact');
    }
  };

  const goPrevQuestion = () => {
  // стартуємо з кроку перед поточним
  let prevIndex = currentStepIndex - 1;

  // йдемо назад, поки не знайдемо question
  while (prevIndex >= 0 && flow[prevIndex].type !== 'question') {
    prevIndex--;
  }

  // якщо питань більше нема — нічого не робимо
  if (prevIndex < 0) return;

  // беремо id питання
  const prevQuestionId = (flow[prevIndex] as { type: 'question'; question: Question }).question.id;


  // видаляємо відповідь на це питання
  setAnswers((prev) => {
    const next = { ...prev };
    delete next[prevQuestionId];
    return next;
  });

  // переходимо саме на це питання
  setCurrentStepIndex(prevIndex);
};


  // ----- сабміт контактів -----
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = contactForm.name.trim();
    if (!trimmedName) {
      alert('Будь ласка, вкажіть Ваше імʼя.');
      return;
    }

    const normalizedPhone = normalizePhone(contactForm.phone);
    if (!normalizedPhone) {
      alert(
        'Будь ласка, введіть коректний номер телефону у форматі 380XXXXXXXXX або з українським кодом.'
      );
      return;
    }

    setStep('loading');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          contact: {
            name: trimmedName,
            phone: normalizedPhone,
          },
          utm: utmParams,
          quizUrl, // 🔹 передаємо URL квіза на бекенд
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoadingStages((prev) =>
          prev.map((s) => ({ ...s, progress: 100 }))
        );
        setResultData(data);
      } else {
        setResultData({
          sellingText:
            'Ми побачили, що у вашому бізнесі є кілька важливих точок росту. Наш менеджер зателефонує вам, щоб розібратись глибше та підказати оптимальний формат співпраці. Поки ви чекаєте дзвінка — подивіться цей відео-кейс, він допоможе побачити можливі рішення зі сторони.',
          video: videoDatabase[0],
        });
      }
      setStep('result');
    } catch (error) {
      console.error(error);
      setResultData({
        sellingText:
          'Сталася технічна помилка, але ми все одно збережемо вашу заявку. Менеджер звʼяжеться з вами, щоб обговорити ситуацію та можливі рішення. А поки — подивіться цей відео-кейс.',
        video: videoDatabase[0],
      });
      setStep('result');
    }
  };
  // Автоперехід
  useEffect(() => {
  if (step !== 'quiz') return;
  if (!currentQuestion) return; // якщо info — не автопереходимо

  if (currentQuestion.type !== 'choice' && currentQuestion.type !== 'multiple') return;
  if (!hasAnswer()) return;

  if (autoNextTimeout.current !== null) clearTimeout(autoNextTimeout.current);

  autoNextTimeout.current = window.setTimeout(() => {
    handleNext();
  }, 500);

  return () => {
    if (autoNextTimeout.current !== null) clearTimeout(autoNextTimeout.current);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [answers, currentStepIndex, step, currentQuestion?.type]);


const [loadingStages, setLoadingStages] = useState<LoadingStage[]>([
  { title: 'Аналізуємо ваш підхід до маркетингу', progress: 0 },
  { title: 'Аналізуємо ваш підхід до продажів', progress: 0 },
  { title: 'Аналізуємо ваш підхід до набору персоналу та роботи з командою', progress: 0 },
]);

useEffect(() => {
  if (step !== 'loading') return;
  if (leadSentRef.current) return;

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
    leadSentRef.current = true;
  }
}, [step]);


useEffect(() => {
  if (step !== 'loading') return;

  const interval = window.setInterval(() => {
    setLoadingStages((prev) => {
      const next = [...prev];

      const currentIndex = next.findIndex((s) => s.progress < 100);

      if (currentIndex === -1) return prev;

      next[currentIndex] = {
        ...next[currentIndex],
        progress: Math.min(next[currentIndex].progress + 2, 100),
      };

      return next;
    });
  }, 120);

  return () => clearInterval(interval);
}, [step]);


// ----- 1. КВІЗ -----
if (step === 'quiz') {
  const { progress } = getQuestionProgress(flow, currentStepIndex, questions.length);

  if (currentStep.type === 'info') {
    return (
      <InfoView
        info={currentStep.info}
        progress={progress}
        onNext={handleNext}
        onPrev={goPrevQuestion}
      />
    );
  }

  const q = currentStep.question;

  let questionNumber = 0;
  for (let i = 0; i <= currentStepIndex; i++) {
    if (flow[i].type === 'question') questionNumber++;
  }
  const imageUrl = questionImagesById[q.id];
  const currentValue = answers[q.id];

  const isSelected = (opt: string) => {
    if (q.type === 'multiple') {
      return Array.isArray(currentValue) && currentValue.includes(opt);
    }
    return currentValue === opt;
  };

  const handleOptionClick = (opt: string) => {
    if (q.type === 'multiple') toggleMultipleAnswer(opt);
    else setSingleAnswer(opt);
  };

  return (
    <div className="min-h-screen bg-[#F6F9FF] flex justify-center px-4 pt-[5px] pb-10">
      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-lg p-6 md:p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* MOBILE PROGRESS */}
          <div className="block md:hidden mb-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>
                Питання {questionNumber} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* LEFT IMAGE */}
          <div className="hidden md:flex bg-[#EEF3FF] rounded-[28px] p-6 items-center justify-center">
            {/* DESKTOP IMAGE */}
              <img
                src={questionImagesById[q.id]}
                alt={`Illustration for ${q.id}`}
                className="hidden md:block w-full h-full object-contain"
              />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col h-full">

            {/* STICKY PROGRESS */}
            <div className="hidden md:block sticky top-0 bg-white pt-2 pb-6 z-10">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>
                  Питання {questionNumber} / {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* CENTER CONTENT */}
            <div className="flex-1 flex flex-col justify-center">
              {/* DESKTOP QUESTION */}
              <h2 className="hidden md:block text-2xl font-bold text-slate-900 mb-6 leading-snug">
                {q.text}
              </h2>
              {/* ===== MOBILE FIRST QUESTION (IMAGE SEPARATE) ===== */}
              {questionNumber === 1 ? (
                <>
                  {/* IMAGE */}
                  <div className="md:hidden mb-4">
                    <img
                      src={questionImagesMobileById[q.id]}
                      alt={`Illustration for ${q.id}`}
                      className="w-full rounded-3xl object-cover"
                    />
                  </div>

                  {/* QUESTION */}
                  <h2 className="md:hidden text-xl font-bold text-slate-900 mb-4 leading-snug text-center">
                    {q.text}
                  </h2>
                </>
              ) : (
                /* ===== MOBILE OTHER QUESTIONS (IMAGE AS BACKGROUND) ===== */
                <div
                  className="md:hidden relative rounded-3xl mb-6 px-6 py-8 flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${questionImagesMobileById[q.id]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '220px',
                  }}
                >
                  <div className="absolute inset-0 bg-white/70 rounded-3xl" />

                  <h2 className="relative z-10 text-xl font-bold text-slate-900 leading-snug">
                    {q.text}
                  </h2>
                </div>
              )}


              {q.type === 'text' && (
                <input
                  type="text"
                  placeholder={q.placeholder}
                  value={typeof currentValue === 'string' ? currentValue : ''}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  className="
                      w-full px-5 py-4
                      rounded-2xl
                      border border-slate-300
                      focus:outline-none focus:border-black
                      text-base
                      text-black !text-black
                      placeholder:text-slate-400
                  "
                />

              )}

              {(q.type === 'choice' || q.type === 'multiple') && q.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt) => {
                    const active = isSelected(opt);
                    return (
                      <button
                      key={opt}
                      type="button"
                      onClick={() => handleOptionClick(opt)}
                      className={`
                        min-h-[72px] text-left rounded-2xl px-5 py-4 border transition
                        bg-white opacity-100
                        ${
                          active
                            ? 'border-black bg-white text-black'
                            : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-between pt-6 mt-auto">
              {questionNumber > 1 ? (
                <button
                  onClick={goPrevQuestion}
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    text-sm
                    md:px-6 md:py-4
                    md:text-base
                    rounded-xl md:rounded-2xl
                    text-slate-600
                    bg-transparent
                    hover:text-black
                    transition
                  "
                >
                Попереднє питання
                </button>
              ) : (
                <div /> /* пустий елемент для збереження вирівнювання */
              )}

              <button
                onClick={handleNext}
                disabled={!hasAnswer()}
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
                Далі
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


// ----- 2. КОНТАКТИ -----
if (step === 'contact') {
  return (
    <div className="bg-[#F6F9FF] flex justify-center px-4 py-4 md:min-h-screen md:items-center md:py-10">
      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-lg p-4 md:p-10">

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex flex-col items-center gap-[20px]">

          {/* MOBILE IMAGE */}
          <img
            src="https://i.ibb.co/NnbMhysq/Tf-form-1.png"
            alt="Program box mobile"
            className="w-full max-w-[360px] object-contain"
          />

          {/* MOBILE CONTENT */}
          <div className="w-full flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Ми проаналізували ваші відповіді та підготували персональний висновок
              із відеокейсом, який точно відображає вашу ситуацію.
            </h2>

            <p className="text-slate-600 mb-4">
              Це допоможе визначити, чи є 7-ми тижнева програма релевантною саме
              для вашого бізнесу.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmitContact}
              className="space-y-2"
            >
              {/* NAME */}
              <input
                required
                placeholder="Ваше імʼя"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="
                  w-full px-5 py-4
                  rounded-2xl
                  border border-slate-300
                  focus:outline-none focus:border-black
                  text-base text-black
                  bg-white
                  placeholder:text-slate-400
                  [color-scheme:light]
                "
              />

              {/* PHONE */}
              <div className="flex items-center gap-2 w-full">
                <div className="px-5 py-4 rounded-2xl border border-slate-300 bg-slate-100 text-slate-700 font-medium">
                  380
                </div>

                <input
                  required
                  type="tel"
                  placeholder="XXXXXXXXX"
                  value={contactForm.phone.replace(/^380/, '')}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setContactForm((prev) => ({
                      ...prev,
                      phone: '380' + digits,
                    }));
                  }}
                  className="
                    w-full px-5 py-4
                    rounded-2xl
                    border border-slate-300
                    focus:outline-none focus:border-black
                    text-base text-black
                    bg-white
                    placeholder:text-slate-400
                    [color-scheme:light]
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full mt-3 py-4 rounded-2xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition"
              >
                Отримати результат
              </button>
            </form>
          </div>
        </div>

        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-10 md:items-center">

          {/* DESKTOP IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/DHtc4TWN/form.png"
              alt="Program box"
              className="w-full h-full object-contain"
            />
          </div>

          {/* DESKTOP CONTENT */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ми проаналізували ваші відповіді та підготували персональний висновок
              із відеокейсом, який точно відображає вашу ситуацію.
            </h2>

            <p className="text-slate-600 mb-8">
              Це допоможе визначити, чи є 7-ми тижнева програма релевантною саме
              для вашого бізнесу.
            </p>

            <form
              onSubmit={handleSubmitContact}
              className="space-y-4"
            >
              <input
                required
                placeholder="Ваше імʼя"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="
                  w-full px-5 py-4
                  rounded-2xl
                  border border-slate-300
                  focus:outline-none focus:border-black
                  text-base text-black
                  bg-white
                  placeholder:text-slate-400
                "
              />

              <div className="flex items-center gap-2 w-full">
                <div className="px-5 py-4 rounded-2xl border border-slate-300 bg-slate-100 text-slate-700 font-medium">
                  380
                </div>

                <input
                  required
                  type="tel"
                  placeholder="XXXXXXXXX"
                  value={contactForm.phone.replace(/^380/, '')}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setContactForm((prev) => ({
                      ...prev,
                      phone: '380' + digits,
                    }));
                  }}
                  className="
                    w-full px-5 py-4
                    rounded-2xl
                    border border-slate-300
                    focus:outline-none focus:border-black
                    text-base text-black
                    bg-white
                    placeholder:text-slate-400
                  "
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 rounded-2xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition"
              >
                Отримати результат
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}



  // ----- 3. ЗАВАНТАЖЕННЯ -----
  if (step === 'loading') {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        <h2 className="text-white text-lg font-semibold text-center">
          Готуємо персональний висновок
        </h2>

        {loadingStages.map((stage, index) => {
          const isActive =
            index === loadingStages.findIndex((s) => s.progress < 100);

          const isDone = stage.progress === 100;

          return (
            <div
              key={stage.title}
              className={`rounded-2xl p-4 transition
                ${isActive || isDone ? 'bg-slate-800' : 'bg-slate-800/40'}
              `}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white">{stage.title}</span>
                <span className="text-slate-300">{stage.progress}%</span>
              </div>

              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
            </div>
          );
        })}

        <p className="text-center text-slate-400 text-xs mt-4">
          Це займе приблизно 15–20 секунд
        </p>
      </div>
    </div>
  );
}


  // ----- 4. РЕЗУЛЬТАТ -----
  if (step === 'result' && resultData) {
    const video = resultData.video;

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">
            Персональний висновок щодо того, чи підходить вам 7-ми тижнева
            програма
          </h1>

          {/* Персональний текст */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-700 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
              {resultData.sellingText}
            </p>
          </div>

          {/* Відео-кейс */}
          <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video">
            {video?.platform === 'youtube' ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title || 'Video case'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                src={`https://player.vimeo.com/video/${video.videoId}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          {resultData?.impact && (
          <div className="bg-white rounded-3xl p-6 mt-8 shadow">
            <h3 className="text-xl font-bold mb-4 text-slate-900 opacity-100">
              Максимально ефективні тижні для вашого бізнесу
            </h3>

            <div className="flex items-end gap-2 h-[180px] mt-6">
            {resultData.impact.weeksImpact.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center h-full justify-end">
                
                {/* Стовпчик */}
                <div
                  className={`w-full rounded-t-md transition-all ${
                    resultData.impact?.topWeeks?.includes(w.week)
                      ? 'bg-blue-600'
                      : 'bg-slate-300'
                  }`}
                  style={{ height: `${Math.min(w.impactScore, 100)}%` }}
                  title={w.reason}
                />

                {/* Підпис тижня */}
                <span className="mt-2 text-xs text-slate-500">
                  {w.week} тиждень
                </span>
              </div>
            ))}
          </div>


            <p className="mt-4 text-slate-600 text-sm">
              Ці тижні дадуть вам найбільш відчутний результат з урахуванням вашої поточної
              ситуації. Водночас уся 7-тижнева програма вибудувана як єдина система — кожен
              етап підсилює наступний і формує стабільну основу для зростання бізнесу.
            </p>
          </div>
        )}


        </div>
      </div>
    );
  }

  return null;
}
