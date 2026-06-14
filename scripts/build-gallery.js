#!/usr/bin/env node
/**
 * 扫描 gallery 文件夹，生成 gallery_list.json。
 * 用法：node scripts/build-gallery.js
 * 新增图片后重新运行即可更新列表。
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const galleryDir = path.join(root, 'images', 'gallery');
const dataDir = path.join(root, 'data');
const outFile = path.join(dataDir, 'gallery_list.json');

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(outFile, '[]', 'utf8');
  console.log('Created images/gallery/, data/, and empty data/gallery_list.json');
  process.exit(0);
}

const names = fs.readdirSync(galleryDir)
  .filter(function (n) {
    const ext = path.extname(n).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].indexOf(ext) !== -1;
  })
  .sort(function (a, b) {
    return a.localeCompare(b, undefined, { numeric: true });
  });

const paths = names.map(function (n) { return 'images/gallery/' + n; });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(paths, null, 2), 'utf8');
console.log('data/gallery_list.json updated with ' + paths.length + ' image(s).');
