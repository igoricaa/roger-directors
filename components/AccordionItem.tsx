import { useEffect, useState } from 'react';
import styles from './AccordionItem.module.css';

export default function AccordionItem({
  service,
  index,
  isActive,
  handleToggle,
}: {
  service: any;
  index: number;
  isActive: boolean;
  handleToggle: (index: any) => void;
}) {
  const [buttonText, setButtonText] = useState(
    isActive ? 'Minimize' : 'Learn more'
  );
  const [fading, setFading] = useState(false);

  const handleClick = (index: number) => {
    setFading(true);
    setTimeout(() => {
      setButtonText(isActive ? 'Learn more' : 'Minimize');
      setFading(false);
    }, 300);

    handleToggle(index);
  };

  useEffect(() => {
    setFading(true);
    setTimeout(() => {
      setButtonText(isActive ? 'Minimize' : 'Learn more');
      setFading(false);
    }, 300);
  }, [isActive]);

  return (
    <article
      key={index}
      className={[styles.article, isActive ? styles.active : ''].join(' ')}
    >
      <div className={styles.accordion}>
        <div className={styles.accordionTop}>
          <h2>{service.title}</h2>
          <button
            className={styles.accordionButton}
            onClick={() => handleClick(index)}
          >
            <span className={fading ? styles.faded : ''}>{buttonText}</span>
          </button>
        </div>

        <div className={styles.accordionBottom}>
          <p dangerouslySetInnerHTML={service.description}></p>
        </div>
      </div>
    </article>
  );
}
