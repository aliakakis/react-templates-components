import React from "react";
import { render, screen } from "@testing-library/react";
import { If } from "./If";

describe("Tests for If template component", () => {
  describe("Tests for If template component for show property", () => {
    test("render If with show: true", async () => {
      render(
        <section data-testid="section">
          <If show={true}>
            <h1 />
          </If>
        </section>,
        {}
      );

      expect(
        screen.getByTestId("section").querySelector("h1")
      ).toBeInTheDocument();
    });

    test("render If with show: false", async () => {
      render(
        <section data-testid="section">
          <If show={false}>
            <h1 />
          </If>
        </section>,
        {}
      );
      expect(
        screen.getByTestId("section").querySelector("h1")
      ).not.toBeInTheDocument();
    });
  });

  describe("Tests for If template component for useFragment property", () => {
    test("render If with useFragment: true", async () => {
      render(
        <section data-testid="section">
          <If show={true} useFragment={true}>
            <h1 />
          </If>
        </section>,
        {}
      );

      expect(screen.getByTestId("section").children).toHaveLength(1);
    });

    test("render If with show: false", async () => {
      render(
        <section data-testid="section">
          <If show={true} useFragment={false} tag={"div"}>
            <h1 />
          </If>
        </section>,
        {}
      );
      expect(
        screen.getByTestId("section").querySelector("div")
      ).toBeInTheDocument();
    });
  });
});
