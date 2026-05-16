'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieDetails } from '../types';
import MovieModal from './MovieModal';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f1def80d';
const BASE_URL = 'https://www.omdbapi.com/';

interface PopularMoviesProps {
  initialMovies: Movie[];
}

export default function PopularMovies({ initialMovies }: PopularMoviesProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-amber-500 rounded-full" />
        <h2 className="text-2xl font-semibold text-neutral-100">Películas Populares</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {initialMovies.map((movie) => (
          <button
            key={movie.imdbID}
            onClick={() => handleMovieClick(movie.imdbID)}
            className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10 text-left w-full"
          >
            <div className="aspect-[2/3] relative overflow-hidden bg-neutral-800">
              {movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="px-3 py-1 bg-amber-500 text-neutral-900 text-xs font-medium rounded-full">
                  Ver detalles
                </span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-neutral-100 font-medium text-sm truncate mb-1 group-hover:text-amber-400 transition-colors">
                {movie.Title}
              </h3>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>{movie.Year}</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full capitalize text-[10px]">
                  {movie.Type}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showModal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}