import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./ILinkedList";
import { getRandomInt } from "../sorting-page/sorting-page_utils";
import listStyle from "./list-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
export const ListPage: React.FC = () => {
  const list = React.useMemo(
    () =>
      new LinkedList<any>(
        Array.from({ length: 4 }, () => getRandomInt(0, 99).toString())
      ),
    []
  );
  const [loadingBut, setLoadingBut] = React.useState("");
  const [arr, setArr] = React.useState(list.getArray());
  const [formValue, setFormValue] = React.useState("");
  const [headChange, setHeadChange] = React.useState(false);
  const [tailChange, settailChange] = React.useState(false);
  const [indexChange, setIndexChange] = React.useState(false);
  const [indexValue, setIndexValue] = React.useState(0);
  const [indexText, setIndexText] = React.useState<{
    value: string;
    state: ElementStates;
  }>({ value: "", state: ElementStates.Changing });
  const [headDelete, setHeadDelete] = React.useState(false);
  const [tailDelete, setTailDelete] = React.useState(false);
  const [index, setIndex] = React.useState("");
  const [indexDelete, setIndexDelete] = React.useState(false);
  const [headValue, setHeadValue] = React.useState<{
    value: string;
    state: ElementStates;
  }>({ value: "", state: ElementStates.Changing });
  const [tailValue, setTailValue] = React.useState<{
    value: string;
    state: ElementStates;
  }>({ value: "", state: ElementStates.Changing });

  const showHead = (index: number) => {
    if (index === 0 && !headChange && !indexChange) {
      return "head";
    } else if (headChange && index === 0) {
      return (
        <Circle
          letter={headValue.value}
          state={headValue.state}
          isSmall={true}
        />
      );
    } else if (tailChange && index === arr.length - 1) {
      return (
        <Circle
          letter={tailValue.value}
          state={tailValue.state}
          isSmall={true}
        />
      );
    } else if (indexChange && index === indexValue) {
      return (
        <Circle
          letter={indexText.value}
          state={indexText.state}
          isSmall={true}
        />
      );
    } else {
      return "";
    }
  };
  const showTail = (index: number) => {
    if (index === arr.length - 1 && !tailDelete) {
      return "tail";
    } else if (headDelete && index === 0) {
      return (
        <Circle
          letter={headValue.value}
          state={headValue.state}
          isSmall={true}
        />
      );
    } else if (tailDelete && index === arr.length - 1) {
      return (
        <Circle
          letter={tailValue.value}
          state={tailValue.state}
          isSmall={true}
        />
      );
    } else if (indexDelete && index === indexValue) {
      return (
        <Circle
          letter={indexText.value}
          state={indexText.state}
          isSmall={true}
        />
      );
    } else {
      return "";
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };
  const changeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.currentTarget.value);
  };
  const addInHeadButton = async () => {
    setLoadingBut("addInHead");
    if (formValue) {
      list.addToTheStart(formValue);
      setHeadChange(true);
      setHeadValue({ value: formValue, state: ElementStates.Changing });
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      const newArr = list.getArray();
      newArr[0].state = ElementStates.Modified;
      setArr(newArr);
      setHeadChange(false);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      newArr[0].state = ElementStates.Default;
      setArr(list.getArray());
    }
    setLoadingBut("");
    setFormValue("");
  };

  const addByIndexButton = async () => {
    setLoadingBut("addByInd");

    for (let i = 0; i <= Number(index); i++) {
      setIndexText({ value: formValue, state: ElementStates.Changing });
      if (i !== 0) {
        arr[i - 1].state = ElementStates.Changing;
        setIndexValue(i);
        setIndexChange(true);
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        setIndexChange(false);
      }

      if (i === Number(index)) {
        list.addAtIndex(formValue, Number(index));
        const newArr = list.getArray();
        newArr[Number(index)].state = ElementStates.Modified;
        setArr(newArr);
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        setArr(list.getArray());
      }
    }
    setLoadingBut("");
    setIndex("");
    setFormValue("");
  };
  const deleteByIndexButton = async () => {
    setLoadingBut("deleteByInd");
    for (let i = 0; i <= Number(index); i++) {
      if (i !== 0) {
        setIndexDelete(true);
        setIndexText({ value: "", state: ElementStates.Changing });
        arr[i - 1].state = ElementStates.Changing;
        setIndexValue(i);
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        setIndexDelete(false);
      }

      if (i === Number(index)) {
        const newArr = list.getArray();

        newArr[Number(index)].value = "";
        newArr[Number(index)].state = ElementStates.Changing;

        setIndexDelete(true);
        setArr(newArr);

        setIndexText({
          value: arr[Number(index)].value,
          state: ElementStates.Changing,
        });
        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        list.deleteAtIndex(Number(index));

        await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
        setArr(list.getArray());
        setIndexDelete(false);
      }
    }
    setLoadingBut("");
    setIndex("");
  };
  const addInTailButton = async () => {
    setLoadingBut("addInTail");

    if (formValue) {
      list.addToTheEnd(formValue);
      settailChange(true);
      setTailValue({ value: formValue, state: ElementStates.Changing });
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      const newArr = list.getArray();
      newArr[newArr.length - 1].state = ElementStates.Modified;
      setArr(newArr);
      settailChange(false);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      newArr[newArr.length - 1].state = ElementStates.Default;
      setArr(list.getArray());
    }
    setLoadingBut("");
    setFormValue("");
  };
  const deleteHead = async () => {
    setLoadingBut("deleteHead");
    const newArr = list.getArray();
    list.deleteHead();
    setHeadValue({ value: arr[0].value, state: ElementStates.Changing });
    newArr[0].value = "";
    setArr(newArr);
    setHeadDelete(true);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHeadDelete(false);
    setArr(list.getArray());
    setLoadingBut("");
  };
  const deleteTail = async () => {
    setLoadingBut("deleteTail");

    const newArr = list.getArray();
    list.deleteTail();
    setTailValue({
      value: arr[arr.length - 1].value,
      state: ElementStates.Changing,
    });
    newArr[arr.length - 1].value = "";
    setArr(newArr);
    setTailDelete(true);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setTailDelete(false);
    setArr(list.getArray());
    setLoadingBut("");
  };
  return (
    <SolutionLayout title="Связный список">
      <div>
        <section className={listStyle.inputs_cont}>
          <div className={listStyle.input_cont}>
            <Input
              placeholder="Введите значение"
              maxLength={4}
              isLimitText={true}
              value={formValue}
              onChange={onChange}
              extraClass={listStyle.input}
              disabled={loadingBut != ""}
            />
            <Button
              text="Добавить в head"
              onClick={addInHeadButton}
              extraClass={listStyle.top_button}
              isLoader={loadingBut === "addInHead" ? true : false}
              disabled={
                !formValue || (loadingBut != "" && "addInHead") ? true : false
              }
            />
            <Button
              text="Добавить в tail"
              onClick={addInTailButton}
              extraClass={listStyle.top_button}
              isLoader={loadingBut === "addInTail" ? true : false}
              disabled={
                !formValue || (loadingBut != "" && "addInTail") ? true : false
              }
            />
            <Button
              text="Удалить из head"
              onClick={deleteHead}
              extraClass={listStyle.top_button}
              isLoader={loadingBut === "deleteHead" ? true : false}
              disabled={
                (loadingBut != "deleteHead" && "") || list.getSize() === 0
              }
            />
            <Button
              text="Удалить из tail"
              onClick={deleteTail}
              extraClass={listStyle.top_button}
              isLoader={loadingBut === "deleteTail" ? true : false}
              disabled={
                (loadingBut != "deleteTail" && "") || list.getSize() === 0
              }
            />
          </div>
          <div className={listStyle.input_cont}>
            <Input
              placeholder="Введите индекс"
              max={5}
              min="0"
              type="number"
              extraClass={listStyle.input}
              value={index}
              onChange={changeIndex}
              disabled={loadingBut != ""}
            />
            <Button
              text="Добавить по индексу"
              extraClass={listStyle.bottom_button}
              onClick={addByIndexButton}
              isLoader={loadingBut === "addByInd" ? true : false}
              disabled={
                !index || !formValue || (loadingBut != "" && "addByInd")
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить по индексу"
              extraClass={listStyle.bottom_button}
              onClick={deleteByIndexButton}
              isLoader={loadingBut === "deleteByInd" ? true : false}
              disabled={
                !index || (loadingBut != "" && "deleteByInd") ? true : false
              }
            />
          </div>
        </section>
        <ul className={listStyle.list_cont}>
          {arr &&
            arr.map((item, index) => (
              <li className={listStyle.li_style} key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  index={index}
                  head={showHead(index)}
                  tail={showTail(index)}
                  extraClass={listStyle.circle_style}
                />
                {arr.length - 1 !== index && <ArrowIcon />}
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
