import React, { useState } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import MovieDetails from './MovieDetails';


function SideBar() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    const handleSearch = (results) => {
        setMovies(results);
        setSelectedMovie(null); // Clear selected movie when new search is performed
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-4 overflow-y-auto">
                <SearchBar onSearch={handleSearch} />
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            </div>
            <div className="w-1/2 p-4 overflow-y-auto">
                {selectedMovie ? (
                    <MovieDetails movie={selectedMovie} />
                ) : (
                    <p className="text-center text-gray-500 mt-10">Select a movie to see details</p>
                )}
            </div>
        </div>
    );
}

export default SideBar;
