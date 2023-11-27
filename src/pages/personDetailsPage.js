import React, { lazy, Suspense } from "react";
import { useParams } from 'react-router-dom';
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
const Spinner = lazy(() => import("../components/spinner"));
const PersonDetails = lazy(() => import("../components/personDetails"));
const TemplatePersonPage = lazy(() => import("../components/templatePersonPage"));


const PersonDetailsPage = (props) => {
    const { id } = useParams();

    const { data: person, error, isLoading, isError } = useQuery(
        ["person", { id: id }],
        getPerson
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
            {person ? (
                <>
                    <Suspense fallback={<h1>Loading</h1>}>
                    <TemplatePersonPage person={person}>
                        <PersonDetails person={person} />
                    </TemplatePersonPage>
                    </Suspense>

                </>
            ) : (
                <p>Waiting for details</p>
            )}
        </>
    );
};

export default PersonDetailsPage;