import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import fibStyle from "./fibonacci-page.module.css";
export const getFib = (n: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};
export const FibonacciPage: React.FC = () => {
  const [formValue, setFormValue] = React.useState<string>("");
  const [loader, setLoader] = React.useState(false);
  const [fibonaciArray, setFibonaciArray] = React.useState<Array<number>>();

  const fibonaciFunction = async (inputValue: string) => {
    setLoader(true);
    const arr = getFib(Number(inputValue));
    for (let i = 0; i < arr.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      setFibonaciArray(arr.slice(0, i + 1));
    }
    setLoader(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };

  const handleButton = () => {
    if (formValue) fibonaciFunction(formValue);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibStyle.main_container}>
        <div className={fibStyle.input_container}>
          <Input
            max={19}
            isLimitText={true}
            type="number"
            min={1}
            onChange={onChange}
            extraClass={fibStyle.input_style}
            disabled={loader === true}
          />
          <Button
            text="Рассчитать"
            type="submit"
            onClick={handleButton}
            isLoader={loader}
            disabled={formValue === "" || Number(formValue) > 19}
          />
        </div>
        {fibonaciArray?.length && (
          <ul className={fibStyle.answer_container}>
            {fibonaciArray.map((item, i) => (
              <li key={i}>
                <Circle index={i} letter={item.toString()} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SolutionLayout>
  );
};
