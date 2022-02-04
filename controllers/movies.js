const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalError = require('../errors/InternalError');

module.exports.getMovies = (req, res, next) => {
  console.info(req.method, req.headers.host);
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(new InternalError(err)));
};

module.exports.createMovies = (req, res, next) => {
  console.info(req.method, req.headers.host);
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переднаны некорректные данные'));
      } else {
        next(new InternalError(err));
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Не найден фильм по переданному id'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Это не ваш фильм'));
      }
      return movie.remove()
        .then((result) => res.send(result));
    })
    .catch((err) => {
      console.info(err);
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalError(err));
      }
    });
};
