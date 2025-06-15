"use client";
import React from "react";
import { ApiResponse } from "@/app/types/user";
import styles from "./DownloadButton.module.scss";

type Props = {
  nationality: string;
  gender: string;
  userPages: ApiResponse[];
  currentPageIndex: number;
};

const DownloadButton = ({
  nationality,
  gender,
  userPages,
  currentPageIndex,
}: Props) => {
  const handleApiDownload = () => {
    const totalResults = userPages.reduce(
      (sum, page) => sum + page.results.length,
      0
    );

    const params = new URLSearchParams({
      results: String(totalResults || 1),
      format: "csv",
      dl: "",
    });

    if (nationality) params.append("nat", nationality);
    if (gender) params.append("gender", gender);

    const url = `https://randomuser.me/api/?${params.toString()}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = "users_from_api.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCurrentPageDownload = () => {
    const page = userPages[currentPageIndex];
    if (!page?.results?.length) return;

    const csvHeader = "Name,Email,Phone,Country\n";
    const csvRows = page.results
      .map((user) => {
        const name = `${user.name.first} ${user.name.last}`;
        const email = user.email;
        const phone = user.phone;
        const country = user.location.country;
        return `${name},${email},${phone},${country}`;
      })
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `users_page_${currentPageIndex + 1}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.download}>
      <button
        className={`${styles["download__button"]} ${styles["download__button--api"]}`}
        onClick={handleApiDownload}
      >
        Download All via API
      </button>
      <button
        className={`${styles["download__button"]} ${styles["download__button--current"]}`}
        onClick={handleCurrentPageDownload}
        disabled={!userPages[currentPageIndex]?.results?.length}
      >
        Download Current Page
      </button>
    </div>
  );
};

export default DownloadButton;
