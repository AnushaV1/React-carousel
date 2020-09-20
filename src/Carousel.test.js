import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

/* Smoke test */
it('renders component without crashing', ()=> {
    render(<Carousel  />)
})

/* Snapshot test */
it('should match snapshot', () => {
    const {asFragment} = render(<Carousel />)
    expect(asFragment()).toMatchSnapshot();
})

/* Test Right arrow */
it("works when you click on the right arrow", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("test show and hide", function() {
    const { queryByTestId } = render(<Carousel />);

    let rightArrow = queryByTestId("right-arrow");
    let leftArrow = queryByTestId("left-arrow");

    expect(rightArrow).toBeInTheDocument();
    expect(leftArrow).toBe(null);

    fireEvent.click(rightArrow);
    leftArrow = queryByTestId("left-arrow");

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();

    fireEvent.click(rightArrow);

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
});

/* Test Left arrow */
it("works when you click on the left arrow", function() {
    const { getByTestId, queryByAltText } = render(<Carousel />);
    const rightArrow = getByTestId("right-arrow");

    // move to the right
    fireEvent.click(rightArrow);

    // move back to the left, expect the first image to show
    const leftArrow = getByTestId("left-arrow");
    fireEvent.click(leftArrow);
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});