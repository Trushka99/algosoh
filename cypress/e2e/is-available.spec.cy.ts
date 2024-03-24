import { testUrl } from "../../src/constants/cypress-const";
describe("Приложение поднимается", () => {
  it("should be available on localhost:3000", () => {
    cy.visit(testUrl);
  });
});

