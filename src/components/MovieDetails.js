import React from 'react';

function MovieDetails({ movie }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.original_title}</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="mb-2"><span className="font-semibold">Release Date:</span> {movie.release_date}</p>
          <p className="mb-2"><span className="font-semibold">Popularity:</span> {movie.popularity}</p>
          <p className="mb-2"><span className="font-semibold">Vote Average:</span> {movie.vote_average}</p>
          <p className="mb-2"><span className="font-semibold">Vote Count:</span> {movie.vote_count}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;