// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions

// react-scripts@3.4.1 bundles an old jest-environment-jsdom whose nested jsdom
// (v11) doesn't implement MutationObserver at all, which @testing-library/dom's
// findBy*/waitFor rely on internally. This shim patches it in.
import "mutationobserver-shim";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
