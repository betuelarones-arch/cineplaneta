'use client';

import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <button
      onClick={onClick}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  );
}