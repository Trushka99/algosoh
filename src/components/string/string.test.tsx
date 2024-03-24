import { ElementStates } from "../../types/element-states";
import { reverse } from "./string";

const setStringArr = jest.fn();
const setLoader = jest.fn();

describe("Переворот строки", () => {
  it("с чётным количеством символов", async () => {
    const string = "even";
    const reverseString = "neve";
    await reverse(
      string
        .split("")
        .map((value) => ({ value, state: ElementStates.Default })),
      setStringArr,
      setLoader
    );
    expect(setStringArr).toHaveBeenLastCalledWith(
      reverseString
        .split("")
        .map((value) => ({ value, state: ElementStates.Modified }))
    );
  });

  it("с нечетным количеством символов", async () => {
    const string = "odd";
    const reverseString = "ddo";
    await reverse(
      string
        .split("")
        .map((value) => ({ value, state: ElementStates.Default })),
      setStringArr,
      setLoader
    );
    expect(setStringArr).toHaveBeenLastCalledWith(
      reverseString
        .split("")
        .map((value) => ({ value, state: ElementStates.Modified }))
    );
  });

  it("с одним символом", async () => {
    const string = "h";
    const reverseString = "h";
    await reverse(
      string
        .split("")
        .map((value) => ({ value, state: ElementStates.Default })),
      setStringArr,
      setLoader
    );
    expect(setStringArr).toHaveBeenLastCalledWith(
      reverseString
        .split("")
        .map((value) => ({ value, state: ElementStates.Modified }))
    );
  });

  it("пустую строку", async () => {
    const string = "";
    await reverse(
      string
        .split("")
        .map((value) => ({ value, state: ElementStates.Default })),
      setStringArr,
      setLoader
    );
    expect(setStringArr).toHaveBeenCalledTimes(0);
  });
});
