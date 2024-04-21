import Image from 'next/image';
import styles from './page.module.css';
import Accordions from '@/components/Accordions';
import headerImg from '@/public/about-us-header.png';

export default function AboutUs() {
  return (
    <main>
      <header className={styles.header}>
        <h1>About Us</h1>
        <div>
          <Image
            src={headerImg}
            alt='About Us'
            priority={true}
            fill
            sizes='100vw'
          />
        </div>
      </header>
      <section className={styles.content}>
        <section className={styles.innerWrapper}>
          <p>Roger is the brainchild of three industry veterans.</p>
          <p>
            And, just like all children… Roger is still finding its way in the
            world.
          </p>
          <p>
            Yes, okay, we&apos;ve broken one or two things - it&apos;s bound to
            happen when you&apos;re filled with awe, energy, and excitement. But
            we&apos;ve created many things too - and all of it we&apos;re very
            proud of!
          </p>
          <p>
            Although Roger might be young, it&apos;s partners are… let&apos;s
            just say… three mature women who have about four or five decades
            worth of experience between them (depending on what they think their
            age to be on any given day) and who have proven track records in
            creative communication solutions, interactive and web campaigns,
            film and video production, event management, research, insights
            analysis and the development of brand strategies.
          </p>
        </section>
        <div className={styles.ctaAnimated}>
          <h2>Analogue. Digital. Integrated.</h2>
          <h2>Analogue. Digital. Integrated.</h2>
          <h2>Analogue. Digital. Integrated.</h2>
          <h2>Analogue. Digital. Integrated.</h2>
          <h2>Analogue. Digital. Integrated.</h2>
        </div>
        <section className={styles.innerWrapper}>
          <Accordions />
          <p>
            Roger will always be young at heart and will continue finding its
            way in the world - we&apos;re not sure that&apos;s ever going to
            stop, because around us there will always be awe and wonder and
            something worth being excited about.
          </p>
        </section>
      </section>
    </main>
  );
}
