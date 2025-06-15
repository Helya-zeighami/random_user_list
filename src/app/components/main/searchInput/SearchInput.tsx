import React, { FC } from "react";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  nationality: string;
  onChange: (nat: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ nationality, onChange }) => {
  const nationalities = [
    "",
    "AU",
    "BR",
    "CA",
    "CH",
    "DE",
    "DK",
    "ES",
    "FI",
    "FR",
    "GB",
    "IE",
    "IN",
    "IR",
    "MX",
    "NL",
    "NO",
    "NZ",
    "RS",
    "TR",
    "UA",
    "US",
  ];

  return (
    <div className={styles["search"]}>
      <label htmlFor="nationality" className={styles["search__label"]}>
        Nationality:
      </label>
      <select
        id="nationality"
        value={nationality}
        onChange={(e) => onChange(e.target.value)}
        className={styles["search__select"]}
      >
        {nationalities.map((nat) => (
          <option key={nat} value={nat}>
            {nat === "" ? "All" : nat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchInput;
