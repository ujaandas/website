// Backfills missing `cover` and `author` fields on src/content/reads/*.yaml.
//
// Run this manually whenever you add a book without a cover/author -
// it's NOT wired into `pnpm build`, on purpose: it hits Open Library's API
// and downloads an image per missing entry, which is slow and (depending on
// your network) sometimes blocked entirely. Run it once, somewhere with a
// clean connection, then commit the results like any other file change.
// Already-resolved entries are skipped, so this is always fast to re-run.
//
//   node scripts/fetch-book-covers.mjs

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const READS_DIR = new URL("../src/content/reads/", import.meta.url);
const COVERS_DIR = new URL("../public/images/reads/", import.meta.url);

function parseYaml(text) {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const idx = line.indexOf(":");
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      return [key, value];
    });
}

function serializeYaml(entries) {
  return (
    entries
      .map(([key, value]) => {
        const needsQuotes = value.includes(":") || /^['"]/.test(value);
        return `${key}: ${needsQuotes ? JSON.stringify(value) : value}`;
      })
      .join("\n") + "\n"
  );
}

async function fetchMetadata(title, author) {
  const query = encodeURIComponent(`${title} ${author ?? ""}`.trim());
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${query}&limit=1&fields=cover_i,author_name`,
    {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "ujaan.me (ujaandas03@gmail.com)" },
    },
  );
  if (!res.ok) throw new Error(`Open Library returned ${res.status}`);

  const data = await res.json();
  const doc = data.docs?.[0];
  if (!doc) throw new Error("no match found on Open Library");

  return { coverId: doc.cover_i, author: doc.author_name?.join(", ") };
}

async function downloadCover(coverId, slug) {
  const res = await fetch(
    `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
    { signal: AbortSignal.timeout(10000) },
  );
  if (!res.ok) throw new Error(`cover download returned ${res.status}`);

  await mkdir(COVERS_DIR, { recursive: true });
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(new URL(`${slug}.jpg`, COVERS_DIR), buffer);

  return `/images/reads/${slug}.jpg`;
}

async function main() {
  const files = (await readdir(READS_DIR)).filter((f) => f.endsWith(".yaml"));

  for (const file of files) {
    const fileUrl = new URL(file, READS_DIR);
    const entries = parseYaml(await readFile(fileUrl, "utf-8"));
    const map = Object.fromEntries(entries);

    if (map.cover && map.author) {
      continue;
    }

    console.log(`resolving ${file}...`);

    try {
      const { coverId, author } = await fetchMetadata(map.title, map.author);
      let changed = false;

      if (!map.author && author) {
        entries.push(["author", author]);
        changed = true;
      }

      if (!map.cover && coverId) {
        const slug = fileURLToPath(fileUrl).replace(/.*\//, "").replace(/\.yaml$/, "");
        const localPath = await downloadCover(coverId, slug);
        entries.push(["cover", localPath]);
        changed = true;
      }

      if (changed) {
        await writeFile(fileUrl, serializeYaml(entries));
        console.log(`  updated ${file}`);
      } else {
        console.log(`  nothing found for ${file}`);
      }
    } catch (err) {
      console.error(`  failed for ${file}: ${err.message}`);
    }
  }
}

main();
