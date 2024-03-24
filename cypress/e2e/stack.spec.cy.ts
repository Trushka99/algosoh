import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

import {
  addButton,
  deleteButton,
  clearButton,
  defaultState,
  changingState,
} from "../../src/constants/cypress-const";
describe("Страница Стэк работает корректно", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });
  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").should("be.empty");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });
  it("Добавление элемента выполняется корректно", () => {
    cy.get("input").type("44");
    cy.get(addButton).should("be.enabled");
    cy.get(addButton).click();
    cy.get(addButton)
      .should("have.attr", "class")
      .then((className) => expect(className).contains("loader"));
    cy.get("[data-testid=circle]")
      .should("have.attr", "class")
      .then((className) => expect(className).contains(changingState));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]")
      .should("have.attr", "class")
      .then((className) => expect(className).contains(defaultState));
    cy.get("[data-testid=circle]").should("have.text", "44");
  });
  it("Удаление элемента выполняется корректно", () => {
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.wait(DELAY_IN_MS);
    cy.get(deleteButton).click();
    cy.get(deleteButton)
      .should("have.attr", "class")
      .then((className) => expect(className).contains("loader"));
    cy.get("[data-testid=circle]")
      .should("have.attr", "class")
      .then((className) => expect(className).contains(changingState));
    cy.wait(400);

    cy.get("li").should((list) => {
      // should have found 3 elements
      expect(list).to.have.length(0);
    });
  });
  it("Очистка стека выполняется корректно", () => {
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get("input").type("43");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();

    cy.wait(DELAY_IN_MS);
    cy.get(clearButton).click();

    cy.get("li").should((list) => {
      // should have found 3 elements
      expect(list).to.have.length(0);
    });
  });
});
