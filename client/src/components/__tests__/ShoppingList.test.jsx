import {render, screen, cleanup} from '@testing-library/react'
import { expect, test, afterEach } from "@jest/globals"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@testing-library/jest-dom'
import ShoppingList from '../ShoppingList'

afterEach(() => {
  cleanup()
})

test('renders shopping list header', async () => {


  render(
  <BrowserRouter>
  <ShoppingList />
  </BrowserRouter>)


  expect(screen.getByRole('heading')).toHaveTextContent('Shopping List')
})
