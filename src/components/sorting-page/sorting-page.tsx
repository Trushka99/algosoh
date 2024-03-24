import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { Direction } from "../../types/direction";
import { randomArr } from "./sorting-page_utils";
import { TArraySorting } from "../../constants/Tarray";
import sortingStyle from "./sorting-page.module.css";
import {
  selSortAs,
  selSortDes,
  bubbSortAs,
  bubbSortDes,
} from "./sorting-page_utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<TArraySorting[]>([]);
  const [sortName, setSortName] = React.useState("выбор");
  const [sorting, setSorting] = React.useState<Direction>();
  const [loader, setLoader] = React.useState(false);

  const handleClick = (sorting: Direction) => {
    setSorting(sorting);

    if (sortName === "выбор" && sorting === Direction.Ascending) {
      selSortAs(array, setArray, setLoader);
    }
    if (sortName === "выбор" && sorting === Direction.Descending) {
      selSortDes(array, setArray, setLoader);
    }
    if (sortName === "пузырек" && sorting === Direction.Ascending) {
      bubbSortAs(array, setArray, setLoader);
    }
    if (sortName === "пузырек" && sorting === Direction.Descending) {
      bubbSortDes(array, setArray, setLoader);
    }
  };

  const changeOptionValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortName(event.target.value);
  };

  const setLoading = (direction: Direction) => {
    if (sorting === direction && loader === true) {
      return true;
    } else {
      return false;
    }
  };

  const setDisabled = (direction: Direction) => {
    if (sorting !== direction && loader === true) {
      return true;
    } else {
      return false;
    }
  };
  React.useEffect(() => {
    setArray(randomArr());
    return () => {
      setArray([]);
    };
  }, []);
  const changeArr = () => {
    setArray(randomArr());
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.main_container}>
        <section className={sortingStyle.buttons_container}>
          <RadioInput
            label="Выбор"
            extraClass={sortingStyle.choise_button}
            value="выбор"
            checked={sortName === "выбор" ? true : false}
            onChange={changeOptionValue}
            disabled={loader}
          />
          <RadioInput
            label="Пузырёк"
            value="пузырек"
            extraClass={sortingStyle.bubble_button}
            checked={sortName === "пузырек" ? true : false}
            onChange={changeOptionValue}
            disabled={loader}
          />
          <Button
            extraClass={sortingStyle.sort_button}
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleClick(Direction.Ascending)}
            isLoader={setLoading(Direction.Ascending)}
            disabled={setDisabled(Direction.Ascending)}
          />
          <Button
            extraClass={sortingStyle.sort_button2}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleClick(Direction.Descending)}
            isLoader={setLoading(Direction.Descending)}
            disabled={setDisabled(Direction.Descending)}
          />
          <Button
            extraClass={sortingStyle.sort_button3}
            text="Новый массив"
            onClick={changeArr}
          />
        </section>
        <ul className={sortingStyle.graphs}>
          {array.map((item, index) => (
            <li key={index} className={sortingStyle.graph}>
              <Column index={item.value} state={item.state} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
