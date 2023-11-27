// import React, { useState, useEffect } from "react";
import React, { lazy, Suspense } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";

import { useQuery } from 'react-query';

const Spinner = lazy(() => import("../components/spinner"));
const MustWatchIcon = lazy(() => import("../components/cardIcons/mustWatch"));
const PageTemplate = lazy(() => import("../components/templateMovieListPage"));


const TopRatedMoviesPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('TopRated', getTopRatedMovies)

    if (isLoading) {
        <Suspense fallback={<h1>Loading</h1>}>
        return <Spinner />
        </Suspense>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const toprated = data.results;

    const mustWatch = toprated.filter(m => m.mustWatch)
    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))


    return (
        <Suspense fallback={<h1>Loading</h1>}>
        <PageTemplate
            title='Top Rated Movies'
            movies={toprated}
            action={(movie) => {
                return <MustWatchIcon movie={movie} />
            }}
        />
        </Suspense>
    );
};
export default TopRatedMoviesPage;