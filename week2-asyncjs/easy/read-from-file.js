const fs = require('fs');

// Specify the file path
const filePath = './test.txt';

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Process the file content
  console.log('File content:', data);
});

for(let i=0; i<1000000000000; i++) {

}