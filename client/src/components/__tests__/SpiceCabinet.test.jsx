import {render, screen, cleanup} from '@testing-library/react'
import { expect, test, afterEach } from "@jest/globals"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@testing-library/jest-dom'
import SpiceCabinet from '../SpiceCabinet'

afterEach(() => {
  cleanup()
})

test('renders spice cabinet component', async () => {


  render(
  <BrowserRouter>
  <SpiceCabinet />
  </BrowserRouter>)


  expect(screen.getByRole('heading')).toHaveTextContent('Spice Cabinet')
})
