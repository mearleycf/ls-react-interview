import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type WrapperProps = { children: React.ReactNode };

function render(
  ui: React.ReactElement,
  {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
