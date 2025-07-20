  import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "7767103d";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setError("Please enter a movie name.");
        return;
      }

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
        } else {
          setError("Movie not found.");
        }
      } catch (error) {
         setError("Something went wrong.",error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
     <div className="min-h-screen bg-white text-center dark:bg-gray-900 text-black dark:text-white p-6">

      <h1 className="text-3xl text-center mb-4 italic font-bold bg-blue-700 inline-block px-3 py-1 rounded">
        Movie Explorer
      </h1>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies
          .filter((movie) => movie.Poster !== "N/A")
          .map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="bg-gray-800 p-4 rounded cursor-pointer"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-96 object-contain rounded mb-2"
              />
              <h2 className="text-xl">{movie.Title}</h2>
              <p className="text-gray-400">{movie.Year}</p>

          
            </div>
            
          ))}
          
      </div>
      <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"> Back
        </button>
    </div>
  );
}

export default SearchResults;
