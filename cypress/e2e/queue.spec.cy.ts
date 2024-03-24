import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

import {
  addButton,
  deleteButton,
  clearButton,
  defaultState,
  changingState,
  testUrl,
  circle,
  head,
  tail
} from "../../src/constants/cypress-const";

describe("Страница Очередь работает корректно", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/queue`);
  });
  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").should("be.empty");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
  });
  it("Добавление элемента выполняется корректно", () => {
    cy.get("input").type("kKJ");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get(addButton)
      .should("have.attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });

    cy.get(head).invoke("first").should("have.text", "head");
    cy.get(tail).invoke("first").should("have.text", "tail");

    cy.get("input").should("be.empty");
    cy.get("input").type("kKA");
    cy.get(addButton).click();
    cy.get(addButton)
      .should("have.attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get(circle).then((item: any) => {
      cy.get(item[1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item: any) => {
      cy.get(item[1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });

    cy.get(head).invoke("first").should("have.text", "head");
    cy.get(tail).then((item: any) => {
      cy.get(item[1]).should("have.text", "tail");
    });
  });
  it("Удаление элемента выполняется корректно", () => {
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();

    cy.wait(DELAY_IN_MS);
    cy.get(deleteButton).click();
    cy.get(deleteButton)
      .should("have.attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[0]).should("have.text", "");
    });
    cy.get(head).then((item: any) => {
      cy.get(item[1]).should("have.text", "head");
    });
    cy.get(tail).then((item: any) => {
      cy.get(item[1]).should("have.text", "tail");
    });
  });
  it("Очистка стека выполняется корректно", () => {
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get("input").type("44");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.wait(DELAY_IN_MS);
    cy.get(clearButton).click();
    cy.get(circle).each((list) => {
      expect(list).to.contain("");
    });
  });
});
