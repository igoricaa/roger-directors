import styles from './PageCard.module.css';
import Link from '@/components/Link';

export const PageCard = ({ content, size }: any) => {
  const pageClass = content.type
    ? content.title.replace(/ /g, '').toLowerCase()
    : undefined;

  return (
    <article
      className={[
        styles.card,
        styles.pageCard,
        styles[pageClass],
        styles[size],
      ].join(' ')}
    >
      <h2 dangerouslySetInnerHTML={content.description}></h2>
      <Link href={`/${content.title.replace(/ /g, '-').toLowerCase()}`}>
        {content.title}
      </Link>
    </article>
  );
};
