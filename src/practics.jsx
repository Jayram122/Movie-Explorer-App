  import React, { useState } from "react";

const API_KEY = "7767103d";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!input.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${input}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setError(data.Error || "Movie not found.");
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movie list:", error);
      setError("Something went wrong while fetching.");
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to load movie details.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 p-4">
        <h1 className="text-3xl text-white text-center mb-4">
          Movie Explorer
        </h1>

        {!selectedMovie && (
          <>
            <div className="text-center mb-4">
              <input
                type="text"
                placeholder="Search a Movie..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
                onClick={searchMovies}  
              >
                Search
              </button>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-4">
              {movies
                .filter((movie) => movie.Poster !== "N/A")
                .map((movie) => (
                  <div
                    key={movie.imdbID}
                    onClick={() => fetchMovieDetails(movie.imdbID)}
                    className="bg-gray-700 p-4 rounded cursor-pointer"
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-64 object-contain rounded mb-2"

                    />
                    
                    <h2 className="text-white text-xl">{movie.Title}</h2>
                    <p className="text-gray-400">{movie.Year}</p>
                    </div>
                    
                ))}
            </div>
          </>
        )}

        {selectedMovie && (
          <div className="bg-gray-700 p-6 rounded text-white max-w-xl mx-auto">
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              className="w-full mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedMovie.Title}</h2>
            <p><b>Year:</b> {selectedMovie.Year}</p>
            <p><b>Actors:</b> {selectedMovie.Actors}</p>
            <p><b>Released:</b> {selectedMovie.Released}</p>
            <p><b>Genre:</b> {selectedMovie.Genre}</p>
            <p><b>Rated:</b> {selectedMovie.Rated}</p>
            <p><b>Director:</b> {selectedMovie.Director}</p>
            <p><b>Plot:</b> {selectedMovie.Plot}</p>

             <a href={ `https://www.youtube.com/results?search_query=${selectedMovie.Title} trailer`} target="_blank" 
            className=""> Watch </a>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedMovie(null)}>Back
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

//  import React, { useState} from "react";

// const API_KEY = "7767103d";

// function App() {
//   const [input, setInput] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [error, setError] = useState("");
//   const [user, setUser] = useState(localStorage.getItem("user") || null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const searchMovies = async () => {
//     if (!input.trim()) {
//       setError("Please enter a movie name.");
//       setMovies([]);
//       return;
//     }

//     try {
//       const response = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=${API_KEY}`);
//       const data = await response.json();

//       if (data.Response === "True") {
//         setMovies(data.Search);
//         setError("");
//       } else {
//         setError(data.Error || "Movie not found.");
//         setMovies([]);
//       }
//     } catch (error) {
//       console.error("Error fetching movie list:", error);
//       setError("Something went wrong while fetching.");
//       setMovies([]);
//     }
//   };

//   const fetchMovieDetails = async (id) => {
//     try {
//       const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
//       const data = await response.json();
//       setSelectedMovie(data);
//     } catch (error) {
//       console.error("Error fetching movie details:", error);
//       setError("Failed to load movie details.");
//     }
//   };

//   const handleLogin = () => {
//     if (email && password) {
//       localStorage.setItem("user", email);
//       setUser(email);
//       setEmail("");
//       setPassword("");
//       setError("");
//     } else {
//       setError("Please enter email and password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setSelectedMovie(null);
//     setMovies([]);
//     setInput("");
//   };

//   const getYouTubeSearchLink = (title) => {
//     const query = encodeURIComponent(`${title} official trailer`);
//     return `https://www.youtube.com/results?search_query=${query}`;
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="bg-gray-800 p-8 rounded shadow-md w-96">
//           <h1 className="text-3xl font-bold mb-6 text-center">Movie Explorer</h1>
//           <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full mb-3 px-4 py-2 bg-gray-700 rounded"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="w-full mb-3 px-4 py-2 bg-gray-700 rounded"
//           />
//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//           {error && <p className="text-red-400 text-center mt-3">{error}</p>}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-900 text-white p-4">
//       <div>
//         <h1 className="text-3xl font-bold text-center mb-4">Movie Explorer</h1>
//         <div className="max-w-xl mx-auto flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Search for a movie..."
//             className="flex-grow px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
//           />
//           <button
//             onClick={searchMovies}
//             className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </div>
//         {error && <p className="text-red-400 text-center mt-3">{error}</p>}

//         {!selectedMovie && (
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//               {movies.map((movie) => (
//                 <div
//                   key={movie.imdbID}
//                   onClick={() => fetchMovieDetails(movie.imdbID)}
//                   className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
//                 >
//                   <img
//                     src={
//                       movie.Poster !== "N/A"
//                         ? movie.Poster
//                         : "https://placehold.co/300x400?text=No+Image&font=roboto"
//                     }
//                     alt={movie.Title}
//                     className="w-full h-64 object-cover rounded mb-2"
//                   />
//                   <h2 className="text-lg font-semibold">{movie.Title}</h2>
//                   <p className="text-sm text-gray-400">{movie.Year}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedMovie && (
//           <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow-lg mt-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <img
//                 src={
//                   selectedMovie.Poster !== "N/A"
//                     ? selectedMovie.Poster
//                     : "https://placehold.co/300x400?text=No+Image&font=roboto"
//                 }
//                 alt={selectedMovie.Title}
//                 className="w-full md:w-64 object-cover rounded"
//               />
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">{selectedMovie.Title}</h2>
//                 <p><strong>Year:</strong> {selectedMovie.Year}</p>
//                 <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
//                 <p><strong>Released:</strong> {selectedMovie.Released}</p>
//                 <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
//                 <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
//                 <p><strong>Director:</strong> {selectedMovie.Director}</p>
//                 <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
//                 <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
//                 <a
//                   href={getYouTubeSearchLink(selectedMovie.Title)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
//                 >
//                   Watch Trailer
//                 </a>
//                 <button
//                   onClick={() => setSelectedMovie(null)}
//                   className="ml-4 mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Back
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleLogout}
//         className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 self-center mt-6 mb-2"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default App;
