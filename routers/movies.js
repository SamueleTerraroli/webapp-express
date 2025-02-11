const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

//roots
router.get('/', movieController.index);
router.get('/:id', movieController.show);

//Aggiungo una nuova recensione
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;
