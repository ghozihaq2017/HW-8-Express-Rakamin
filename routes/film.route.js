const express = require('express');
const router = express.Router();
const pool = require('../config/config.js');

// GET ALL FILMS
router.get('/', (req, res) => {
  const sql = `
    SELECT
      *
    FROM
      film
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

// GET FILM DETAIL
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      *
    FROM
      film
    WHERE
      film_id = $1
  `;

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Film Not Found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  });
});

// GET FILM BY CATEGORY
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const sql = `
    SELECT
      *
    FROM
      film
    JOIN
      film_category ON film.film_id = film_category.film_id
    JOIN
      category ON film_category.category_id = category.category_id
    WHERE
      category.name = $1
  `;

  pool.query(sql, [category], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Film By Category Name Not Found' });
      } else {
        res.json(result.rows);
      }
    }
  });
});

module.exports = router;
