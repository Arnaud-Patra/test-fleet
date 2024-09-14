import React from 'react';

function MovieDetails({ movie }) {
  return (
    <div className="h-full w-full p-6 bg-white shadow-md overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.original_title}</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          {movie.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title} 
              className="w-full rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><span className="font-semibold">Release Date:</span> {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-GB') : 'N/A'}</p>
            <p><span className="font-semibold">Popularity:</span> {movie.popularity}</p>
            <p><span className="font-semibold">Vote Average:</span> {movie.vote_count && movie.vote_count > 0 ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'}</p>
            <p><span className="font-semibold">Number of votes:</span> {movie.vote_count}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;