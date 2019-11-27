import React from "react";
import renderer from "react-test-renderer";
import AppComponent from "./AppComponent";

describe("AppComponent", () => {
  test("should match snapshot", () => {
    const useFoo = jest.fn(() => ({}));
    const useGithub = jest.fn(() => ({ user: {} }));

    const tree = renderer
      .create(<AppComponent useFoo={useFoo} useGithub={useGithub} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
