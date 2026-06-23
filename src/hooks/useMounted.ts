"use client";

import { useEffect, useState } from "react";

/**
 * Returns `false` on the server and during the first client render, then
 * `true` after hydration completes.
 *
 * Use this to gate rendering of randomized content (Math.random, particle
 * fields, etc.) so the server-rendered HTML matches the client's first paint
 * exactly — preventing hydration mismatches. The randomized markup only
 * mounts after hydration, on the client.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
