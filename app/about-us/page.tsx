import Image from 'next/image';
import styles from './page.module.css';
import { Accordion } from '@/components/Accordion';

export default function AboutUs() {
  return (
    <main>
      <header className={styles.header}>
        <h1>About Us</h1>
        <div>
          <Image
            src='/roger-directors-about-us-header.webp'
            alt='About Us'
            // placeholder='blur'
            fill
            sizes='100vw'
          />
        </div>
      </header>
      <section className={styles.content}>
        <h2>Lorem ipsum dolor sit amet</h2>
        <section className={styles.innerWrapper}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation.
          </p>
        </section>
        <div className={styles.ctaAnimated}>
          <h2>Let&apos;s start a project together</h2>
          <h2>Let&apos;s start a project together</h2>
          <h2>Let&apos;s start a project together</h2>
          <h2>Let&apos;s start a project together</h2>
          <h2>Let&apos;s start a project together</h2>
        </div>
        <section className={styles.innerWrapper}>
          <Accordion />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </section>
      </section>
    </main>
  );
}
