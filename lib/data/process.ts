export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  detail: string;
};

export const process: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Start with the problem, not the framework.',
    detail:
      'Talk to users. Map the constraints. Define what shipping actually means before writing a single line of code.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Architect the system before the screens.',
    detail:
      'Data models, type contracts, auth surface, failure modes. The product flows out of an honest schema, not the other way around.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Write code that survives production.',
    detail:
      'Type-safe end-to-end. Test the unhappy paths. Pick the boring, proven library over the trendy one. Optimize when there is a number to chase.',
  },
  {
    number: '04',
    title: 'Ship & Optimize',
    description: 'Measure everything. Iterate on what moves.',
    detail:
      'Sentry, PostHog, real-user metrics. Cut what is not pulling its weight, double down on what is, and keep the surface small.',
  },
];
