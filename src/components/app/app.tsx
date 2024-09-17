import { useState, useEffect, useRef } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Container } from '../container';
import styles from './app.module.css';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function App() {
  const [birthDate, setBirthDate] = useLocalStorage<string | undefined>(
    'progress-birth',
    undefined,
  );
  const [inputDate, setInputDate] = useState('');
  const [secondsPassed, setSecondsPassed] = useState(0);
  const filled = useRef(Math.random() * (80 - 30) + 30);

  useEffect(() => {
    if (birthDate !== undefined) {
      const birthDateObj = new Date(birthDate);

      const updateSecondsPassed = () => {
        const now = new Date();
        const elapsedTime = (now.getTime() - birthDateObj.getTime()) / 1000;
        setSecondsPassed(elapsedTime);
      };

      updateSecondsPassed();

      const interval = setInterval(updateSecondsPassed, 1000);

      return () => clearInterval(interval);
    }
  }, [birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      setBirthDate(date.toISOString());
    }
  };

  return (
    <Container>
      {birthDate === undefined ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="birthDate">Enter your birth date:</label>
          <div className={styles.field}>
            <input
              id="birthDate"
              type="date"
              value={inputDate}
              onChange={e => setInputDate(e.target.value)}
            />
            <button type="submit">
              <FaArrowRightLong />
            </button>
          </div>

          <p>Everything is stored locally.</p>
        </form>
      ) : (
        <>
          <p className={styles.percentage}>
            <span className={styles.number}>
              {Math.floor(secondsPassed).toLocaleString()}
            </span>{' '}
            seconds have passed.
          </p>

          <div className={styles.progressbar}>
            <div className={styles.wrapper}>
              <div
                className={styles.progress}
                style={{ width: `${filled.current}%` }}
              />
              <div className={styles.remains} />
            </div>
          </div>

          <p className={styles.left}>
            <span className={styles.number}>???</span> seconds left.
          </p>

          <div className={styles.resetWrapper}>
            <button
              className={styles.reset}
              onClick={() => setBirthDate(undefined)}
            >
              [Reset your birth date]
            </button>
          </div>
        </>
      )}
    </Container>
  );
}
