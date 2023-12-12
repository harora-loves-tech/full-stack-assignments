const fs = require('fs');

// Specify the file path
const filePath = './testwrite.txt';

// Content to be written to the file
const contentToWrite = 'PUSH YOURSELF BECAUSE, NO ONE ELSE IS GOING TO DO IT FOR YOU.';

// Write to the file asynchronously
fs.writeFile(filePath, contentToWrite, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
    return;
  }

  console.log('File has been written successfully.');
});