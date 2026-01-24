'use client';

import { useState, useEffect, useRef } from 'react';
import { questions, videoDatabase, Question, infoScreens } from './data';
import { buildFlow, getQuestionProgress } from './flow';
import { QuestionChoiceMobile } from './QuestionChoiceMobile';
import { QuestionMultipleCentered } from './QuestionMultipleCentered';
import { QuestionChoiceCentered } from './QuestionChoiceCentered';
import { QuestionTextCentered } from './QuestionTextCentered';
import { QuestionChoiceCards } from './QuestionChoiceCards';
import { cardQuestions } from './data';


/* ===================== TYPES ===================== */

type Step = 'quiz' | 'contact' | 'loading' | 'result';
type AnswerValue = string | string[];

type ImpactWeek = {
  week: number;
  impactScore: number;
  reason: string;
};

type ImpactResult = {
  weeksImpact: ImpactWeek[];
  topWeeks: number[];
  summary: string;
};

type ResultData = {
  sellingText: string;
  video: any;
  impact?: ImpactResult;
};

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

/* ===================== COMPONENT ===================== */


export default function Home() {
  /* ---------- CORE STATE ---------- */

  const [step, setStep] = useState<Step>('quiz');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [resultData, setResultData] = useState<ResultData | null>(null);

  /* ---------- CONTACT ---------- */

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
  });

  /* ---------- META ---------- */

  const [utmParams, setUtmParams] = useState<UtmParams>({});
  const [quizUrl, setQuizUrl] = useState('');

  /* ---------- INTERNAL ---------- */

  const autoNextTimeout = useRef<number | null>(null);
  const leadSentRef = useRef(false);

  /* ---------- FLOW ---------- */
  const flow = buildFlow(questions, []);
  const currentStep = flow[currentStepIndex];

  const currentQuestion: Question | null =
  currentStep?.type === 'question' ? currentStep.question : null;

  const questionIndex = flow
  .slice(0, currentStepIndex + 1)
  .filter((s) => s.type === 'question').length;

  /* ---------- PROGRESS ---------- */

const totalQuestions = flow.filter((s) => s.type === 'question').length;

