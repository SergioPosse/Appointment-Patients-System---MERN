const { Router } = require('express');
const router = Router();
const { getTurns,
     createTurn,
      getTurn,
       deleteTurn,
        editTurn } = require('../controllers/turnController');

router.route('/')
    .get(getTurns)

router.route('/new')
    .post(createTurn)

router.route('/:id')
    .get(getTurn)
    .delete(deleteTurn)
    .put(editTurn)

module.exports = router;