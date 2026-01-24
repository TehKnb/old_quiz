import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { videoDatabase, questions } from '../../data';
import { weeks } from '../../weeks';


// --- ENV ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const WEBHOOK_URL = process.env.NETHUNT_WEBHOOK_URL;

// Хелпер для форматування значень
const formatValue = (val: any): string => {
  if (Array.isArray(val)) return val.join(', ');
  if (val === undefined || val === null) return '';
  return String(val);
};


type WeeksImpactResult = {
  weeksImpact: {
    week: number;
    impactScore: number;
    reason: string;
  }[];
  topWeeks: number[]; // 👈 ДОДАТИ
  summary: string;
};

const buildImpactPrompt = ({
  answersFormatted,
  weeksText,
}: {
  answersFormatted: string;
  weeksText: string;
}) => `
Ти — бізнес-аналітик і консультант.

На основі відповідей клієнта та опису тижнів програми
визнач, на яких тижнях навчання клієнт отримає НАЙБІЛЬШИЙ ефект.

Важливі правила:
- Найефективніших тижнів має бути НЕ МЕНШЕ 2.
- В ідеалі — 3 тижні з підвищеним impactScore.
- Усі 7 тижнів ОБОВʼЯЗКОВО мають бути присутні у відповіді.
- impactScore: від 0 до 100.
- Один з тижнів має мати максимальний impactScore (maxImpactWeek).

Відповіді клієнта:
${answersFormatted}

Тижні програми:
${weeksText}

Поверни СТРОГО JSON:
{
  "weeksImpact": [
    { "week": 1, "impactScore": 0-100, "reason": "коротке пояснення" }
  ],
  "topWeeks": [number, number],
  "summary": "Персоналізований висновок з прямим звертанням на «Ви»"
}

`.trim();


// Формуємо QA у структурованому вигляді (для OpenAI, не для CRM)
const buildQAString = (answers: Record<string, any>): string => {
  return questions
    .map((q, index) => {
      const val = answers[q.id];
      const answerText = formatValue(val) || '-';

      return `QA${index + 1}:
Питання: ${q.text}
Відповідь: ${answerText}


`;
    })
    .join('');
};

// Нормалізація телефону для CRM (380XXXXXXXXX)
const normalizePhoneServer = (raw: string): string => {
  const digits = (raw || '').replace(/\D/g, '');

  if (digits.startsWith('380') && digits.length === 12) {
    return digits;
  }
  if (digits.length === 10 && digits.startsWith('0')) {
    return '38' + digits.slice(1);
  }
  if (digits.length === 9) {
    return '380' + digits;
  }

  // fallback — якщо не можемо привести до формату, віддаємо як є (але вже без сміття)
  return digits || raw;
};

// --- Відправка у CRM через Webhook ---
async function sendToCRM(params: {
  contact: { name: string; phone: string };
  answers: Record<string, any>;
  sellingText: string;
  usedOpenAI: boolean;
  videoUrl: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  quizUrl?: string;
  targetologist?: string;
}) {
  const {
    contact,
    answers,
    sellingText,
    usedOpenAI,
    videoUrl,
    utm,
    quizUrl,
    targetologist, // 👈
  } = params;

  if (!WEBHOOK_URL) {
    console.log('CRM_WEBHOOK_STATUS: FAILED (no WEBHOOK_URL)');
    return;
  }

  console.log('QUIZ_URL_FROM_CLIENT:', quizUrl);

  const aiTextForCrm = usedOpenAI
    ? sellingText
    : 'Немає тексту, згенерованого AI (використано резервний варіант).';

  // 🔥 Формуємо окремі поля Q1, A1, Q2, A2...
  const qaFields: Record<string, string> = {};

  questions.forEach((q, index) => {
    const number = index + 1;
    const answer = answers[q.id];
    const formattedAnswer = Array.isArray(answer)
      ? answer.join(', ')
      : answer || '';

    qaFields[`Q${number}`] = q.text;
    qaFields[`A${number}`] = formattedAnswer;
  });

  const payload = {
    // 🔹 Статична назва заявки
    name: 'Заявка на безкоштовну консультацію: Квіз, 7-ми тижнева програма (Старий)',

    // 🔹 Імʼя клієнта окремим полем
    'client-name': contact.name,

    // 🔹 Телефон у нормалізованому форматі
    phone: normalizePhoneServer(contact.phone),

    // 🔹 Джерело
    джерело: 'Заявка на консультацію (Квіз, 7-ми тижнева програма)',

    // 🔹 URL квіза (повна адреса сторінки)
    quizUrl: quizUrl || '',

    
    aiText: aiTextForCrm,
    videoUrl,
    usedOpenAI,
    timestamp: new Date().toISOString(),
    targetologist: targetologist || '',
    // 👇 UTM-и окремими змінними
    utm_source: utm?.utm_source || '',
    utm_medium: utm?.utm_medium || '',
    utm_campaign: utm?.utm_campaign || '',
    utm_content: utm?.utm_content || '',
    utm_term: utm?.utm_term || '',

    ...qaFields,
  };

  console.log('CRM_PAYLOAD:', payload);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('CRM_WEBHOOK_STATUS: SUCCESS');
    } else {
      console.error('CRM_WEBHOOK_STATUS: FAILED', response.status);
    }
  } catch (err) {
    console.error('CRM_WEBHOOK_STATUS: FAILED', String(err));
  }
}

