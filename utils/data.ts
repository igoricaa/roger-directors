import { PageCard, Route } from './types';

export const pagesCards: PageCard[] = [
  {
    type: 'page',
    title: 'About Us',
    description: {
      __html:
        'Digital<br>Dreams.<br>Analog<br>Hearts.<br>Integrated<br>Futures.',
    },
    buttonText: 'About Us',
    size: 'medium',
  },
  {
    type: 'page',
    title: 'Meet the Team',
    description: { __html: 'Meet<br>The People' },
    buttonText: 'Roger Team',
    size: 'square',
  },
  {
    type: 'page',
    title: 'Contact',
    description: { __html: 'Let&apos;s<br>Connect' },
    buttonText: 'Contact',
    size: 'square',
  },
  {
    type: 'page',
    title: 'The Reservoir',
    description: { __html: 'The<br>Reservoir' },
    buttonText: 'See More',
    size: 'small',
  },
];

export const routes: Route[] = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Meet the team', path: '/meet-the-team' },
  { name: 'The Reservoir', path: '/the-reservoir' },
  { name: 'Contact', path: '/contact' },
];
