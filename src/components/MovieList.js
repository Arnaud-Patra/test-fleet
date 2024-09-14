import React from 'react';

// Helper function to extract the year from the date string
function extractYear(dateString) {
    return dateString.split('-')[0];
}

function MovieList({ movies, isSearching, hasSearched, onSelectMovie}) {
    if (!hasSearched) {
        return null; // Don't show anything before the first search
    }

    if (isSearching) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Searching for movies...</p>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No movies found.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-4">
            {movies.map((movie) => (
                <li key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <button
                        onClick={() => onSelectMovie(movie)}
                        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <div className="flex">
                            {movie.poster_path && (
                                <img 
                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-24 h-36 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                                <p className="text-sm text-gray-600">{extractYear(movie.release_date)}</p>
                                <p className="text-sm mt-2 line-clamp-2">{movie.overview}</p>
                            </div>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default MovieList;