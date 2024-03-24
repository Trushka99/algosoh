import { testUrl } from "../../src/constants/cypress-const";

describe("Routing правильно работает", function () {
  before(function () {
    cy.visit(testUrl);
  });

  it("Открывет страницу Строка", function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it("Открывает страницу Последовательность Фибоначчи", function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("Открывает страницу Сортировка", function () {
    cy.visit(`${testUrl}/sorting`);
  });

  it("Открывает страницу Стэк", function () {
    cy.visit(`${testUrl}/stack`);
  });

  it("Открывает страницу Очередь", function () {
    cy.visit(`${testUrl}/queue`);
  });

  it("Открывает страницу Список", function () {
    cy.visit(`${testUrl}/list`);
  });
});
