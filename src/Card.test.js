import React from "react";
import { render, asFragment } from "@testing-library/react";
import Card from "./Card";


/* smoke test */
test('render card component without crashing',() => {
    render(<Card />);
})

/* Snapshot test */
test('match snapshot',() => {
    const { asFragment } = render(<Card />)
    expect(asFragment()).toMatchSnapshot();
})