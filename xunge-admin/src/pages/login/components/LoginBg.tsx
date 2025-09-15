import CornerBottom from "./CornerBottom";
import CornerTop from "./CornerTop";
import styles from "./LoginBg.module.scss";

const LoginBg: React.FC = () => {
  return (
    <div className={styles["login-bg"]}>
      <div className={styles["corner-top-box"]}>
        <CornerTop />
      </div>
      <div className={styles["corner-bottom-box"]}>
        <CornerBottom />
      </div>
      <div className={`${styles.fly} ${styles['bg-fly-circle1']}`}></div>
      <div className={`${styles.fly} ${styles['bg-fly-circle2']}`}></div>
      <div className={`${styles.fly} ${styles['bg-fly-circle3']}`}></div>
      <div className={`${styles.fly} ${styles['bg-fly-circle4']}`}></div>
    </div>
  );
};
export default LoginBg;
