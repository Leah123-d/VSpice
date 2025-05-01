import { render, screen, cleanup, within } from "@testing-library/react";
import { expect, test, afterEach, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter} from "react-router-dom";
import "@testing-library/jest-dom";
import ViewSpice from "../ViewSpice";

afterEach(() => {
  cleanup();
});

test("loads and displays component with spice data ", async () => {
  const mockedHandleEditSpice = jest.fn();
  const mockedSpice = [{id: 1, name: "tumeric", brand: "Whole Foods"}]

  render(
    <BrowserRouter>
      <ViewSpice
        viewSpice={mockedSpice}
        handleEditSpice={mockedHandleEditSpice}
      />
    </BrowserRouter>
  );

  const list = screen.getByRole("list", {name:/spice/i})
  const {getAllByRole} = within(list)
  const items = getAllByRole("listitem")

  expect(items).toHaveLength(4);
  expect(screen.getByText(/Whole Foods/i)).toBeInTheDocument();
});
