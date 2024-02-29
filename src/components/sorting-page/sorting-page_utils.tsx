import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Dispatch, SetStateAction } from "react";
import { TArraySorting } from "../../constants/Tarray";
export const getRandomInt = (minLen: number, maxLen: number) => {
  return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};

export const randomArr = () => {
  const arr = [];
  const length = getRandomInt(3, 17);
  for (let i = 0; i < length; i++) {
    arr.push({
      value: Math.round(Math.random() * 100),
      state: ElementStates.Default,
    });
  }
  return arr;
};
const swap = (
  arr: TArraySorting[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selSortAs = async (
  arr: TArraySorting[],
  seTArraySorting: Dispatch<SetStateAction<TArraySorting[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        seTArraySorting([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (arr[j].value < arr[min].value) {
          min = j;
        }
        arr[j].state = ElementStates.Default;
        seTArraySorting([...arr]);
      }
      swap(arr, i, min);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    seTArraySorting([...arr]);
  }
  setLoader(false);
};

export const selSortDes = async (
  arr: TArraySorting[],
  seTArraySorting: Dispatch<SetStateAction<TArraySorting[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length - 1; i++) {
      let max = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        seTArraySorting([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (arr[j].value > arr[max].value) {
          max = j;
        }
        arr[j].state = ElementStates.Default;
        seTArraySorting([...arr]);
      }
      swap(arr, i, max);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    seTArraySorting([...arr]);
  }
  setLoader(false);
};

export const bubbSortAs = async (
  arr: TArraySorting[],
  seTArraySorting: Dispatch<SetStateAction<TArraySorting[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        seTArraySorting([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (arr[j].value > arr[j + 1].value) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      seTArraySorting([...arr]);
    }
  }
  setLoader(false);
};

export const bubbSortDes = async (
  arr: TArraySorting[],
  seTArraySorting: Dispatch<SetStateAction<TArraySorting[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        seTArraySorting([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      seTArraySorting([...arr]);
    }
  }
  setLoader(false);
};
