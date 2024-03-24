import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
describe("Circle", () => {
  it("Элемент рендерится без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с буквами", () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с параметром head", () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с параметром tail", () => {
    const tree = renderer.create(<Circle tail="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с параметром index", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится с проп isSmall == true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится в состоянии dafault", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится в состоянии changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Элемент рендерится в состоянии modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
