"use client";

import { cookies } from "next/headers";

interface User {
  username: string;
  password: string;
}

// Usuario predefinido
const PREDEFINED_USER: User = {
  username: "admin",
  password: "11112024",
};

export const auth = {
  login: (username: string, password: string): boolean => {
    if (
      username === PREDEFINED_USER.username &&
      password === PREDEFINED_USER.password
    ) {
      document.cookie = `auth=${JSON.stringify({ isLoggedIn: true })}; path=/`;
      return true;
    }
    return false;
  },

  logout: (): void => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  },

  isAuthenticated: (): boolean => {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth=")
    );
    if (authCookie) {
      const authData = JSON.parse(authCookie.split("=")[1]);
      return authData.isLoggedIn === true;
    }
    return false;
  },
};
