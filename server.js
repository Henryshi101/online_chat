const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./backend/routes');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
