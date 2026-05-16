'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieDetails } from '../types';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f1def80d';
const BASE_URL = 'https://www.omdbapi.com/';

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            s: debouncedQuery,
          },
        });
        if (response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [debouncedQuery]);

  const handleMovieClick = async (imdbID: string) => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'full',
        },
      });
      setSelectedMovie(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-neutral-100 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar Películas y Series
          </h2>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe el título de una película o serie..."
              className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={() => handleMovieClick(movie.imdbID)}
              />
            ))}
          </div>
        )}

        {query && !loading && movies.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-neutral-400 text-lg">No se encontraron resultados para &quot;{query}&quot;</p>
          </div>
        )}
      </div>

      {showModal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}