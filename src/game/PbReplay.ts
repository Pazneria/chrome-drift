import type { LeaderboardEntry } from "../render/SceneRenderer";

export const TRACK_C_CURRENT_PB_MS = 51233;
export const TRACK_C_DRIVER_TIMES_MS: Record<string, number> = {
  "search-51233": 51233
};

export const TRACK_D_CURRENT_PB_MS = 37250;
export const TRACK_D_DRIVER_TIMES_MS: Record<string, number> = {
  "search-37250": 37250,
  "search-37275": 37275,
  "search-37283": 37283,
  "search-37425": 37425,
  "search-37525": 37525,
  "search-37825": 37825
};

export function getBillboardEntriesForTrack(
  trackId: string,
  codexGhostName: string,
  codexGhostTimeMs: number
): LeaderboardEntry[] {
  if (trackId === "technical-bowl") {
    return [
      {
        rank: 1,
        name: "Codex PB",
        timeMs: TRACK_C_CURRENT_PB_MS
      }
    ];
  }

  if (trackId === "jump-speedcheck") {
    return [
      {
        rank: 1,
        name: "Codex PB",
        timeMs: TRACK_D_CURRENT_PB_MS
      }
    ];
  }

  return [
    {
      rank: 1,
      name: codexGhostName,
      timeMs: codexGhostTimeMs
    }
  ];
}

export function getAutoplayReplayTimeMs(
  trackId: string,
  driverVariant: string,
  autoplay: boolean
): number | null {
  if (!autoplay) return null;
  if (trackId === "technical-bowl") {
    return TRACK_C_DRIVER_TIMES_MS[driverVariant] ?? null;
  }
  if (trackId === "jump-speedcheck") {
    return TRACK_D_DRIVER_TIMES_MS[driverVariant] ?? null;
  }
  return null;
}
