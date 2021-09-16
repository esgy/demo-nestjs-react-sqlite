describe("ArtistSearch", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Searches for artist", () => {
    const inputTxt = "met";

    cy.get("#searchText").focus().type(inputTxt).should("have.value", inputTxt);

    // .type('{enter}')
    cy.get("#btnSearch").click();

    cy.get(".list-group > :nth-child(2)").should("contain", "Hermeto Pascoal");

    cy.get(".list-group > :nth-child(2)").click();

    cy.get(".text-danger").should("contain", "No albums found.");

    cy.get(".mt-4 > .btn").click();

    cy.get(".list-group > :nth-child(3)").click();

    cy.get(".list-group > :nth-child(1)").should("contain", "Garage Inc.");

    cy.get(".mt-4 > .btn").click();
  });

  it("Searches for artist with / inside the name", () => {
    const inputTxt = "ac/dc";

    cy.get("#searchText").focus().type(inputTxt).should("have.value", inputTxt);

    // .type('{enter}')
    cy.get("#btnSearch").click();

    cy.get(".list-group > :nth-child(2)").should("contain", "AC/DC");

    cy.get(".list-group > :nth-child(2)").click();

    cy.get(".list-group > :nth-child(1)").should(
      "contain",
      "For Those About To Rock We Salute You"
    );

    cy.get(".mt-4 > .btn").click();
  });
});
