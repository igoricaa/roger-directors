'use client';

import {useState } from 'react';
import styles from './TeamMembers.module.css';
import { TeamMember } from './TeamMember';
import { TeamMember as TeamMemberModel } from '@/utils/sanity/fetchData';

export default function TeamMembers({
  teamMembers,
}: {
  teamMembers: TeamMemberModel[];
}) {
  const [active, setActive] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <section className={styles.teamMembers}>
      {teamMembers.map((member, index) => {
        return (
          <TeamMember
            key={member._id}
            member={member}
            index={index}
            toggleBio={toggleBio}
            active={active}
          />
        );
      })}
    </section>
  );
}
