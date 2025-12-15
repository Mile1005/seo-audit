/**
 * Canonical className helper.
 *
 * This file exists to provide a stable import path (`@/lib/cn`) across the
 * redesign phases, while reusing the existing implementation in `lib/utils.ts`.
 */

import type { ClassValue } from "clsx";

export type { ClassValue };
export { cn } from "./utils";