const { progress } = getQuestionProgress(
  flow,
  currentStepIndex,
  totalQuestions
);

  /* ===================== EFFECTS ===================== */

  // UTM + URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setQuizUrl(window.location.href);

    const params = new URLSearchParams(window.location.search);

    setUtmParams({
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    });
  }, []);

  /* ===================== ANSWERS ===================== */

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

      return {
        ...prev,
        [currentQuestion.id]: exists
          ? arr.filter((v) => v !== value)
          : [...arr, value],
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
    if (!currentQuestion) return true;

    const val = answers[currentQuestion.id];

    if (currentQuestion.type === 'multiple') {
      return Array.isArray(val) && val.length > 0;
    }

    if (typeof val === 'string') {
      return val.trim().length > 0;
    }

    return false;
  };

  /* ===================== NAVIGATION ===================== */

  const handleNext = () => {
    if (currentStep.type === 'question' && !hasAnswer()) return;

    if (currentStepIndex < flow.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      setStep('contact');
    }
  };

  const goPrevQuestion = () => {
    let prevIndex = currentStepIndex - 1;

    while (prevIndex >= 0 && flow[prevIndex].type !== 'question') {
      prevIndex--;
    }

    if (prevIndex < 0) return;

    const prevQuestionId = (flow[prevIndex] as {
      type: 'question';
      question: Question;
    }).question.id;

    setAnswers((prev) => {
      const next = { ...prev };
      delete next[prevQuestionId];
      return next;
    });

    setCurrentStepIndex(prevIndex);
  };

  /* ===================== AUTO NEXT ===================== */

  useEffect(() => {
    if (step !== 'quiz') return;
    if (!currentQuestion) return;
    if (currentQuestion.type !== 'choice') return;
    if (!hasAnswer()) return;

    if (autoNextTimeout.current) {
      clearTimeout(autoNextTimeout.current);
    }

    autoNextTimeout.current = window.setTimeout(handleNext, 500);

    return () => {
      if (autoNextTimeout.current) {
        clearTimeout(autoNextTimeout.current);
      }
    };
  }, [answers, currentStepIndex, step, currentQuestion?.type]);

  /* ===================== CONTACT SUBMIT ===================== */

  const normalizePhone = (raw: string): string | null => {
    const digits = raw.replace(/\D/g, '');

    if (digits.startsWith('380') && digits.length === 12) return digits;
    if (digits.length === 10 && digits.startsWith('0'))
      return '38' + digits.slice(1);
    if (digits.length === 9) return '380' + digits;

    return null;
  };

  const handleSubmitContact = async () => {
    const name = contactForm.name.trim();
    const phone = normalizePhone(contactForm.phone);

    if (!name || !phone) return;

    setStep('loading');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          contact: { name, phone },
          utm: utmParams,
          quizUrl,
        }),
      });

      const data = await res.json();

      setResultData(
        data.success
          ? data
          : {
              sellingText:
                'Менеджер звʼяжеться з вами для детальнішого аналізу.',
              video: videoDatabase[0],
            }
      );

      setStep('result');
    } catch {
      setResultData({
        sellingText: 'Технічна помилка. Ми все одно збережемо заявку.',
        video: videoDatabase[0],
      });
      setStep('result');
    }
  };

  /* ===================== LOADING ===================== */

  const [loadingStages, setLoadingStages] = useState<LoadingStage[]>([
    { title: 'Маркетинг', progress: 0 },
    { title: 'Продажі', progress: 0 },
    { title: 'Команда', progress: 0 },
  ]);

  useEffect(() => {
    if (step !== 'loading') return;

    if (!leadSentRef.current && (window as any)?.fbq) {
      (window as any).fbq('track', 'Lead');
      leadSentRef.current = true;
    }

    const interval = setInterval(() => {
      setLoadingStages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((s) => s.progress < 100);
        if (idx === -1) return prev;

        next[idx] = {
          ...next[idx],
          progress: Math.min(next[idx].progress + 2, 100),
        };
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [step]);

 // ----- QUESTION: CHOICE -----
if (step === 'quiz' && questionIndex === 1) {
  return (
    <QuestionChoiceMobile
      progress={progress}
      imageUrl="https://i.ibb.co/gbTjSYMm/y-Tr0aw-Rv-FNbbh4nl-Bg-IBSj6-O2r-GXUOtjqhr-EJv0p.png"
      question={{
        text: currentQuestion!.text,
        subtitle: currentQuestion?.subtitle,
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
    />
  );
}

// ----- QUESTION: MULTIPLE -----
if (step === 'quiz' && questionIndex === 2) {
  return (
    <QuestionMultipleCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        helperText: 'Відмітьте всі, що підходять',
        options: currentQuestion!.options ?? [],
      }}
      values={(answers[currentQuestion!.id] as string[]) ?? []}
      onToggle={toggleMultipleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

// ----- 3-й ВАРІАНТ: choice без картинки -----
if (step === 'quiz' && questionIndex === 3) {
  return (
    <QuestionChoiceCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

if (step === 'quiz' && questionIndex === 4) {
  return (
    <QuestionChoiceMobile
      progress={progress}
      imageUrl="https://i.ibb.co/SXMCpJ34/2a35ad61862addba.jpg"
      question={{
        text: currentQuestion!.text,
        subtitle: currentQuestion!.subtitle,
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

// ----- 3-й ВАРІАНТ: choice без картинки -----
if (step === 'quiz' && questionIndex === 5) {
  return (
    <QuestionChoiceCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        subtitle: currentQuestion?.subtitle, // можна, а можна і ні
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

if (step === 'quiz' && questionIndex === 6) {
  return (
    <QuestionChoiceCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

if (step === 'quiz' && questionIndex === 7) {
  return (
    <QuestionTextCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        subtitle: currentQuestion?.subtitle,
        placeholder: currentQuestion?.placeholder,
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onChange={setTextAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}

if (step === 'quiz' && questionIndex === 8) {
  return (
    <QuestionChoiceCentered
      progress={progress}
      question={{
        text: currentQuestion!.text,
        options: currentQuestion!.options ?? [],
      }}
      value={answers[currentQuestion!.id] as string | undefined}
      onSelect={setSingleAnswer}
      onNext={handleNext}
      onPrev={goPrevQuestion}
    />
  );
}



// ----- CARD CHOICE -----
if (step === 'quiz' && questionIndex === 9) {
  const q = cardQuestions[0];

  return (
    <QuestionChoiceCards
      progress={progress}
      question={q}
      value={answers[q.id] as string | undefined}
      onSelect={(v) => {
        setSingleAnswer(v);
        setTimeout(handleNext, 300);
      }}
      onPrev={goPrevQuestion}
    />
  );
}

if (step === 'quiz' && questionIndex === 10) {
  const q = cardQuestions[1];

  return (
    <QuestionChoiceCards
      progress={progress}
      question={q}
      value={answers[q.id] as string | undefined}
      onSelect={(v) => {
        setSingleAnswer(v);
        setTimeout(handleNext, 300);
      }}
      onPrev={goPrevQuestion}
    />
  );
}


// ----- FALLBACK -----
return <div />;
}
