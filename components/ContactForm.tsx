'use client';

import { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  const handleChange = (value: string) => {
    setError(false);
    setEmail(value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationError =
      !/^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(
        email
      );

    if (validationError) {
      setError(validationError);
    } else {
      console.log(email);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <p>
        Let&apos;s work together and create something beautiful.
        <br />
        {!isDesktop && <br />}
        Give us a call or send us an e-mail.
      </p>
      <form className={styles.contactForm}>
        <label htmlFor='email'>Your email</label>
        <input
          type='email'
          value={email}
          className={error ? styles.error : ''}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}
