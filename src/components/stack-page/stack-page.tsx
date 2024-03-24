import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import stackStyle from "./stack-page.module.css";
import { Stack } from "./stackClass";
import { TArrayString } from "../../constants/Tarray";

export const StackPage: React.FC = () => {
  const [formValue, setFormValue] = React.useState("");
  const [loadingBut, setLoadingBut] = React.useState("");
  const [array, seTArrayString] = React.useState<TArrayString[]>([]);
  const [stack] = React.useState(new Stack<TArrayString>());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };
  const addButton = async () => {
    setLoadingBut("addBut");
    if (formValue) {
      stack.push({ value: formValue, state: ElementStates.Changing });
      setFormValue("");
      seTArrayString([...stack.container]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      let topElement = stack.peak();
      if (topElement != null) {
        topElement.state = ElementStates.Default;
      }
      seTArrayString([...stack.container]);
    }
    setLoadingBut("");
  };
  const deleteButton = async () => {
    setLoadingBut("deleteBut");
    let topElement = stack.peak();
    if (topElement != null) {
      topElement.state = ElementStates.Changing;
    }
    seTArrayString([...stack.container]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    stack.pop();
    seTArrayString([...stack.container]);
    setLoadingBut("");
  };
  const deleteAllButton = () => {
    seTArrayString([]);
    stack.clear();
  };
  return (
    <SolutionLayout title="Стек">
      <div className={stackStyle.main_contain}>
        <section className={stackStyle.input_contain}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            value={formValue}
            onChange={onChange}
            extraClass={stackStyle.input_size}
          />
          <Button
            text="Добавить"
            onClick={addButton}
            disabled={formValue === ""}
            extraClass={stackStyle.button}
            isLoader={loadingBut === "addBut"}
          />
          <Button
            text="Удалить"
            onClick={deleteButton}
            disabled={array.length === 0}
            extraClass={stackStyle.button2}
            isLoader={loadingBut === "deleteBut"}
          />
          <Button
            text="Очистить"
            onClick={deleteAllButton}
            disabled={array.length === 0}
          />
        </section>

        <ul className={stackStyle.array_cont}>
          {array &&
            array.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  index={index}
                  head={index === array.length - 1 ? "top" : ""}
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
