import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Written into the build output, so /version.json always names the commit of
// the Worker version that serves it.
//
//   NEXT_PUBLIC_BUILD_COMMIT=<sha> node scripts/write-version.mjs packages/client/out
export function writeVersion(commit, directory = "packages/client/out") {
  if (!/^[a-f0-9]{40}$/.test(commit ?? "")) {
    throw new Error("NEXT_PUBLIC_BUILD_COMMIT must be a full lowercase Git commit SHA.");
  }
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, "version.json"), `${JSON.stringify({ commit })}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeVersion(process.env.NEXT_PUBLIC_BUILD_COMMIT, process.argv[2]);
}
