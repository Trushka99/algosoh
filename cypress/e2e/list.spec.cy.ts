import {
  addInHeadBut,
  addInTailBut,
  deleteHeadBut,
  deleteTailBut,
  addByIndBut,
  deleteByIndBut,
  defaultState,
  changingState,
  modifiedState,
  testUrl,
  circle,
  smallCircle,
  head,
  tail
} from "../../src/constants/cypress-const";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

export const putCircleTextToArray = (array: string[]) => {
  cy.get(circle).then((item: any) => {
    cy.get(item)
      .children()
      .each((child) => {
        array.push(child.text());
      });
  });
};

describe("Страница Лист работает корректно", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/list`);
  });
  it("Кнопки не работают, если не заполнено значение", () => {
    cy.get("input").should("be.empty");
    cy.get(addInHeadBut).should("be.disabled");
    cy.get(addInTailBut).should("be.disabled");
    cy.get(addByIndBut).should("be.disabled");
    cy.get(deleteByIndBut).should("be.disabled");
  });
  it("Рендер оригинального списка", () => {
    cy.get("li").should("have.length", 4);

    cy.get(circle).each((el: any) => {
      cy.get(el)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });

    cy.get(head).invoke("first").should("have.text", "head");
    cy.get(tail).invoke("last").should("have.text", "tail");
  });
  it("Добавление элемента в HEAD", () => {
    cy.get("input").invoke("first").type("valu");
    cy.get(addInHeadBut).should("be.enabled");
    cy.get(addInTailBut).should("be.enabled");
    cy.get(addInHeadBut).click();
    cy.get(head)
      .find(smallCircle)
      .should("have.attr", "class")
      .then((className) => expect(className).contains(changingState));
    cy.get(head)
      .find(smallCircle)
      .children()
      .should("have.text", "valu");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", "valu");
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[0]).children().should("have.text", "valu");
    });
    cy.get(circle).should("have.length", 5);

    cy.get("input").should("have.text", "");
    cy.get(addInHeadBut).should("be.disabled");
  });
  it("Добавление элемента в TAIL", () => {
    const array: string[] = [];
    cy.get('[class^="circle_circle"]').then((item: any) => {
      cy.get(item)
        .children()
        .each((child) => {
          array.push(child.text());
        });
    });
    cy.get("input").invoke("first").type("valu");
    cy.get(addInHeadBut).should("be.enabled");
    cy.get(addInTailBut).should("be.enabled");
    cy.get(addInTailBut).click();
    cy.get(head)
      .find(smallCircle)
      .should("have.attr", "class")
      .then((className) => expect(className).contains(changingState));
    cy.get(head)
      .find(smallCircle)
      .children()
      .should("have.text", "valu");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[array.length])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(modifiedState));
      cy.get(item[array.length]).children().should("have.text", "valu");
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[array.length])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[array.length]).children().should("have.text", "valu");
    });
    cy.get(circle).should("have.length", 5);

    cy.get("input").should("have.text", "");
    cy.get(addInHeadBut).should("be.disabled");
    cy.get(addInTailBut).should("be.disabled");
  });
  it("Удаление элемента из HEAD", () => {
    const array: string[] = [];
    putCircleTextToArray(array);
    cy.get(deleteHeadBut).click();

    cy.get(tail).then((item: any) => {
      cy.get(item[0])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[0])
        .find(smallCircle)
        .children()
        .should("have.text", array[0]);
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[0]).children().should("have.text", "");
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[0]).children().should("have.text", array[1]);
    });
    cy.get(circle).should("have.length", 3);
  });

  it("Удаление элемента из TAIL", () => {
    const array: string[] = [];
    putCircleTextToArray(array);

    cy.get(deleteTailBut).click();
    cy.get(tail).then((item: any) => {
      cy.get(item[array.length - 1])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[array.length - 1])
        .find(smallCircle)
        .children()
        .should("have.text", array[array.length - 1]);
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[array.length - 1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[array.length - 1])
        .children()
        .should("have.text", "");
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[array.length - 2])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[array.length - 2])
        .children()
        .should("have.text", array[array.length - 2]);
    });
    cy.get(circle).should("have.length", 3);
  });
  it("Добавление элемента по индексу", () => {
    cy.get("input").invoke("first").type("ХУЙ");
    cy.get("#indexInput").type("2");
    cy.get(addInHeadBut).should("be.enabled");
    cy.get(addInTailBut).should("be.enabled");
    cy.get(addByIndBut).should("be.enabled");
    cy.get(deleteByIndBut).should("be.enabled");
    cy.get(addByIndBut).click();

    cy.get(head).then((item: any) => {
      cy.get(item[1])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[1]).find(smallCircle).children().should("have.text", "ХУЙ");
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });
    cy.wait(DELAY_IN_MS);
    cy.get(head).then((item: any) => {
      cy.get(item[2])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[2]).find(smallCircle).children().should("have.text", "ХУЙ");
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });
    cy.wait(DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[2])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(modifiedState));
      cy.get(item[2]).children().should("have.text", "ХУЙ");
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });

    cy.wait(DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[2])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
    });
    cy.get(circle).should("have.length", 5);

    cy.get("input").should("have.text", "");
    cy.get("#indexInput").should("have.text", "");
    cy.get(addInHeadBut).should("be.disabled");
    cy.get(addInTailBut).should("be.disabled");
    cy.get(addByIndBut).should("be.disabled");
    cy.get(deleteByIndBut).should("be.disabled");
  });
  it("Удаление элемента по индексу", () => {
    const array: string[] = [];
    putCircleTextToArray(array);
    cy.get("#indexInput").type("2");
    cy.get(deleteByIndBut).should("be.enabled");
    cy.get(deleteByIndBut).click();
    cy.get(tail).then((item: any) => {
      cy.get(item[1])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[1]).find(smallCircle).children().should("have.text", "");
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[0])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });
    cy.wait(DELAY_IN_MS);
    cy.get(tail).then((item: any) => {
      cy.get(item[2])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[2]).find(smallCircle).children().should("have.text", "");
    });
    cy.get(circle).then((item: any) => {
      cy.get(item[1])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
    });
    cy.wait(DELAY_IN_MS);
    cy.get(circle).then((item: any) => {
      cy.get(item[2])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[2]).children().should("have.text", "");
    });
    cy.get(tail).then((item: any) => {
      cy.get(item[2])
        .find(smallCircle)
        .should("have.attr", "class")
        .then((className) => expect(className).contains(changingState));
      cy.get(item[2])
        .find(smallCircle)
        .children()
        .should("have.text", array[2]);
    });
    cy.wait(DELAY_IN_MS);

    cy.get(circle).then((item: any) => {
      cy.get(item[2])
        .should("have.attr", "class")
        .then((className) => expect(className).contains(defaultState));
      cy.get(item[2]).children().should("have.text", array[3]);
    });
  });
});
