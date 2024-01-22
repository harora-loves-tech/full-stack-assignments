const express = require('express');

// Creating an Express application
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  const num = req.query.num;
  let sum=0;
  for (let i=0; i<=num; i++) {
    sum += i;
  }

  res.send("Sum is : "+ sum);

});

// Define a route for a custom URL
app.get('/example', (req, res) => {
  res.send('This is an example route!');
});

// Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});