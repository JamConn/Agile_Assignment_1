import React from "react";
import { useParams } from 'react-router-dom';
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import PersonDetails from "../components/personDetails";
import TemplatePersonPage from "../components/templatePersonPage";
import Spinner from '../components/spinner'


const PersonDetailsPage = (props) => {
    const { id } = useParams();

    const { data: person, error, isLoading, isError } = useQuery(
        ["person", { id: id }],
        getPerson
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {person ? (
                <>
                    <TemplatePersonPage person={person}>
                        <PersonDetails person={person} />
                    </TemplatePersonPage>

                </>
            ) : (
                <p>Waiting for details</p>
            )}
        </>
    );
};

export default PersonDetailsPage;