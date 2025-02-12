const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const movieController = require('../controllers/movieController');

//roots
router.get('/', movieController.index);
router.get('/:id', movieController.show);

//Aggiungo una nuova recensione
router.post('/:id/reviews', movieController.storeReview);

//Aggiungo un nuovo film
router.post('/', upload.single('image'), movieController.store)

module.exports = router;
