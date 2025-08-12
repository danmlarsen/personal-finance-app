"use client";

import { useEffect } from "react";
import { logout } from "./actions";

export default function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return null;
}
