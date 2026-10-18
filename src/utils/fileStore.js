const fs = require('node:fs');
const path = require('node:path');

// DATA_FILE testlerde izole depolama sağlamak için değiştirilebilir.
const DEFAULT_FILE = path.join(__dirname, '..', 'data', 'gaps.json');

function filePath() {
  return process.env.DATA_FILE
    ? path.resolve(process.env.DATA_FILE)
    : DEFAULT_FILE;
}

function readAll() {
  const target = filePath();
  if (!fs.existsSync(target)) return [];
  const content = fs.readFileSync(target, 'utf8');
  if (!content.trim()) return [];
  const result = JSON.parse(content);
  if (!Array.isArray(result)) {
    throw new Error('Veri dosyası bir JSON dizisi içermelidir.');
  }
  return result;
}

function writeAll(rows) {
  const target = filePath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(rows, null, 2) + '\n', 'utf8');
    fs.renameSync(temporary, target);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}

module.exports = { readAll, writeAll, filePath };
