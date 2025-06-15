"use client";

import { useUserStore } from "@/app/store/useStore";
import React from "react";
import styles from "@/app/components/main/user/user.module.scss";
import Flag from "react-world-flags";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FavoritsModule = () => {
  const favorites = useUserStore((state) => state.favorites);
  const { setSelectedUser } = useUserStore();
  const router = useRouter();
  if (favorites.length === 0) {
    return <p>No favorites yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 style={{ padding: "1rem 0" }}>Favorite Users</h2>
      {favorites.map((user) => (
        <div key={user.login.uuid} className={styles["user-list__card"]}>
          <div className={styles["user-list__left"]}>
            <img
              src={user.picture.thumbnail}
              alt="User"
              className={styles["user-list__avatar"]}
            />
            <div
              onClick={() => router.push(`main/user/${user.login.uuid}`)}
              className={styles["user-list__info"]}
            >
              <Link
                href={`main/user/${user.login.uuid}`}
                onClick={() => setSelectedUser(user)}
                className={styles["user-list__name"]}
              >
                {user.name.first} {user.name.last}
              </Link>
              <span className={styles["user-list__username"]}>
                {user.login.username} / {user.gender}
              </span>
            </div>
          </div>

          <div className={styles["user-list__contact"]}>
            <span className={styles["user-list__phone"]}>📞 {user.phone}</span>
            <a
              href={`mailto:${user.email}`}
              className={styles["user-list__email"]}
            >
              {user.email}
            </a>
            <span className={styles["user-list__address"]}>
              {user.location.street.number} {user.location.street.name},{" "}
              {user.location.city}, {user.location.state},{" "}
              {user.location.country}, {user.location.postcode}
            </span>
          </div>

          <Flag code={user.nat} className={styles["user-list__flag"]} />
        </div>
      ))}
    </div>
  );
};

export default FavoritsModule;
