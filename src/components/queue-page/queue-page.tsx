import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import queueStyle from "../stack-page/stack-page.module.css";
import { TArrayString } from "../../constants/Tarray";

export const QueuePage: React.FC = () => {
  const emptyQueue = Array.from({ length: 7 }, () => ({
    value: "",
    state: ElementStates.Default,
  }));

  const [queue] = React.useState(new Queue<TArrayString>(7));
  const [formValue, setFormValue] = React.useState("");
  const [disableButtons, setDisableButtons] = React.useState(false);
  const [queueArr, setQueueArr] = React.useState<TArrayString[]>(emptyQueue);
  const [load, setLoad] = React.useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };
  const handeAddButton = async () => {
    setLoad("add");
    if (formValue) {
      setFormValue("");
      queue.enqueue({ value: formValue, state: ElementStates.Changing });
      queueArr[queue.getTail() - 1] = {
        value: "",
        state: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      queueArr[queue.getTail() - 1] = {
        value: formValue,
        state: ElementStates.Default,
      };
      setQueueArr([...queueArr]);
    }
    setLoad("");
  };
  const handeDeleteButton = async () => {
    setLoad("delete");
    setDisableButtons(true);
    queue.dequeue();
    queueArr[queue.getHead() - 1] = {
      value: queueArr[queue.getHead() - 1].value,
      state: ElementStates.Changing,
    };
    setQueueArr([...queueArr]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    queueArr[queue.getHead() - 1] = { value: "", state: ElementStates.Default };
    setQueueArr([...queueArr]);
    setDisableButtons(false);
    setLoad("");
  };

  const handleRemoveButton = () => {
    queue.clear();
    setQueueArr(emptyQueue);
  };
  return (
    <SolutionLayout title="Очередь">
      <div className={queueStyle.main_contain}>
        <section className={queueStyle.input_contain}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            onChange={onChange}
            value={formValue}
            extraClass={queueStyle.input_size}
          />
          <Button
            text="Добавить"
            disabled={formValue === "" || disableButtons}
            onClick={handeAddButton}
            extraClass={queueStyle.button}
            isLoader={load === "add"}
          />
          <Button
            text="Удалить"
            disabled={queue.isEmpty() || disableButtons}
            onClick={handeDeleteButton}
            extraClass={queueStyle.button2}
            isLoader={load === "delete"}
          />
          <Button text="Очистить" onClick={handleRemoveButton} />
        </section>

        <ul className={queueStyle.array_cont}>
          {queueArr &&
            queueArr.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.state}
                  head={
                    index === queue.getHead() && !queue.isEmpty() ? "head" : ""
                  }
                  tail={
                    index === queue.getTail() - 1 && !queue.isEmpty()
                      ? "tail"
                      : ""
                  }
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
