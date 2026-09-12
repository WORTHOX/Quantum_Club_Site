const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const ARCHIVE_DIR = path.resolve(__dirname, '../archive/original_photos');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function optimizeImages() {
  console.log('--- Starting Image Optimization Pipeline ---');
  await ensureDir(ARCHIVE_DIR);

  let totalOriginalBytes = 0;
  let totalNewBytes = 0;
  let count = 0;

  // 1. Optimize classroom-session.jpg
  const classroomSrc = path.join(PUBLIC_DIR, 'classroom-session.jpg');
  if (fs.existsSync(classroomSrc)) {
    const origStat = fs.statSync(classroomSrc);
    totalOriginalBytes += origStat.size;

    const classroomDest = path.join(PUBLIC_DIR, 'classroom-session.webp');
    await sharp(classroomSrc)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(classroomDest);

    const newStat = fs.statSync(classroomDest);
    totalNewBytes += newStat.size;

    // Archive original
    const archiveDest = path.join(ARCHIVE_DIR, 'classroom-session.jpg');
    fs.copyFileSync(classroomSrc, archiveDest);
    fs.unlinkSync(classroomSrc);

    console.log(`✓ classroom-session.jpg: ${(origStat.size / 1024 / 1024).toFixed(2)} MB -> ${(newStat.size / 1024).toFixed(1)} KB (WebP)`);
    count++;
  }

  // 2. Optimize event photos
  const eventsDir = path.join(PUBLIC_DIR, 'assets/events');
  if (fs.existsSync(eventsDir)) {
    const eventFolders = fs.readdirSync(eventsDir);

    for (const folder of eventFolders) {
      const folderPath = path.join(eventsDir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const files = fs.readdirSync(folderPath);
      const photoFiles = files.filter(f => f.match(/^photo-\d+\.(jpe?g|png)$/i));

      if (photoFiles.length > 0) {
        const archiveEventDir = path.join(ARCHIVE_DIR, folder);
        await ensureDir(archiveEventDir);

        for (const file of photoFiles) {
          const srcPath = path.join(folderPath, file);
          const origStat = fs.statSync(srcPath);
          totalOriginalBytes += origStat.size;

          const baseName = path.parse(file).name; // e.g. photo-1

          // 2a. 1200px Retina thumbnail (WebP Q85 with EXIF auto-rotation)
          const thumbDest = path.join(folderPath, `${baseName}.webp`);
          await sharp(srcPath)
            .rotate()
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 85, effort: 6 })
            .toFile(thumbDest);

          // 2b. Full 4K master (WebP Q85 with EXIF auto-rotation)
          const full4kDest = path.join(folderPath, `${baseName}-4k.webp`);
          await sharp(srcPath)
            .rotate()
            .webp({ quality: 85, effort: 6 })
            .toFile(full4kDest);

          const thumbStat = fs.statSync(thumbDest);
          const fullStat = fs.statSync(full4kDest);
          totalNewBytes += (thumbStat.size + fullStat.size);

          // Archive original file
          fs.copyFileSync(srcPath, path.join(archiveEventDir, file));
          fs.unlinkSync(srcPath);

          count++;
        }
        console.log(`✓ Optimized folder ${folder} (${photoFiles.length} photos)`);
      }
    }
  }

  console.log('\n--- Optimization Complete ---');
  console.log(`Processed ${count} image assets.`);
  console.log(`Original total size: ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New total size (both 1200px & 4K WebP combined): ${(totalNewBytes / 1024 / 1024).toFixed(2)} MB`);
  const savings = totalOriginalBytes - totalNewBytes;
  console.log(`Total space saved: ${(savings / 1024 / 1024).toFixed(2)} MB (${((savings / totalOriginalBytes) * 100).toFixed(1)}% reduction)`);
}

optimizeImages().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
