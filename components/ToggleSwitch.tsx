import styles from './ToggleSwitch.module.css';

export interface ToggleSwitchProps {
  isChecked: boolean;
  handleChange: () => void;
}

export function ToggleSwitch({ isChecked, handleChange }: ToggleSwitchProps) {
  return (
    <label className={styles.switch}>
      <input
        id={styles.toggle}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
