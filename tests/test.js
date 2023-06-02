import { createElement } from "react";
import { renderReact } from "../src/index";

function ExampleReactComponent({ name }) {
  const hi = ["Hello", name];
  return createElement("div", { id: "example" }, hi.join(" "));
}

describe("renderReact", () => {
  let result;

  beforeEach(() => {
    result = renderReact(
      "ExampleReactComponent",
      ExampleReactComponent
    )({ name: "Desmond" });
  });

  test("exists", () => {
    expect(typeof renderReact).toBe("function");
    expect(renderReact.length).toEqual(2);
  });

  test("has correct markup on server", () => {
    expect(typeof result).toBe("string");
    expect(result).toMatch(/Hello Desmond/);
  });
});
