import { ElementStates } from "../../types/element-states";
export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  addToTheStart: (element: T) => void;
  addToTheEnd: (element: T) => void;
  addAtIndex: (element: T, index: number) => void;
  toArray: () => T[];
  deleteHead: () => void;
  deleteAtIndex: (index: number) => void;
  deleteTail: () => void;
  getSize: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private makeArray(values: T[]) {
    values.forEach((value) => this.addToTheStart(value));
  }

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements?.length) {
      this.makeArray(elements);
    }
  }

  addToTheStart(element: T) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }
  addToTheEnd(element: T) {
    let node = new Node(element);
    let current: any = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
    this.tail = node;
    this.size++;
  }
  getSize() {
    return this.size;
  }
  get(index: number) {
    if (index < 0 || index >= this.size) return null;
    let counter = 0;
    let curr = this.head;
    while (counter !== index && curr) {
      curr = curr?.next;
      counter++;
    }
    return curr;
  }

  addAtIndex(element: T, index: number) {
    const newNode = new Node(element);
    let prev = this.get(index - 1);
    if (prev?.next) {
      let temp = prev.next;
      prev.next = newNode;
      newNode.next = temp;
      this.size++;
    }
  }
  toArray() {
    let curr = this.head;
    const res = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res];
  }
  deleteAtIndex(index: number) {
    let prev = this.get(index - 1);
    if (prev?.next) {
      let newNext = prev.next.next;
      prev.next = prev;
      prev.next.next = newNext;
    }
  }
  deleteHead() {
    if (!this.head) return null;
    this.head = this.head.next;
    this.size--;
  }
  deleteTail() {
    let current: any = this.head;
    let newTail;
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail!.next = null;
    this.size--;
  }

  getArray() {
    return this.toArray().map((item) => ({
      value: item,
      state: ElementStates.Default,
    }));
  }
}
