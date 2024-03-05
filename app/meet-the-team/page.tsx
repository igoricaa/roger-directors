'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { TeamMember } from '@/components/TeamMember';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    image: 'team-member-1.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 2,
    name: 'John Doe',
    image: 'team-member-2.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 3,
    name: 'John Doe',
    image: 'team-member-3.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 4,
    name: 'John Doe',
    image: 'team-member-1.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 5,
    name: 'John Doe',
    image: 'team-member-2.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 6,
    name: 'John Doe',
    image: 'team-member-3.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 7,
    name: 'John Doe',
    image: 'team-member-1.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 8,
    name: 'John Doe',
    image: 'team-member-2.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
  {
    id: 9,
    name: 'John Doe',
    image: 'team-member-3.jpg',
    bio: 'JLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in.',
  },
];

export default function MeetTheTeam() {
  const [active, setActive] = useState<number | null>(null);

  const openBio = (index: number) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <main>
      <header>
        <h1>Meet the Team</h1>
      </header>

      <section className={styles.teamMembers}>
        {teamMembers.map((member, index) => {
          return (
            <TeamMember
              key={member.id}
              member={member}
              index={index}
              openBio={openBio}
              active={active}
            />
          );
        })}
      </section>
    </main>
  );
}
