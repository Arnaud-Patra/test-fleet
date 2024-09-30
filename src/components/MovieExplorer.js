import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import MovieDetails from './MovieDetails';


function MovieExplorer() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = (results, isLoading, hasSearched) => {
        setMovies(results);
        setIsSearching(isLoading);
        setHasSearched(hasSearched);
        setSelectedMovie(null); // Clear selected movie when new search is performed
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-screen w-full`}>
            <div className={`
                ${isMobile ? 'h-1/3' : 'w-1/4'}
                ${!isMobile && 'min-w-[290px]'}
                p-4 overflow-y-auto
            `}>
                <SearchBar onSearch={handleSearch} />
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} isSearching={isSearching} hasSearched={hasSearched}/>
            </div>
            <div className={`${isMobile ? 'h-2/3' : 'w-3/4'} p-4 overflow-y-auto`}>
                {selectedMovie ? (
                    <div className="border border-gray-300 rounded-lg p-4">
                        <MovieDetails movie={selectedMovie} />
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">Select a movie to see details</p>
                )}
            </div>
        </div>
    );
}

export default MovieExplorer;
