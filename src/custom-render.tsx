import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const Wrapper: React.FC = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
