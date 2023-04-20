const API_KEY = '9f049e51a7a8f01aa32601739e2e471e';

async function getMovieRecommendation(genre) {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=7&with_genres=${genre}`);
  const data = await response.json();
  const movies = data.results;
  if (movies.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[randomIndex];
  const { title, poster_path } = movie;
  const moviePoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return {
    title,
    moviePoster
  };
}

const form = document.querySelector('form');
const select = document.querySelector('select');
const movieTitle = document.querySelector('#movie-title');
const moviePoster = document.querySelector('#movie-poster');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const genre = select.value;
  const recommendation = await getMovieRecommendation(genre);
  if (recommendation === null) {
    movieTitle.textContent = 'Sorry, no recommendations found for this genre.';
    moviePoster.src = '';
    moviePoster.alt = '';
  } else {
    movieTitle.textContent = recommendation.title;
    moviePoster.src = recommendation.moviePoster;
    moviePoster.alt = recommendation.title;
  }
});
