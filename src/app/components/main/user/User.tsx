"use client";

import { useUserStore } from "@/app/store/useStore";
import { ApiResponse, User } from "@/app/types/user";
import Link from "next/link";
import React, { RefObject } from "react";
import Flag from "react-world-flags";
import SkeletonUserCard from "./SkeletonUserCard";
import styles from "./user.module.scss";
import clsx from "clsx";

interface UserListProps {
  userData?: ApiResponse[];
  loaderRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

export default function UserList({
  userData,
  loaderRef,
  isFetchingNextPage,
}: UserListProps) {
  const { addFavorite, removeFavorite, isFavorite, setSelectedUser } =
    useUserStore();

  if (!userData) {
    return (
      <div className={clsx(styles.userList, styles.container)}>
        {[...Array(5)].map((_, i) => (
          <SkeletonUserCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {userData.flatMap((page) =>
        page.results.map((user: User) => {
          const isFav = isFavorite(user.login.uuid);
          return (
            <div key={user.login.uuid} className={styles["user-list__card"]}>
              <div className={styles["user-list__left"]}>
                <img
                  src={user.picture.thumbnail}
                  alt="User"
                  className={styles["user-list__avatar"]}
                />
                <div className={styles["user-list__info"]}>
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
                <span className={styles["user-list__phone"]}>
                  📞 {user.phone}
                </span>
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
              <button
                onClick={() =>
                  isFav ? removeFavorite(user.login.uuid) : addFavorite(user)
                }
                className={clsx(
                  styles["user-list__favorite-btn"],
                  isFav && styles["user-list__favorite-btn--active"]
                )}
                aria-label={
                  isFav ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFav ? "★ Remove" : "☆ Favorite"}
              </button>
              <Flag code={user.nat} className={styles["user-list__flag"]} />
            </div>
          );
        })
      )}

      <div ref={loaderRef} style={{ textAlign: "center", padding: "1rem" }}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
