import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const { id } = useParams();
  const callMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    callMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.large_cover_image} alt={movie.title} />
          <ul>
            <li>Published: {movie.year}</li>
            <li>Rating: {movie.rating}</li>
            <li>Genres: {movie.genres.map((g) => `${g}, `)}</li>
            <li>Downloaded: {movie.download_count}</li>
          </ul>
          <h2>Description</h2>
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