// --- Основний маршрут ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, contact, utm, quizUrl } = body as {
      answers: Record<string, any>;
      contact: { name: string; phone: string };
      utm?: {
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_content?: string;
        utm_term?: string;
      };
      quizUrl?: string;
    };

let targetologist = 'unknown';

if (quizUrl?.includes('quiz.a.')) targetologist = 'A';
if (quizUrl?.includes('quiz.b.')) targetologist = 'B';
if (quizUrl?.includes('quiz.c.')) targetologist = 'C';
if (quizUrl?.includes('quiz.d.')) targetologist = 'D';
if (quizUrl?.includes('quiz.e.')) targetologist = 'E';

    // Запасний варіант
    let aiResult: { sellingText: string; caseId: string } = {
      sellingText:
        'Ми побачили, що у Вашому бізнесі є кілька важливих точок росту. Наш менеджер зателефонує Вам, щоб розібратись глибше, підказати оптимальний формат навчання та допомогти вибрати наступні кроки. Поки Ви очікуєте дзвінок, подивіться цей відеокейс — у ньому Ви побачите рішення, які можуть бути актуальними і для Вашої ситуації.',
      caseId: videoDatabase[0].id,
    };

    let usedOpenAI = false;
    let impactResult: WeeksImpactResult | null = null;


    // --- Виклик OpenAI ---
    if (process.env.OPENAI_API_KEY) {
      try {
        const answersFormatted = buildQAString(answers);
        try {
          const weeksText = weeks
            .map(
              (w) =>
                `Тиждень ${w.week}: ${w.title}
        ${w.description}`
            )
            .join('\n\n');

          const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            messages: [
              {
                role: 'system',
                content: 'Відповідай тільки валідним JSON.',
              },
              {
                role: 'user',
                content: buildImpactPrompt({
                  answersFormatted,
                  weeksText,
                }),
              },
            ],
            response_format: { type: 'json_object' },
          });
          const content = completion.choices[0]?.message?.content;
          if (content) {
            impactResult = JSON.parse(content); // ✅ ОСЬ ТУТ
          }
        } catch (e) {
          console.error('IMPACT_AI_ERROR', e);
        }
        if (!impactResult) {
          impactResult = {
            weeksImpact: weeks.map((w) => ({
              week: w.week,
              impactScore: 50,
              reason: 'Базовий ефект програми для бізнесу.',
            })),
            topWeeks: [2, 4], // або [2,4,6]
            summary: 'Вітаємо! Програма дає комплексний ефект для більшості бізнесів.',
          };
        }

        
      



        const videosContext = videoDatabase
          .map(
            (v) => `id: ${v.id}
              title: ${v.title}
              description: ${v.description}
              nicheTags: ${
              Array.isArray((v as any).nicheTags)
                ? (v as any).nicheTags.join(', ')
                : ''
            }
painTags: ${
              Array.isArray((v as any).painTags)
                ? (v as any).painTags.join(', ')
                : ''
            }
platform: ${v.platform}
videoId (платформи): ${v.videoId}`
          )
          .join('\n\n');

        const allowedCaseIds = videoDatabase.map((v) => v.id).join(', ');
        const clientName = contact?.name || '';

        const prompt = `
Ти - досвідчений маркетолог і бізнес-консультант, який працює з українськими підприємцями. 
Ти добре розумієш реалії українського бізнесу, а також знаєш структуру та цінність 7-ми тижневої програми «Стратегія керованого зростання», 
яка допомагає підприємцям вирішити три ключові зони розвитку бізнесу: маркетинг, найм, продажі. 
Після програми учасники можуть приєднатись до спільноти бізнес-Клубу для подальшого росту.

Твоє завдання - на основі відповідей клієнта та бази відео-кейсів зробити ДВІ речі: 
1) Написати ОДИН персональний продаючий текст українською мовою (поле "sellingText"). 
2) Обрати ОДИН відеокейс із наданого списку і повернути його "id" у полі "caseId".

---

Відповіді клієнта з квізу (формат: питання → відповідь):
${answersFormatted}

Ім'я клієнта (якщо є): ${clientName || 'не вказано'}

Список доступних відео-кейсів:
${videosContext}

СЛУЖБОВО:
- "id" у кожного кейсу (наприклад: case-1, case_auto_service_kharkiv, case_tactical_boots) — це ВНУТРІШНІЙ ідентифікатор кейсу, його НЕ потрібно використовувати у відповіді.
- "videoId" у кейсі — це ID з YouTube/Vimeo, його НЕ потрібно використовувати у відповіді.
- Посилання на відео також не використовуй у відповіді.
- У полі "caseId" у відповіді ти МАЄШ вказати одне зі значень із поля id.

Список допустимих значень для "caseId":
${allowedCaseIds}

---

Вимоги до продаючого тексту ("sellingText"):
1. Початок тексту:
- Текст має ЗАВЖДИ починатися зі слів:
  «Вітаємо, {{імʼя_в_кличному}}!»
  Якщо ім’я не вказано — «Вітаємо!».
- Комунікація ведеться від імені “команда Конс на Бі$”.

2. Мова і стиль:
- Пиши живою, професійною українською.
- Звертайся до клієнта строго на «Ви».
- Тон має бути ввічливим, поважним, але не офіціозним.
- Текст має звучати як персональне звернення, а не як шаблонний шаблон.

3. Персоналізація:
- Показуй, що ти дійсно зрозумів ситуацію клієнта: його нішу, проблеми, поточні труднощі та бажання змін.
- Спирайся виключно на його відповіді: маркетинг, реклама, продажі, команда, системність, трафік, онлайн-упаковка тощо.
- Відзеркали 1–3 ключові «болі» клієнта і коротко поясни, чому вони стримують ріст бізнесу.

4. Як програма може допомогти:
- Поясни, як 7-ми тижнева програма «Стратегія керованого зростання» може бути корисною саме цьому клієнту з урахуванням його відповідей.
- Робити акцент на трьох головних блоках:
  • маркетинг — створення керованого трафіку та стабільного потоку клієнтів;  
  • найм та команда — звільнення власника від операційки, посилення команди;  
  • продажі — побудова системних продажів, скриптів, конверсій.
- Не обіцяй фантастичних результатів. Формулюй чесно: «допомагає», «може посилити», «створює умови для зростання».

5. Спільнота бізнес-Клубу:
- В одному короткому реченні згадай, що після програми клієнт може приєднатись до спільноти бізнес-Клубу — середовища підприємців, які взаємодіють, проводять зустрічі, обмінюються досвідом та зростають разом.

6. Дзвінок менеджера та відеокейс:
- Обов’язково додай, що менеджер зателефонує, щоб розібратись глибше у ситуації клієнта та підказати, чи підійде йому програма.
- Обов’язково додай фразу типу: «Поки Ви очікуєте дзвінок, перегляньте відеокейс…» — і плавно підведи до нього.
- НЕ згадуй нішу відеокейсу. Кейс має подаватися як приклад бізнесу, який пройшов схожий шлях або вирішував подібні задачі, а не як точна копія ніші клієнта.

7. Обсяг:
- Текст — 2–5 абзаців.
- Без списків, лише зв’язний текст.

---

Вимоги до вибору відео ("caseId"):

- Обери ОДИН кейс із списку вище.
- "caseId" у відповіді має бути СТРОГО одним із таких значень: ${allowedCaseIds}
- Орієнтуйся на:
  • нішу клієнта (з відповідей),  
  • його проблеми та болі (як з відповідей, так і по painTags),  
  • формат бізнесу (онлайн/офлайн/гібрид),  
  • масштаб бізнесу та наявність команди.
- Якщо точного збігу немає — обери найбільш універсальний кейс про систематизацію бізнесу, роботу з маркетингом, наймом чи продажами.

---

СТРОГО відповідай у форматі JSON:
{
  "sellingText": "тут продаючий текст українською",
  "caseId": "один із ІД з цього списку: ${allowedCaseIds}"
}
      `.trim();

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Відповідай тільки валідним JSON.' },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);

          const candidateCaseId: string | undefined =
            parsed.caseId || parsed.videoId; // на всяк випадок, якщо стара логіка

          const existsInDb =
            candidateCaseId &&
            videoDatabase.some((v) => v.id === candidateCaseId);

          const finalCaseId = existsInDb ? candidateCaseId! : aiResult.caseId;

          if (!existsInDb && candidateCaseId) {
            console.warn(
              'OPENAI_WARNING: model returned unknown caseId:',
              candidateCaseId
            );
          }

          aiResult = {
            sellingText: parsed.sellingText || aiResult.sellingText,
            caseId: finalCaseId,
          };

          usedOpenAI = true;
        }
      } catch (err) {
        usedOpenAI = false;
        console.error('OPENAI_ERROR', String(err));
      }
    } else {
      usedOpenAI = false;
    }

    console.log('OPENAI_RESPONSE_SOURCE:', usedOpenAI ? 'AI' : 'FALLBACK');

    // --- Вибір відео за caseId ---
    const selectedVideo =
      videoDatabase.find((v) => v.id === aiResult.caseId) || videoDatabase[0];

    // Посилання на відео для CRM
    let videoUrl = '';
    if (selectedVideo.platform === 'youtube') {
      videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;
    } else if (selectedVideo.platform === 'vimeo') {
      videoUrl = `https://vimeo.com/${selectedVideo.videoId}`;
    }

    // --- Відправка в CRM ---
    await sendToCRM({
      contact,
      answers,
      sellingText: aiResult.sellingText,
      usedOpenAI,
      videoUrl,
      utm,
      quizUrl,
      targetologist, // 👈 ДОДАЛИ
    });

    // --- Відповідь фронтенду ---
    return NextResponse.json({
      success: true,
      sellingText: aiResult.sellingText,
      video: selectedVideo,
      impact: impactResult,
    });
  } catch (error) {
    console.error('ROUTE_FATAL_ERROR', String(error));
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
