import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  circle,
  defaultColor,
  changingColor,
  modifiedColor,
} from "../../src/constants/cypress-const";
describe("Страница строка работает корректно", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/recursion`);
  });
  it("Кнопки не работают, если не заполнено значение", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Переворот строки работает корректно", () => {
    cy.get("input").type("check");
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(circle).each((el: any, index: number, list: any) => {
      cy.get(list).should("have.length", 5);
      cy.get(el).contains("check".split("")[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        [
          changingColor,
          defaultColor,
          defaultColor,
          defaultColor,
          changingColor,
        ][index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).each((el: any, index: number, list: any) => {
      cy.get(list).should("have.length", 5);
      cy.get(el).contains("khecc".split("")[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        [
          modifiedColor,
          changingColor,
          defaultColor,
          changingColor,
          modifiedColor,
        ][index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).each((el: string, index: number, list: any) => {
      cy.get(list).should("have.length", 5);
      cy.get(el).contains("kcehc".split("")[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        [
          modifiedColor,
          modifiedColor,
          modifiedColor,
          modifiedColor,
          modifiedColor,
        ][index]
      );
    });
  });
});
