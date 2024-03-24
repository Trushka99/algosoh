describe("Страница Последовательность Фибоначчи работает корректно", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });
  it("Числа последовательности генерируются корректно", () => {
    const exampleNumber = "3";
    const exampleFibonacci = [0, 1, 1, 2];
    cy.get("input").type(exampleNumber);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();
    cy.wait(5000);
    cy.get("[data-testid=circle]").each((el: string, index) => {
      cy.get(el).contains(exampleFibonacci[index]);
    });
  });
});
//
