import React from "react";
import renderer from "react-test-renderer";
import LanguageDot from "./LanguageDot";

describe("LanguageDot", () => {
  it("should render", () => {
    const tree = renderer.create(<LanguageDot language="HTML" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
