"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // Adjust path as needed

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
