/* eslint-disable no-undef */
let movies; // List of movies from TMDB
let movie; //




describe("Credits page tests", () => {
  before(() => {
    // Get the discover movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/home");
  });

  describe("The Movie Details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
    });
    beforeEach(() => {
      cy.visit(`/movies/${movies[0].id}`);
    });
    it(" displays the movie credits ", () => {
        cy.get("button").contains("CREDITS").click();
        cy.get("h3").contains("Movie Cast");
        cy.get(".MuiCardHeader-root").should("have.length", 29);
        });
    });
  });
