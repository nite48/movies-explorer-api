const router = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { createMoviesValidator, deleteMoviesValidator } = require('../middlewares/celebrate');

router.get('/', getMovies);
router.post('/', createMoviesValidator, createMovies);

router.delete('/:movieId', deleteMoviesValidator, deleteMovies);
module.exports = router;
