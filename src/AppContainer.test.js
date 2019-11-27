import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, wait } from "@testing-library/react";
import AppContainer from "./AppContainer";

describe("AppContainer", () => {

  beforeAll(() => {
    const fakeUserResponse = { name: "Junior Oliveira" };

    jest.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeUserResponse)
      });
    });
  })

  test("Render with useGithub hook and its initial state", async () => {
    const { getByText } = render(<AppContainer />);
    await wait(() => {
      expect(getByText(/Junior Oliveira/i)).toBeInTheDocument();
    })
  });

  test("Render with useFoo hook and its initial state", async () => {
    const { getByText } = render(<AppContainer />);
    await wait(() => {
      expect(getByText(/Hello bar/i)).toBeInTheDocument();
    })
  });
});
