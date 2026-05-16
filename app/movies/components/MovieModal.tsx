'use client';

import { MovieDetails } from '../types';

interface MovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-red-500 rounded-full text-neutral-300 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-neutral-800">
            {movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover min-h-[400px]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <span className="text-6xl">🎬</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-100">{movie.Title}</h2>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm capitalize">
                {movie.Type}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.Genre.split(', ').map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>

            {movie.imdbRating !== 'N/A' && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-4xl font-bold text-amber-400">
                  {movie.imdbRating}
                </span>
                <span className="text-neutral-500">/ 10</span>
                <span className="text-neutral-500 text-sm">IMDb</span>
                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                  <span className="text-neutral-600 text-sm ml-2">• {movie.imdbVotes} votos</span>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-neutral-800/50 rounded-lg p-3">
                <p className="text-neutral-500 text-xs mb-1">Año</p>
                <p className="text-neutral-200 font-medium">{movie.Year}</p>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3">
                <p className="text-neutral-500 text-xs mb-1">Duración</p>
                <p className="text-neutral-200 font-medium">{movie.Runtime}</p>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3">
                <p className="text-neutral-500 text-xs mb-1">Clasificación</p>
                <p className="text-neutral-200 font-medium">{movie.Rated}</p>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3">
                <p className="text-neutral-500 text-xs mb-1">País</p>
                <p className="text-neutral-200 font-medium">{movie.Country}</p>
              </div>
            </div>

            {movie.totalSeasons && (
              <div className="bg-neutral-800/50 rounded-lg p-3 mb-5">
                <p className="text-neutral-500 text-xs mb-1">Temporadas</p>
                <p className="text-neutral-200 font-medium">{movie.totalSeasons}</p>
              </div>
            )}

            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className="bg-neutral-800/50 rounded-lg p-3 mb-5">
                <p className="text-neutral-500 text-xs mb-1">Recaudación</p>
                <p className="text-neutral-200 font-medium text-amber-400">{movie.BoxOffice}</p>
              </div>
            )}

            <div className="mb-5">
              <h3 className="text-lg font-semibold text-neutral-200 mb-2">Sinopsis</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500 text-xs mb-1">Director</p>
                <p className="text-neutral-300">{movie.Director}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">Idioma</p>
                <p className="text-neutral-300">{movie.Language}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-neutral-500 text-xs mb-1">Actores</p>
                <p className="text-neutral-300">{movie.Actors}</p>
              </div>
              {movie.Awards !== 'N/A' && (
                <div className="md:col-span-2">
                  <p className="text-neutral-500 text-xs mb-1">Premios</p>
                  <p className="text-amber-400">{movie.Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}