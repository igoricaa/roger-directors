import styles from './CloseButton.module.css';

export default function CloseButton({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  return (
    <button className={styles.closeFullscreenButton} onClick={onClickHandler}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </button>
  );
}
