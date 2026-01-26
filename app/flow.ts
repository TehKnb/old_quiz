import type { Question } from './data';
import type { InfoScreenConfig } from './data';

export type FlowStep =
  | { type: 'question'; question: Question }
  | { type: 'info'; info: InfoScreenConfig };

export function buildFlow(
  questions: Question[],
  infoScreens: InfoScreenConfig[]
): FlowStep[] {
  const flow: FlowStep[] = [];

  questions.forEach((q) => {
    // 1. питання
    flow.push({
      type: 'question',
      question: q,
    });

    // 2. info-екрани після нього
    const infos = infoScreens.filter(
      (i) => i.afterQuestionId === q.id
    );

    infos.forEach((info) => {
      flow.push({
        type: 'info',
        info,
      });
    });
  });

  return flow;
}



// Для прогресу по питаннях (а не по інфо)
export function getQuestionProgress(flow: FlowStep[], stepIndex: number, totalQuestions: number) {
  let answeredQuestions = 0;

  for (let i = 0; i <= stepIndex; i++) {
    if (flow[i]?.type === 'question') answeredQuestions++;
  }

  const progress = (answeredQuestions / totalQuestions) * 100;
  return { answeredQuestions, progress };
}
