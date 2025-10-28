#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import sharp from 'sharp';

const root = path.resolve(process.cwd());
const targets = [
  'public/images/**/*.{png,jpg,jpeg}',
  'public/images/hover/**/*.{png,jpg,jpeg}',
  'public/mount-fuji/**/*.{png,jpg,jpeg}',
  // root-level images
  'public/*.{png,jpg,jpeg}'
];

const projectFiles = [
  'index.html',
  'src/**/*.{ts,tsx,css,html}',
  'public/**/*.{html,css}'
];

const quality = 82;

function toWebpPath(filePath) {
  return filePath.replace(/\.(png|jpe?g)$/i, '.webp');
}

async function convertOne(file) {
  const out = toWebpPath(file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(file).webp({ quality }).toFile(out);
  return { file, out };
}

async function replaceInFiles(replacements) {
  const files = await fg(projectFiles, { cwd: root, dot: true, absolute: true });
  for (const f of files) {
    let content = await fs.readFile(f, 'utf8');
    let changed = false;
    for (const { file, out } of replacements) {
      const relOld = file.replace(/\\/g, '/').replace(root.replace(/\\/g, '/') + '/', '');
      const relNew = out.replace(/\\/g, '/').replace(root.replace(/\\/g, '/') + '/', '');
      const oldPath = relOld;
      const newPath = relNew;
      if (content.includes(oldPath)) {
        const re = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(re, newPath);
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(f, content, 'utf8');
    }
  }
}

async function removeOriginals(replacements) {
  for (const { file } of replacements) {
    try {
      await fs.unlink(file);
    } catch {}
  }
}

async function run() {
  const files = await fg(targets, { cwd: root, absolute: true });
  if (files.length === 0) {
    console.log('No PNG/JPG images found to convert.');
    return;
  }
  console.log(`Converting ${files.length} images to WebP...`);
  const results = [];
  for (const f of files) {
    const res = await convertOne(f);
    results.push(res);
    console.log('✔', path.relative(root, res.out));
  }
  console.log('Updating references in project files...');
  await replaceInFiles(results);
  console.log('Removing original files...');
  await removeOriginals(results);
  console.log('Done.');
}

run().catch((e) => {
  console.error('convert-images error:', e);
  process.exit(1);
});


