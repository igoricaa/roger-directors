'use client';

import { useState } from 'react';

import styles from './Accordions.module.css';
import AccordionItem from './AccordionItem';

const services = [
  {
    title: 'Analogue',
    description: {
      __html:
        'Analogue is the grit of being. The essence of things. Life in its rawest state. Let&apos;s etch your brand into the membrane of existence. Have it felt beneath the skin … in every bone … and its name on everybody&apos;s lips.',
    },
  },
  {
    title: 'Digital',
    description: {
      __html:
        'In the digital jungle, we&apos;re unleashed to roam, to invent, to mold our strategies as wild and untamed as the platforms they dwell upon. It&apos;s not just about showing up. It&apos;s about blazing trails and being the master of this frontier.',
    },
  },
  {
    title: 'Integration',
    description: {
      __html:
        'Integration isn&apos;t just puzzle solving, it&apos;s an art form. It&apos;s that space where we take all that grit, the spirit, the tech, the bones, and soul and then wrap it all up. We feed it straight back into the jungle from whence it all came and then send anybody that hitches onto it, on a wild and wonderous journey.',
    },
  },
];

export default function Accordions() {
  const [active, setActive] = useState(null);
  const handleToggle = (index: any) =>
    active === index ? setActive(null) : setActive(index);

  return (
    <section className={styles.accordions}>
      {services.map((service, index) => {
        const isActive = active === index ? true : false;

        return (
          <AccordionItem
            service={service}
            index={index}
            isActive={isActive}
            handleToggle={handleToggle}
            key={index}
          />
        );
      })}
    </section>
  );
}
