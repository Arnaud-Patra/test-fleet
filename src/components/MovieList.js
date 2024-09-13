import React from 'react';

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="space-y-4">
            {movies.map((movie) => (
                <li key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <button
                        onClick={() => onSelectMovie(movie)}
                        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <div className="flex">
                            <img 
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : ''} 
                                alt={movie.title}
                                className="w-24 h-36 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                                <p className="text-sm text-gray-600">{movie.release_date}</p>
                            </div>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default MovieList;