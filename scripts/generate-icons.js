import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b, innerShape = 'circle') {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw Image Data (with filter byte 0 at start of each scanline)
  const rawData = Buffer.alloc(height * (1 + width * 4));
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.38;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background dark slate (#0f172a)
      let pr = 15;
      let pg = 23;
      let pb = 42;
      let pa = 255;

      // Center Android Green circle / symbol
      if (dist < radius) {
        if (dy < 0 && dist < radius * 0.8) {
          // Android green head
          pr = 61;
          pg = 220;
          pb = 132;
        } else if (dy >= 0 && Math.abs(dx) < radius * 0.65 && dy < radius * 0.8) {
          // Magisk shield amber/red
          pr = 245;
          pg = 158;
          pb = 11;
        }
      }

      rawData[pxOffset] = pr;
      rawData[pxOffset + 1] = pg;
      rawData[pxOffset + 2] = pb;
      rawData[pxOffset + 3] = pa;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate files
const pwa192 = createPNG(192, 192, 61, 220, 132);
fs.writeFileSync('public/pwa-192x192.png', pwa192);

const pwa512 = createPNG(512, 512, 61, 220, 132);
fs.writeFileSync('public/pwa-512x512.png', pwa512);
fs.writeFileSync('public/pwa-maskable-512x512.png', pwa512);
fs.writeFileSync('public/apple-touch-icon.png', createPNG(180, 180, 61, 220, 132));

console.log('Generated all PWA png icons successfully');
