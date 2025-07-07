"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/app/types/user";
import { UserHttp } from "@/app/http/user";
import { UserKey } from "@/app/utils/queryKeys";
import UserList from "@/app/components/main/user/User";
import SearchInput from "@/app/components/main/searchInput/SearchInput";
import FilterButton from "@/app/components/main/filterButton/FilterButton";
import DownloadButton from "@/app/components/main/downloadButton/DownloadButton";
import { useRouter } from "next/navigation";
import styles from "@/app/components/main/user/user.module.scss";

const MainModule = () => {
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const router = useRouter();
  const {
    data: userData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ApiResponse, Error>({
    queryKey: [UserKey, nationality, gender],
    queryFn: ({ pageParam }: { pageParam?: unknown }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return UserHttp.fetchUsers({
        page,
        results: 20,
        nat: nationality || undefined,
        gender: gender,
      });
    },
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
        setCurrentPageIndex((prev) => prev + 1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === "error") return <p>Error loading users.</p>;

  return (
    <div className={styles.container}>
      <SearchInput nationality={nationality} onChange={setNationality} />
      <FilterButton gender={gender} onChange={setGender} />
      <button
        className={styles["user-list__favorite-btn"]}
        onClick={() => router.push("/favorites")}
      >
        Favorites Page
      </button>
      <DownloadButton
        nationality={nationality}
        gender={gender}
        userPages={userData?.pages ?? []}
        currentPageIndex={currentPageIndex}
      />
      {/* <CopyButton value="https://mantine.dev">
        {({ copied, copy }) => (
          <Button color={copied ? "teal" : "blue"} onClick={copy}>
            {copied ? "Copied url" : "Copy url"}
          </Button>
        )}
      </CopyButton> */}
      <UserList
        userData={userData?.pages}
        loaderRef={loaderRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default MainModule;
