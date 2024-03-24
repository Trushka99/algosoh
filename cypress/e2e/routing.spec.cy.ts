describe("Routing правильно работает", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("Открывет страницу Строка", function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Открывает страницу Последовательность Фибоначчи", function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Открывает страницу Сортировка", function () {
    cy.visit("http://localhost:3000/sorting");
  });

  it("Открывает страницу Стэк", function () {
    cy.visit("http://localhost:3000/stack");
  });

  it("Открывает страницу Очередь", function () {
    cy.visit("http://localhost:3000/queue");
  });

  it("Открывает страницу Список", function () {
    cy.visit("http://localhost:3000/list");
  });
});
