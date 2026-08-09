#!/usr/bin/env node
/**
 * 扫描 gallery 文件夹，生成缩略图和 gallery_list.json。
 * 用法：node scripts/build-gallery.js
 * 新增图片后重新运行即可更新列表。
 */

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const galleryDir = path.join(root, 'images', 'gallery');
const thumbsDir = path.join(galleryDir, 'thumbs');
const dataDir = path.join(root, 'data');
const outFile = path.join(dataDir, 'gallery_list.json');
const thumbMaxSize = 800;
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(outFile, '[]', 'utf8');
  console.log('Created images/gallery/, data/, and empty data/gallery_list.json');
  process.exit(0);
}

const hasSips = childProcess.spawnSync('sips', ['--version'], { stdio: 'ignore' }).status === 0;
if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

function shouldBuildThumb(srcFile, thumbFile) {
  if (!fs.existsSync(thumbFile)) return true;
  return fs.statSync(srcFile).mtimeMs > fs.statSync(thumbFile).mtimeMs;
}

function buildThumb(srcFile, thumbFile) {
  if (!hasSips) return false;
  const result = childProcess.spawnSync('sips', ['-Z', String(thumbMaxSize), srcFile, '--out', thumbFile], {
    stdio: 'ignore'
  });
  return result.status === 0;
}

const names = fs.readdirSync(galleryDir)
  .filter(function (n) {
    const fullPath = path.join(galleryDir, n);
    if (!fs.statSync(fullPath).isFile()) return false;
    const ext = path.extname(n).toLowerCase();
    return imageExts.indexOf(ext) !== -1;
  })
  .sort(function (a, b) {
    return a.localeCompare(b, undefined, { numeric: true });
  });

const entries = names.map(function (n) {
  const srcFile = path.join(galleryDir, n);
  const thumbFile = path.join(thumbsDir, n);
  const srcPath = 'images/gallery/' + n;
  const thumbPath = 'images/gallery/thumbs/' + n;
  let thumbReady = fs.existsSync(thumbFile);

  if (shouldBuildThumb(srcFile, thumbFile)) {
    thumbReady = buildThumb(srcFile, thumbFile);
  }

  return {
    src: srcPath,
    thumb: thumbReady ? thumbPath : srcPath
  };
});

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(entries, null, 2), 'utf8');
console.log('data/gallery_list.json updated with ' + entries.length + ' image(s).');
if (!hasSips) {
  console.warn('sips was not found; gallery thumbnails fall back to original images.');
}
