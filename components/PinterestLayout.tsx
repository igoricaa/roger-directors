import styles from './PinterestLayout.module.css';

export const PinterestLayout = ({ children }: any) => {
  return <div className={styles.pinContainer}>{children}</div>;
};
