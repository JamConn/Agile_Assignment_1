import React from "react";
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import MovieCreditPageTemplate from "../components/movieCreditPageTemplate"
import Spinner from '../components/spinner'

const MovieCreditsPage = (props) => {
    const { id } = useParams();

    const { data, error, isLoading, isError } = useQuery(
        ["movie", { id: id }, "credits"],
        getMovieCredits
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            <MovieCreditPageTemplate credits={data}
                  title="Movie Credits"></MovieCreditPageTemplate>
        </>
    );
};

export default MovieCreditsPage;