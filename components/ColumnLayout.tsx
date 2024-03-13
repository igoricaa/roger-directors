import styles from './ColumnLayout.module.css';

export const ColumnLayout = ({ children }: any) => {
  return <div className={styles.columnContainer}>{children}</div>;
};
