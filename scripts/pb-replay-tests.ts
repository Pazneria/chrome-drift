import {
  getAutoplayReplayTimeMs,
  getBillboardEntriesForTrack,
  TRACK_C_CURRENT_PB_MS,
  TRACK_D_CURRENT_PB_MS,
  TRACK_D_DRIVER_TIMES_MS
} from "../src/game/PbReplay";

assertDeepEqual(getBillboardEntriesForTrack("technical-bowl", "Fallback", 12345), [
  { rank: 1, name: "Codex PB", timeMs: TRACK_C_CURRENT_PB_MS }
]);
assertDeepEqual(getBillboardEntriesForTrack("jump-speedcheck", "Fallback", 12345), [
  { rank: 1, name: "Codex PB", timeMs: TRACK_D_CURRENT_PB_MS }
]);
assertDeepEqual(getBillboardEntriesForTrack("test-track-b", "Codex ghost", 47123), [
  { rank: 1, name: "Codex ghost", timeMs: 47123 }
]);

assertEqual(
  getAutoplayReplayTimeMs("technical-bowl", "search-51233", true),
  51233,
  "technical-bowl PB replay should resolve its advertised driver"
);

for (const [driver, expectedMs] of Object.entries(TRACK_D_DRIVER_TIMES_MS)) {
  assertEqual(
    getAutoplayReplayTimeMs("jump-speedcheck", driver, true),
    expectedMs,
    `${driver} should resolve to its jump-speedcheck replay time`
  );
}

assertEqual(
  getAutoplayReplayTimeMs("jump-speedcheck", "search-37250", false),
  null,
  "PB replay time should only be exposed during autoplay"
);
assertEqual(
  getAutoplayReplayTimeMs("jump-speedcheck", "missing-driver", true),
  null,
  "unknown jump-speedcheck drivers should fall back to the normal ghost copy"
);
assertEqual(
  getAutoplayReplayTimeMs("test-track-b", "search-37250", true),
  null,
  "non-PB replay tracks should fall back to the normal ghost copy"
);

console.log("PB replay tests passed");

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function assertDeepEqual<T>(actual: T, expected: T): void {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}
