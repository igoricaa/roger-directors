'use client';

import { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  async function onSubmit(formData: FormData) {
    debugger;
    await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: formData.email,
      }),
    });

    reset();
  }

  return (
    <div className={styles.contactWrapper}>
      <p>
        Let&apos;s work together and create something beautiful.
        <br />
        {!isDesktop && <br />}
        Give us a call or send us an e-mail.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
        <label htmlFor='email'>Your email</label>
        <input
          {...register('email', {
            required: { value: true, message: 'Required field' },
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email address',
            },
          })}
          className={errors.email ? styles.error : ''}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
