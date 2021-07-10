import { promises } from 'fs';
import { toSlug } from './slug';
import { resolve, join } from 'path';

const { readFile, readdir, writeFile } = promises;
const linksDir = resolve(__dirname, '..', 'links');

async function getLinks() {
  const links = Object.values({
    ...(await getLinksFromFiles())
  });
  links.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );
  return links;
}

async function getLinksFromFiles() {
  const files = (await readdir(linksDir)).filter(name =>
    name.endsWith('.json')
  );
  const texts = await Promise.all(
    files.map(name => readFile(join(linksDir, name)))
  );
  const links = texts.map(text => JSON.parse(text));
  return Object.fromEntries(links.map(h => [h.name, h]));
}

async function writeLink(link) {
  const filePath = join(linksDir, `${toSlug(link.name)}.json`);
  const data = JSON.stringify(link, null, 2) + '\n';
  await writeFile(filePath, data);
  return filePath;
}

function getTags(links) {
  return [
    ...links.reduce((acc, cur) => {
      cur.tags.forEach(tag => acc.add(tag));
      return acc;
    }, new Set())
  ].sort((a, b) => (a < b ? -1 : 1));
}

const _getTags = getTags;
export { _getTags as getTags };
const _getLinks = getLinks;
export { _getLinks as getLinks };
const _linksDir = linksDir;
export { _linksDir as linksDir };
const _writeLink = writeLink;
export { _writeLink as writeLink };
