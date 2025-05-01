import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { expect, test, afterEach } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NavBar from "../NavBar";

afterEach(() => {
  cleanup();
});

test("loads and displays header ", async () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  const createSpiceButton = screen.getAllByText(/Create new Spice/i);

  expect(createSpiceButton[0]).toBeInTheDocument();
});

test("create spice navigates to create spice page", async () => {

  render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar to="/create" />
        <Routes>
          <Route path='/' element={<p>home</p>} />
          <Route path='/create' element={<p>create spice page</p>} />
        </Routes>
      </MemoryRouter>
  );

  const createlink = screen.getAllByText(/Create new Spice/i);

  await userEvent.click(createlink[0]);

  await waitFor(() => {
    expect(screen.getByText(/create spice page/i)).toBeInTheDocument();
  })
});
