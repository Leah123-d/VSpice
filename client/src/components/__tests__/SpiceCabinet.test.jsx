import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, afterEach, jest } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SpiceCabinet from "../SpiceCabinet";

afterEach(() => {
  cleanup();
});

test("should render heading of spice cabinet component", async () => {
  render(
    <BrowserRouter>
      <SpiceCabinet />
    </BrowserRouter>
  );

  expect(screen.getByRole("heading")).toHaveTextContent("Spice Cabinet");
});

test("should navigate to view spice component", async () => {
  const mockedGetSpices = jest.fn();
  const mockedSpices = [
    { id: 1, name: "tumeric", brand: "Whole Foods" },
    { id: 2, name: "ginger", brand: "Safeway" },
  ];
  const mockedDisplaySpices = [
    { id: 1, name: "tumeric", brand: "Whole Foods" },
    { id: 2, name: "ginger", brand: "Safeway" },
  ];
  const mockedDeleteSpice = jest.fn();

  render(
    <BrowserRouter>
      <SpiceCabinet
        getSpices={mockedGetSpices}
        storedSpices={mockedSpices}
        displayedSpices={mockedDisplaySpices}
        deleteSpice={mockedDeleteSpice}
      />
    </BrowserRouter>
  );

  const viewButton = screen.getAllByRole("button", {
    name: /view-one-spice/i,
  })[0];
  await userEvent.click(viewButton);

  expect(mockedGetSpices).toHaveBeenCalled();
});
