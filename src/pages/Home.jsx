 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "7767103d";
const defaultMovies = ["Jurassic World Rebirth","Captain America: Brave New World","Mickey 17"];

function Home() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [defaultLoaded, setDefaultLoaded] = useState([]);
  const navigate = useNavigate();

   
  useEffect(() => {
    const fetchDefaults = async () => {
      const promises = defaultMovies.map((title) =>
        fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`).then((res) =>
          res.json()
        )
      );
      const results = await Promise.all(promises);
      const filtered = results.filter((movie) => movie.Poster !== "N/A");
      setDefaultLoaded(filtered);
    };
    fetchDefaults();
  }, []);
 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (input.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      fetch(`https://www.omdbapi.com/?s=${input}&apikey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            setSuggestions(data.Search);
          } else {
            setSuggestions([]);
          }
        })
        .catch((err) => {
          console.log("Suggestion error:", err);
        });
    }, 10);

    return () => clearTimeout(delay);
  }, [input]);

 
  const handleSearch = () => {
    if (input.trim()) {
      navigate(`/search?query=${input}`);
      setSuggestions([]);
    }
  };

  return (
     <div className="min-h-screen bg-white text-center dark:bg-gray-900 text-black dark:text-white p-6">

      <h1 className="text-3xl text-center mb-4 italic font-bold bg-blue-700 inline-block px-3 py-1 rounded">
        Movie Explorer
      </h1>

     
      <div className="text-center mb-6 relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search a Movie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded w-full"
        >
          Search
        </button>
 
        {suggestions.length > 0 && (
          <ul className="absolute bg-gray-800 w-full mt-1 rounded shadow z-10 text-left border border-gray-600 max-h-60 overflow-y-auto">
            {suggestions.map((movie) => (
              <li
                key={movie.imdbID}
                onClick={() => {
                  setInput(movie.Title);
                  setSuggestions([]);
                }}
                className="p-2 hover:bg-gray-700 cursor-pointer"
              >
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <h2 className="text-2xl text-center underline font-bold mb-4">Popular Picks</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {defaultLoaded.map((movie) => (
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

export default Home;
