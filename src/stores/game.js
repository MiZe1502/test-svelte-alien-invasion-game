import { writable } from "svelte/store";

export const isPlaying = writable(false);
export const isDefeated = writable(false);
export const isWinning = writable(false);

export const level = writable(1);
export const livesCount = writable(3);
