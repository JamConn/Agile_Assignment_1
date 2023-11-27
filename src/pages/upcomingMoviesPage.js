import React, { Suspense, lazy } from "react";

import { getUpcomingMovies } from "../api/tmdb-api";

import { useQuery } from 'react-query';

const MustWatchIcon = lazy(() => import("../components/cardIcons/mustWatch"));
const Spinner = lazy(() => import("../components/spinner"));
const PageTemplate = lazy(() => import("../components/templateMovieListPage"));


const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    <Suspense fallback={<h1>Loading</h1>}>
    return <Spinner />
    </Suspense>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const upcoming = data.results;

  const mustWatch = upcoming.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))


  return (
    <Suspense fallback={<h1>Loading</h1>}>
    <PageTemplate
      title='Upcoming Movies'
      movies={upcoming}
      action={(movie) => {
        return <MustWatchIcon movie={movie} />
      }}
    />
    </Suspense>
  );
};
export default UpcomingMoviesPage;