"use client";

import { useUserStore } from "@/app/store/useStore";
import React from "react";
import Flag from "react-world-flags";

const UserPage = () => {
  const { selectedUser, isFavorite, addFavorite, removeFavorite } =
    useUserStore();

  if (!selectedUser) {
    return (
      <p style={{ padding: "1rem" }}>
        No user data found. Please go back and select a user.
      </p>
    );
  }

  const isFav = isFavorite(selectedUser.login.uuid);

  return (
    <div style={{ padding: "2rem" }}>
      <img src={selectedUser.picture.large} alt="User" />
      <h2>
        {selectedUser.name.first} {selectedUser.name.last}
      </h2>
      <p>Email: {selectedUser.email}</p>
      <p>Gender: {selectedUser.gender}</p>
      <p>Phone: {selectedUser.phone}</p>
      <Flag code={selectedUser.nat} style={{ width: 24, height: 18 }} />

      <p>
        Location: {selectedUser.location.city}, {selectedUser.location.country}
      </p>
      <p>Nationality: {selectedUser.nat}</p>

      <button
        onClick={() =>
          isFav
            ? removeFavorite(selectedUser.login.uuid)
            : addFavorite(selectedUser)
        }
      >
        {isFav ? "★ Remove" : "☆ Favorite"}
      </button>
    </div>
  );
};

export default UserPage;
