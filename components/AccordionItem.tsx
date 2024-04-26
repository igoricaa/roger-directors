import { useCallback, useEffect, useState } from 'react';
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

  const buttonTextTimeoutChange = useCallback(
    (buttonTextActive: string, buttonTextInactive: string) => {
      setTimeout(() => {
        setButtonText(isActive ? buttonTextActive : buttonTextInactive);
        setFading(false);
      }, 300);
    },
    [isActive]
  );

  const handleClick = (index: number) => {
    setFading(true);
    buttonTextTimeoutChange('Learn more', 'Minimize');
    handleToggle(index);
  };

  useEffect(() => {
    setFading(true);
    buttonTextTimeoutChange('Minimize', 'Learn more');
  }, [buttonTextTimeoutChange]);

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
