/* eslint-disable no-undef */
let person;
const personId = 192; 


  describe("The Movie Details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((personDetails) => {
          person = personDetails;
        });
    });
    beforeEach(() => {
      cy.visit(`/person/${personId}`);
    });
    it(" displays the persons details ", () => {
      cy.get("h3").contains(person.name);
      cy.get("h3").contains("Biography");
      cy.get("h6").next().contains(person.biography);

        });
    });
