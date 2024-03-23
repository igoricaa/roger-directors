import Image from 'next/image';
import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
export default function Contact() {
  return (
    <main>
      <header>
        <h1>Contact</h1>
      </header>

      <section className={styles.content}>
        <h2>Roger Directors</h2>
        <div className={styles.contactInfo}>
          <p>
            <a href='https://maps.app.goo.gl/REfJu9xmBv6398qv7'>
              Bulevar Mihaila Pupina 13/37
              <br />
              11070 Belgrade, Serbia
            </a>
          </p>
          <div>
            <p>
              <a href='mailto:info@roger.rs'>info@roger.rs</a>
            </p>
            <p>
              <a href='tel:011043432'>011 043 432</a>
            </p>
          </div>
        </div>

        <ContactForm />

        <div className={styles.googleMapWrapper}>
          <Image
            src='/google-map.webp'
            alt='Roger Directors Location on Google Maps'
            fill
          />
        </div>
        <div className={styles.contactPhotoWrapper}>
          <Image
            src='/roger-directors-about-us-header.webp'
            alt='Roger Directors Contact Photo'
            fill
          />
        </div>
      </section>
    </main>
  );
}
