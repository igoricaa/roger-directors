'use client';

import { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';
import { useForm } from 'react-hook-form';

type FormData = {
  access_key: string;
  subject: string;
  from_name: string;
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData, null, 2),
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          setIsSuccess(true);
          setMessage(json.message);
          reset();
        } else {
          setIsSuccess(false);
          setMessage(json.message);
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        setMessage('Client Error. Please check the console.log for more info');
        console.log(error);
      });
  };

  return (
    <div className={styles.contactWrapper}>
      <p>
        Let&apos;s work together and create something beautiful.
        <br />
        {!isDesktop && <br />}
        Give us a call or send us an e-mail.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
        <input
          type='hidden'
          value='288b39cc-0062-49e5-b483-39073dfca1a9'
          {...register('access_key')}
        />
        <input
          type='hidden'
          value='Kontakt forma sa roger.rs'
          {...register('subject')}
        />
        <input
          type='hidden'
          value='Kontakt forma roger.rs'
          {...register('from_name')}
        />
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
