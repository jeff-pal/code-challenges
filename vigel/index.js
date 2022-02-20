const https = require('https');
const fs = require('fs');
let crypto = require('crypto');
const path = 'output.txt';

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '';
  const writeStream = fs.createWriteStream(path); 

  writeStream.on('finish', () => {
    let hash = crypto.createHash('sha1');
    const readStream = fs.createReadStream(path);

    readStream.on('data', chunk => hash.update(chunk));
    readStream.on('end', () => console.log(hash.digest('hex')));
  });

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    data = JSON.parse(data);
    let counter = 0;
    const keys = data.data.split(', ');
    console.log(keys)

    for(let item of keys) {
      writeStream.write(item + '\n');
      if (item === 'age=32') {
        counter++;
      }
    }
    writeStream.end();

  });
});