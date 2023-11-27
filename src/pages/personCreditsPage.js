import React, { lazy, Suspense } from "react";
import { useParams } from 'react-router-dom';
import { getPersonCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
const PersonCreditsPageTemplate = lazy(() => import("../components/templarePersonCreditsPage"));
const Spinner = lazy(() => import("../components/spinner"));




const PersonCreditsPage = (props) => {
    const { id } = useParams();

    const { data, error, isLoading, isError } = useQuery(
        ["person", { id: id }, "movie_credits"],
        getPersonCredits
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
            <PersonCreditsPageTemplate credits={data}></PersonCreditsPageTemplate>
            </Suspense>

        </>
    );
};

export default PersonCreditsPage;