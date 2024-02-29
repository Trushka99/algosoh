import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import stringStyle from "./string.module.css";
import { TArrayString } from "../../constants/Tarray";
export const swap = (
  arr: TArrayString[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};

export const reverse = async (
  array: TArrayString[],
  seTArrayString: Dispatch<SetStateAction<TArrayString[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  const mid = Math.ceil(array.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = array.length - 1 - i;

    if (i !== j) {
      array[i].state = ElementStates.Changing;
      array[j].state = ElementStates.Changing;
      seTArrayString(array);
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    }

    swap(array, i, j);

    array[i].state = ElementStates.Modified;
    array[j].state = ElementStates.Modified;

    seTArrayString([...array]);
  }
  setLoader(false);
};

export const StringComponent: React.FC = () => {
  const [formValue, setFormValue] = React.useState("");
  const [array, seTArrayString] = React.useState<Array<TArrayString>>([]);
  const [loader, setLoader] = React.useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };

  const handleButton = () => {
    const newArr = formValue
      .split("")
      .map((value) => ({ value, state: ElementStates.Default }));
    reverse(newArr, seTArrayString, setLoader);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={stringStyle.main_container}>
        <div className={stringStyle.input_container}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={formValue}
            onChange={onChange}
            extraClass={stringStyle.input_style}
          />
          <Button
            text="Развернуть"
            type="submit"
            onClick={handleButton}
            isLoader={loader}
            disabled={formValue === ""}
          />
        </div>
        <ul className={stringStyle.answer_container}>
          {array &&
            array.map((item, index) => (
              <li key={index}>
                <Circle letter={item.value} state={item.state} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
