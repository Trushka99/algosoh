import {
  selSortAs,
  selSortDes,
  bubbSortAs,
  bubbSortDes,
} from "./sorting-page_utils";
import { ElementStates } from "../../types/element-states";

const oneElement = [{ value: 1, state: ElementStates.Default }];

const exampleArray = [
  { value: 1, state: ElementStates.Modified },
  { value: 10, state: ElementStates.Modified },
  { value: 9, state: ElementStates.Modified },
  { value: 2, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
];

const resultAscending = [
  { value: 1, state: ElementStates.Modified },
  { value: 2, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
  { value: 9, state: ElementStates.Modified },
  { value: 10, state: ElementStates.Modified },
];

const resultDescending = [
  { value: 10, state: ElementStates.Modified },
  { value: 9, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
  { value: 2, state: ElementStates.Modified },
  { value: 1, state: ElementStates.Modified },
];

const setArray = jest.fn();
const setLoader = jest.fn();

jest.setTimeout(30000);

describe("Сортировка выбором по возрастанию", () => {
  it("Работает корректно с пустым массивом", async () => {
    await selSortAs([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с одним элементом", async () => {
    await selSortAs(oneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с несколькими элементами в массиве", async () => {
    await selSortAs(exampleArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultAscending
    );
  });
});

describe("Сортировка выбором по убыванию", () => {
  it("Работает корректно с пустым массивом", async () => {
    await selSortDes([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с одним элементом", async () => {
    await selSortDes(oneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с несколькими элементами в массиве", async () => {
    await selSortDes(exampleArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultDescending
    );
  });
});

describe("Сортировка пузырьком по возрастанию", () => {
  it("Работает корректно с пустым массивом", async () => {
    await bubbSortAs([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с одним элементом", async () => {
    await bubbSortAs(oneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с несколькими элементами в массиве", async () => {
    await bubbSortAs(exampleArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultAscending
    );
  });
});

describe("Сортировка пузырьком по убыванию", () => {
  it("Работает корректно с пустым массивом", async () => {
    await bubbSortDes([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с одним элементом", async () => {
    await bubbSortDes(oneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Работает корректно с несколькими элементами в массиве", async () => {
    await bubbSortDes(exampleArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultDescending
    );
  });
});
