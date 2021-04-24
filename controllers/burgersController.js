const express = require('express');
const router = express.Router();
 
 
 // Import the model (burger.js) to use its database functions.
const burgers = require('../models/burger.js');


router.get('/', (req, res) => {
    burgers.selectAll((data) => {
      const burgersObject = {
        burgers: data,
      };
      res.render('index', burgersObject);
    });
});



router.post('/api/burgers', (req, res) => {
  burgers.create(['burger_name'], req.body.burger_name, (result) => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});



router.put('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burgers.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});



router.delete('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  burgers.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});


//Export routes for server.js to use.
module.exports = router;
