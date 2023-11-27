import React, { useContext, lazy, Suspense } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
const PageTemplate = lazy(() => import("../components/templateMovieListPage"));
const Spinner = lazy(() => import("../components/spinner"));
const WriteReview = lazy(() => import("../components/cardIcons/writeReview"));
const RemoveFromMustWatch = lazy(() => import("../components/cardIcons/removeFromMustWatch"));

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
        
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    <Suspense fallback={<h1>Loading</h1>}>
    return <Spinner />;
    </Suspense>
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });



  return (
    <Suspense fallback={<h1>Loading</h1>}>
    <PageTemplate
      title="Your Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
    </Suspense>
  );
};

export default MustWatchPage