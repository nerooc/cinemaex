const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const [runArgs] = process.argv.slice(2);
const port = runArgs || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
