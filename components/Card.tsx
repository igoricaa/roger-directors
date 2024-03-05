import Image from 'next/image';
import styles from './Card.module.css';
import Link from 'next/link';

export const Card = ({ content, size }: any) => {
  const pageClass = content.type
    ? content.title.replace(/ /g, '').toLowerCase()
    : undefined;

  const pageCard = () => {
    return (
      <div
        className={[
          styles.card,
          styles.pageCard,
          styles[pageClass],
          styles[size],
        ].join(' ')}
      >
        <h2>{content.description}</h2>
        <Link href={content.title.replace(/ /g, '-').toLowerCase()}>
          {content.title}
        </Link>
      </div>
    );
  };

  const projectCard = () => {
    return (
      <div className={[styles.card, styles[size]].join(' ')}>
        <Link href={content.url}>
          <Image src={content.image} alt={content.title} fill />
        </Link>
      </div>
    );
  };

  return content.type === 'page' ? pageCard() : projectCard();
};
