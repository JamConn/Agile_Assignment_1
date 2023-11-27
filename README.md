# Assignment 1 - ReactJS app.

Name: Jamie Conlon

## Overview.

This is my React Movies assignment 1 for Web App development 2. I am happy with some of the work I have gotten done although I had allowed myself too short a timespan to work on the project and wish I managed to give it more polish. I didnt get to overhaul the UI like I would have wanted and my firebase additions are only basic. Along with this I tried to implement a sort function similar to genre using a persons job, but I ran out of time before bug fixing for this branch.

### Features.

-Basic login functionality using firebase auth through google for login and logout.
-Added Recommendations to movie Details page
-Added credits button to link to a movies credits
-Credits page links to individual people
-Peoples page links to their movie credits page
-Popular page created
-Top Rated Page created
-Finished Watch later button f

## Setup requirements.

npm install firebase

## API endpoints.

-getTopRatedMovies - /movie/top_rated
-getMovieRecommendations - movie/${id}/recommendations
-getMovieCredits - /movie/${id}/credits
-getPerson - /person/${id}
-getPersonCredits - /person/${id}/movie_credits
-getPopularReleases - /movie/popular
-getJobs - /configuration/jobs  (Never Used)

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]
Top Rated movies Page - /movies/toprated
Popular movies Page - /movies/popular
Must Watch movies page - /movies/mustwatch
Specific movies credits (cast) -  /movies/:id/credits
Specific person details - /person/:id
Specific persons credits -  /person/:id/credits

Sign in page switched to route - / and home page swapped to /home

## Independent learning (If relevant).

https://firebase.google.com/docs/web/setup - Used this in order to research basic firebase setup.