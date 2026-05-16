import axios from 'axios';
import MovieSearch from './components/MovieSearch';
import HeroCarousel from './components/HeroCarousel';
import PopularMovies from './components/PopularMovies';
import { Movie, MovieDetails } from './types';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f1def80d';
const BASE_URL = 'https://www.omdbapi.com/';

async function getHeroMovies(): Promise<MovieDetails[]> {
  const heroTitles = ['tt4154796', 'tt4154756', 'tt2015381', 'tt3896198', 'tt0468569'];
  const movies: MovieDetails[] = [];

  for (const id of heroTitles) {
    try {
      const response = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, i: id, plot: 'full' },
      });
      if (response.data.Response === 'True') {
        movies.push(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${id}:`, error);
    }
  }
  return movies;
}

async function getPopularMovies(): Promise<Movie[]> {
  const popularQueries = ['action', 'comedy', 'drama', 'thriller', 'horror'];
  const allMovies: Movie[] = [];
  const seenIds = new Set<string>();

  for (const query of popularQueries.slice(0, 3)) {
    try {
      const response = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, s: query, type: 'movie' },
      });
      if (response.data.Search) {
        response.data.Search.forEach((movie: Movie) => {
          if (!seenIds.has(movie.imdbID)) {
            seenIds.add(movie.imdbID);
            allMovies.push(movie);
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching ${query}:`, error);
    }
  }
  return allMovies.slice(0, 20);
}

export default async function MoviesPage() {
  const [heroMovies, popularMovies] = await Promise.all([
    getHeroMovies(),
    getPopularMovies(),
  ]);

  return (
    <div className="bg-neutral-950 min-h-screen">
      <HeroCarousel movies={heroMovies} />
      <PopularMovies initialMovies={popularMovies} />
      <section className="border-t border-neutral-900">
        <MovieSearch />
      </section>
    </div>
  );
}