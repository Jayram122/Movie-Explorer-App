 import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "7767103d";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
          setError("");
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
         setError("Unable to fetch movie details.",err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-white text-center dark:bg-gray-900 text-black dark:text-white p-6">

        <h1 className="text-red-500 text-xl">{error}</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"> Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
        <p>Loading movie details...</p>
      </div>
    );
  }
    
  return (
    <div className="min-h-screen bg-gray-900 text-center text-white p-6">
      <h1 className="text-3xl text-center mb-4 italic font-bold bg-blue-700 inline-block px-3 py-1 rounded">
        Movie Explorer
      </h1>

      <div className="bg-gray-800 p-4 rounded text-white max-w-xl mx-auto">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{movie.Title}</h2>
        <p><b>Year:</b> {movie.Year}</p>
        <p><b>Actors:</b> {movie.Actors}</p>
        <p><b>Released:</b> {movie.Released}</p>
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Rated:</b> {movie.Rated}</p>
        <p><b>Director:</b> {movie.Director}</p>
        <p><b>Plot:</b> {movie.Plot}</p>

        <a
          href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`}
          target="_blank"
          className="inline-block mt-4 bg-blue-700 text-white px-4 py-2 rounded">
          Watch Trailer
        </a>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 ml-4 bg-blue-600 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
