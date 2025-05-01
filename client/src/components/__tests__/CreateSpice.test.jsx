import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { expect, test, afterEach, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateSpice from "../CreateSpice";

afterEach(() => {
  cleanup();
});

test("renders create spice header", async () => {
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

test("should display error when invalid image is selected", async () => {
  const mockedHandleUpload = jest.fn()
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
        handleUpload={mockedHandleUpload}
      />
    </BrowserRouter>
  );

  const uploadInput = screen.getByLabelText("photo-input");
  await fireEvent.change(uploadInput, {
    target: {
      files: [new File(["image upload"], "test.pdf", {type: "application/pdf"})],
    }
  });
  expect( await screen.findByText(
      "Unsupported image. Please make sure your image has of one the following formats: ['png', 'jpeg', 'gif', 'webp']."
    )
  ).toBeInTheDocument();

  expect(mockedHandleUpload).not.toHaveBeenCalled();
});
