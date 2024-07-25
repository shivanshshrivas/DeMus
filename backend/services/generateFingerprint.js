const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');

const fpcalcPath = path.resolve(__dirname, '../bin/chromaprint/fpcalc'); // Ensure this is the Linux binary

function generateFingerprint(filePath) {
  return new Promise((resolve, reject) => {
    exec(`${fpcalcPath} -json ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
        return;
      }
      const result = JSON.parse(stdout);
      const hash = crypto.createHash('sha256').update(result.fingerprint).digest();
      const fingerprint = '0x' + hash.toString('hex'); // Convert to bytes32 format
      resolve(fingerprint);
    });
  });
}

module.exports = generateFingerprint;
