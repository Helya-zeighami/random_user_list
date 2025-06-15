import styles from "./user.module.scss";
import React from "react";

const SkeletonUserCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div>
        <div className={styles.skeletonCard__avatar}></div>
        <div
          className={`${styles.skeletonCard__block} ${styles.skeletonCard__textLine}`}
        ></div>
        <div
          className={`${styles.skeletonCard__block} ${styles.skeletonCard__textLine}`}
        ></div>
        <div
          className={`${styles.skeletonCard__block} ${styles.skeletonCard__textLong}`}
        ></div>
        <div
          className={`${styles.skeletonCard__block} ${styles.skeletonCard__textLine}`}
        ></div>
        <div
          className={`${styles.skeletonCard__block} ${styles.skeletonCard__textLong}`}
        ></div>
      </div>
      <div className={styles.skeletonCard__buttonPlaceholder}></div>
    </div>
  );
};

export default SkeletonUserCard;
