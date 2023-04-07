const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DB_URI).then(() => {
  console.log('Database connection is successful✅');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port} ✅`);
});
