import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ErrorHandle from "../ErrorHandle";

afterEach(() => {
  cleanup();
});

test("renders component title", async () => {
  render(
    <BrowserRouter>
      <ErrorHandle />
    </BrowserRouter>
  );

  expect(screen.getByRole("heading")).toHaveTextContent("Page not Found");
});
