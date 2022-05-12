import React from "react";
import { render, screen } from "@testing-library/react";
import { Else } from "./Else";

describe("Tests for Else template component", () => {
  describe("Tests for Else template component for show property", () => {
    test("render Else with show: true", async () => {
      render(
        <section data-testid="section">
          <Else show>
            <h1 />
          </Else>
        </section>,
        {}
      );

      expect(
        screen.getByTestId("section").querySelector("h1")
      ).toBeInTheDocument();
    });

    test("render Else with show: false", async () => {
      render(
        <section data-testid="section">
          <Else show={false}>
            <h1 />
          </Else>
        </section>,
        {}
      );
      expect(
        screen.getByTestId("section").querySelector("h1")
      ).not.toBeInTheDocument();
    });
  });

  describe("Tests for Else template component for useFragment property", () => {
    test("render Else with useFragment: true", async () => {
      render(
        <section data-testid="section">
          <Else show useFragment>
            <h1 />
          </Else>
        </section>,
        {}
      );

      expect(screen.getByTestId("section").children).toHaveLength(1);
    });

    test("render Else with show: false", async () => {
      render(
        <section data-testid="section">
          <Else show useFragment={false} tag={"div"}>
            <h1 />
          </Else>
        </section>,
        {}
      );
      expect(
        screen.getByTestId("section").querySelector("div")
      ).toBeInTheDocument();
    });
  });
});
