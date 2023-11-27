import React, { lazy, Suspense } from "react";
import { getPopularReleases } from "../api/tmdb-api";

import { useQuery } from 'react-query';

const PageTemplate = lazy(() => import("../components/templateMovieListPage"));
const Spinner = lazy(() => import("../components/spinner"));
const MustWatchIcon = lazy(() => import("../components/cardIcons/mustWatch"));


const PopularMoviesPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('Popular', getPopularReleases)

    if (isLoading) {
        <Suspense fallback={<h1>Loading</h1>}>
        return <Spinner />
        </Suspense>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const popular = data.results;


    const mustWatch = popular.filter(m => m.mustWatch)
    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))


    return (
        <Suspense fallback={<h1>Loading</h1>}>
        <PageTemplate
            title='Popular Movies'
            movies={popular}
            action={(movie) => {
                return <MustWatchIcon movie={movie} />
            }}
        />
        </Suspense>
    );
};
export default PopularMoviesPage;