import React, { FC } from "react";
import styles from "./FilterButton.module.scss";

interface FilterButtonProps {
  gender: string;
  onChange: (gender: string) => void;
}

const FilterButton: FC<FilterButtonProps> = ({ gender, onChange }) => {
  return (
    <div className={styles["filter"]}>
      <label htmlFor="gender" className={styles["filter__label"]}>
        Gender:
      </label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => onChange(e.target.value)}
        className={styles["filter__select"]}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default FilterButton;
