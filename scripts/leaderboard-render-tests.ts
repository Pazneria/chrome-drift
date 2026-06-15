import { getLeaderboardTitle, type LeaderboardEntry } from "../src/render/SceneRenderer";

assertEqual(
  getLeaderboardTitle([{ rank: 1, name: "Codex PB", timeMs: 37250 }]),
  "CURRENT PB",
  "single PB entry should use the PB billboard title"
);

assertEqual(
  getLeaderboardTitle([{ rank: 1, name: "Codex ghost", timeMs: 47123 }]),
  "MODEL BENCHMARKS",
  "single non-PB entry should keep the benchmark billboard title"
);

const mixedEntries: LeaderboardEntry[] = [
  { rank: 1, name: "Codex PB", timeMs: 37250 },
  { rank: 2, name: "Codex ghost", timeMs: 47123 }
];
assertEqual(
  getLeaderboardTitle(mixedEntries),
  "MODEL BENCHMARKS",
  "multi-entry leaderboards should keep the benchmark billboard title"
);

console.log("leaderboard render tests passed");

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}
