'use client';

import { useState } from 'react';

import styles from './Accordion.module.css';
import AccordionItem from './AccordionItem';

const services = [
  {
    title: 'Development',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    title: 'Leasing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    title: 'Property Management',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
];

export const Accordion = () => {
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
};
