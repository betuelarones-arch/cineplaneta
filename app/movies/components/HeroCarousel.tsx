'use client';

import { useState, useEffect } from 'react';
import { Movie, MovieDetails } from '../types';
import MovieModal from './MovieModal';

interface HeroCarouselProps {
  movies: MovieDetails[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const current = movies[currentIndex];

  return (
    <div className="relative h-[75vh] min-h-[550px] overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {movie.Poster !== 'N/A' && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950 z-10" />

      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          {current && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {current.Type === 'series' ? 'Serie' : 'Película'}
                </span>
                <span className="text-neutral-300 text-sm">{current.Year}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-300 text-sm">{current.Runtime}</span>
                {current.totalSeasons && (
                  <>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-300 text-sm">{current.totalSeasons} temporadas</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {current.Title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {current.Genre.split(', ').slice(0, 4).map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-neutral-200 rounded-full text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-neutral-300 text-lg mb-6 line-clamp-3 drop-shadow-md">
                {current.Plot}
              </p>
              <div className="flex items-center gap-6">
                {current.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold text-amber-400 drop-shadow-lg">{current.imdbRating}</span>
                    <div className="flex flex-col">
                      <span className="text-neutral-400 text-xs">IMDb</span>
                      <span className="text-neutral-500 text-xs">{current.imdbVotes} votos</span>
                    </div>
                  </div>
                )}
                {current.Metascore && current.Metascore !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-400 drop-shadow-lg">{current.Metascore}</span>
                    <span className="text-neutral-400 text-xs">Metacritic</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-amber-400 w-16' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % movies.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
      >
        →
      </button>
    </div>
  );
}