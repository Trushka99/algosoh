import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Страница строка работает корректно", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });
  it("Кнопки не работают, если не заполнено значение", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Переворот строки работает корректно", () => {
    cy.get("input").type("check");
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=circle]").each((el: any, index: number, list: any) => {
      cy.get(list).should("have.length", 5);
      cy.get(el).contains("check".split("")[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        [
          "rgb(210, 82, 225)",
          "rgb(0, 50, 255)",
          "rgb(0, 50, 255)",
          "rgb(0, 50, 255)",
          "rgb(210, 82, 225)",
        ][index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get("[data-testid=circle]").each((el: any, index: number, list: any) => {
      cy.get(list).should("have.length", 5);
      cy.get(el).contains("khecc".split("")[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        [
          "rgb(127, 224, 81)",
          "rgb(210, 82, 225)",
          "rgb(0, 50, 255)",
          "rgb(210, 82, 225)",
          "rgb(127, 224, 81)",
        ][index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(
      (el: string, index: number, list: any) => {
        cy.get(list).should("have.length", 5);
        cy.get(el).contains("kcehc".split("")[index]);
        cy.get(el).should(
          "have.css",
          "border-color",
          [
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
          ][index]
        );
      }
    );
  });
});
