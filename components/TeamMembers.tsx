'use client';

import { useState } from 'react';
import styles from './TeamMembers.module.css';
import TeamMember from './TeamMember';
import { TeamMember as TeamMemberMeta } from '@/utils/types';

export default function TeamMembers({
  teamMembers,
}: {
  teamMembers: TeamMemberMeta[];
}) {
  const [active, setActive] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    debugger;
    if (active || active === 0) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  teamMembers.sort((a, b) => a.order - b.order);

  return (
    <section className={styles.teamMembers}>
      {teamMembers.map((teamMember, index) => {
        return (
          <TeamMember
            key={teamMember._id}
            teamMember={teamMember}
            index={index}
            toggleBio={toggleBio}
            active={active}
          />
        );
      })}
    </section>
  );
}
