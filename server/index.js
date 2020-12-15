const express = require('express');
const cors = require('cors');

const app = express();

// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(cors());

// routes regarding authentication
app.use('/auth', require('./routes/auth'));

const [runArgs] = process.argv.slice(2);
const port = runArgs || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
