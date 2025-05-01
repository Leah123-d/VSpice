import {render, screen, cleanup} from '@testing-library/react'
import { expect, test, afterEach } from "@jest/globals"
import "@testing-library/jest-dom";
import { BrowserRouter, jest } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import NavBar from '../NavBar'

afterEach(() => {
  cleanup()
})

test('loads and displays header ', async () => {
  
  render(
  <BrowserRouter>
  <NavBar  />
  </BrowserRouter>)

  const createSpiceButton = screen.getAllByText(/Create new Spice/i) 

  expect(createSpiceButton[0]).toBeInTheDocument();
})