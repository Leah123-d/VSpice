import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, afterEach, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateSpice from "../CreateSpice";

afterEach(() => {
  cleanup();
});

test("renders shopping list header", async () => {
  render(
    <BrowserRouter>
      <CreateSpice
        createNewSpice={jest.fn()}
        isLoading={jest.fn()}
        getSpices={jest.fn()}
        isAnalyzing={jest.fn()}
        setIsLoading={jest.fn()}
        setIsAnalyzing={jest.fn()}
        newSpiceId={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(screen.getByRole("heading")).toHaveTextContent("AI Spice Analyze");
});
