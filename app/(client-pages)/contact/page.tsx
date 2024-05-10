import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import GoogleMap from '@/components/GoogleMap';

export default function Contact() {
  return (
    <main>
      <header>
        <h1>Contact</h1>
      </header>

      <section className={styles.content}>
        <h2>Roger Directors</h2>
        <div className={styles.contactInfo}>
          <div>
            <p>
              <a href='https://maps.app.goo.gl/REfJu9xmBv6398qv7'>
                Resavska 33.
                <br />
                11000 Belgrade, Serbia
              </a>
            </p>
            <p className={styles.mobile}>
              <a href='mailto:office@roger.rs'>office@roger.rs</a>
            </p>
          </div>
          <div>
            <p className={styles.desktop}>
              <a href='mailto:office@roger.rs'>office@roger.rs</a>
            </p>
            <p>
              <a href='tel:00381604200410'>+381 60 42 00 410</a>
            </p>
            <p>
              <a href='tel:00381641177187'>+381 64 11 77 187</a>
            </p>
          </div>
        </div>

        <ContactForm />
        <GoogleMap />
      </section>
    </main>
  );
}
