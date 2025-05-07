import { render, screen, cleanup, within } from "@testing-library/react";
import { expect, test, afterEach, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditSpice from "../EditSpice";

afterEach(() => {
  cleanup();
});

test("loads and displays component with spice data ", async () => {
  //mock data is used for the component if it is referencing data required to load the component
  const mockedSpices = [
    { id: 1, name: "tumeric", brand: "Whole Foods", last_purchased: '2021/05/01' },
    { id: 2, name: "ginger", brand: "Safeway", last_purchased: '2021/07/01'},
  ];

  //mock functions are used to mock functions that interact with the tested elements
  render(
    <BrowserRouter>
      <EditSpice viewSpice={mockedSpices} editSpice={jest.fn()}  />
    </BrowserRouter>
  );
  const submitBtn = screen.getByRole("button", { name: /save changes/i });
  userEvent.click(submitBtn);

  expect(submitBtn).toBeInTheDocument();

});
