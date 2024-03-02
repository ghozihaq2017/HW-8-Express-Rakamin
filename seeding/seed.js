const fs = require('fs');
const pool = require('../config/config.js');

const sqlData = fs.readFileSync('./seeding/seed.sql', 'UTF-8');

pool.query(sqlData, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data inserted successfully....');
  }
});
