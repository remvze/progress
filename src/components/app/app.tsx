import { useState, useEffect } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Container } from '../container';

import styles from './app.module.css';

export function App() {
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [inputYear, setInputYear] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [endYear, setEndYear] = useState(2100);

  useEffect(() => {
    if (birthYear !== undefined) {
      const birthDate = new Date(birthYear, 0, 1);
      const endDate = new Date(birthDate);

      endDate.setFullYear(endDate.getFullYear() + 80);

      setEndYear(endDate.getFullYear());

      const totalDuration = endDate.getTime() - birthDate.getTime();

      const updatePercentage = () => {
        const now = new Date();
        const elapsedTime = now.getTime() - birthDate.getTime();

        let percent = (elapsedTime / totalDuration) * 100;

        percent = Math.max(0, Math.min(percent, 100));

        setPercentage(percent);
      };

      updatePercentage();

      const interval = setInterval(updatePercentage, 100);

      return () => clearInterval(interval);
    }
  }, [birthYear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const year = parseInt(inputYear);

    if (!isNaN(year)) {
      setBirthYear(year);
    }
  };

  return (
    <Container>
      {birthYear === undefined ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="year">Enter your birth year:</label>
          <div className={styles.field}>
            <input
              id="year"
              type="number"
              value={inputYear}
              onChange={e => setInputYear(e.target.value)}
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
            <span className={styles.number}>{percentage.toFixed(8)}%</span> of
            your life <span className={styles.star}>*</span> has passed.
          </p>

          <div className={styles.progressbar}>
            <div className={styles.wrapper}>
              <div
                className={styles.progress}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>

          <div className={styles.numbers}>
            <p>
              <span>000</span> — {birthYear}
            </p>
            <p>
              {endYear} — <span>100</span>
            </p>
          </div>

          <p className={styles.assume}>
            <span>*</span> assuming 80 years.
          </p>
        </>
      )}
    </Container>
  );
}
