import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  return (
    <div className={styles.splashScreenContainer}>
      <div className={[styles.splashScreen, styles.active].join(' ')}>
        <h3>Roger Directors</h3>
      </div>
    </div>
  );
};

export default SplashScreen;
