const express = require('express');
const router = express.Router();
const pool = require('../config/config.js');

//GET ALL CATEGORY
router.get('/', (req, res) => {
  const sql = `
    SELECT
      *
    FROM
      category
  `;

  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

module.exports = router;
