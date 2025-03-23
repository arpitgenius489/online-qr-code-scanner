const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route for handling 404 errors
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
