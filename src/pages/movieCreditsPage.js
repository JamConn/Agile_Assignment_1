import React, { useState, lazy, Suspense } from "react";
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
const MovieCreditPageTemplate = lazy(() => import("../components/movieCreditPageTemplate"));
const Spinner = lazy(() => import("../components/spinner"));

const MovieCreditsPage = (props) => {
    const { id } = useParams();

    const { data, error, isLoading, isError } = useQuery(
        ["movie", { id: id }, "credits"],
        getMovieCredits
    );

    if (isLoading) {
        <Suspense fallback={<h1>Loading</h1>}>
        return <Spinner />;
        </Suspense>
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            <Suspense fallback={<h1>Loading</h1>}>
            <MovieCreditPageTemplate credits={data}
                  title="Movie Credits"></MovieCreditPageTemplate>
            </Suspense>
        </>

    );
};

export default MovieCreditsPage;