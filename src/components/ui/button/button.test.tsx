import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
describe("Button", () => {
  it("кнопки без текста правильно рендерятся", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопки с текстом правильно рендерятся", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Выключенная кнопка правильно рендерится", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Loading кнопка правильно рендерится", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Клик по кнопке работает корректно", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
});
