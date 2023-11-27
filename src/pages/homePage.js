import React, { useState, lazy, Suspense } from "react";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
const AddToFavoritesIcon = lazy(() => import("../components/cardIcons/addToFavorites"));
const Spinner = lazy(() => import("../components/spinner"));
const PageTemplate = lazy(() => import("../components/templateMovieListPage"));


const HomePage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discover', getMovies)

  if (isLoading) {
    <Suspense fallback={<h1>Loading</h1>}>
    return <Spinner />
    </Suspense>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))


  return (
    <Suspense fallback={<h1>Loading</h1>}>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />

      }}
    /></Suspense>
  );
};
export default HomePage;