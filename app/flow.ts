// app/flow.ts
import type { Question } from './data';
import type { InfoScreenConfig } from './data';

export type FlowStep =
  | { type: 'question'; question: Question }
  | { type: 'info'; info: InfoScreenConfig };

export function buildFlow(questions: Question[], infoScreens: InfoScreenConfig[]): FlowStep[] {
  const map = new Map(infoScreens.map((s) => [s.afterQuestionId, s]));

  const flow: FlowStep[] = [];

  for (const q of questions) {
    flow.push({ type: 'question', question: q });

    const info = map.get(q.id);
    if (info) {
      flow.push({ type: 'info', info });
    }
  }

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
