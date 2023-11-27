/* eslint-disable no-undef */
let movies;
const movieId = 497582; // Enola Holmes movie id




describe("The must watch feature", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies/upcoming");
  });

  describe("Selecting must watch", () => {
    it("selected movie card shows the must watch symbol", () => {
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to must watch']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  });

  describe("The must watch page", () => {
    beforeEach(() => {
      // Select two must watch and navigate to Must watch page
      cy.get("button[aria-label='add to must watch']").eq(1).click();
      cy.get("button").contains("Must Watch").click();
    });
    it("only the tagged movies are listed", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 1);
      cy.get(".MuiCardHeader-content")
        .eq(0)
        .find("p")
        .contains(movies[1].title);
    });
    it("removes deleted movies", () => {
    cy.get("button[aria-label='remove from must watch']").eq(0).click();
    cy.get(".MuiCardHeader-content").should("have.length", 0);
});
  });
});