import { PageCard } from './types';

export const pagesCards: PageCard[] = [
  {
    type: 'page',
    title: 'About Us',
    description: {
      __html:
        'Digital<br>Dreams.<br>Analog<br>Hearts.<br>Integrated<br>Futures.',
    },
    size: 'medium',
  },
  {
    type: 'page',
    title: 'Meet the Team',
    description: { __html: 'Meet<br>The People' },
    size: 'square',
  },
  {
    type: 'page',
    title: 'Contact',
    description: { __html: 'Let&apos;s<br>Connect' },
    size: 'square',
  },
  {
    type: 'page',
    title: 'Blog',
    description: { __html: 'The<br>Reservoir' },
    size: 'small',
  },
];
