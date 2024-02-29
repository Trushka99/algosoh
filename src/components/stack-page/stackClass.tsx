interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
}

export class Stack<T> implements IStack<T> {
  public container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container === null) {
      return null;
    } else {
      return this.container[this.container.length - 1];
    }
  };
  clear = (): void => {
    this.container = [];
  };
}
