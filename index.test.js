import { createRouter, addRoute, findRoute, findAllRoutes } from "rou3";
import { test, expect } from "vitest";

const router = createRouter();

addRoute(router, "POST", "/path/@:name", { payload: "@ reg named route" });
addRoute(router, "POST", "/path/:name", { payload: "named route" });

const allRoutes = findAllRoutes(router, "POST", "/path/fooval", { params: false });
const allAtRoutes = findAllRoutes(router, "POST", "/path/@fooval", { params: false });
// [
//   { 
//     data: { payload: "@ reg named route" },
//     paramsRegexp: [ , /^@(?<name>[^/]+)$/],
//     paramsMap: [[1, /^@(?<name>[^/]+)$/, false ]],
//   },
//   {
//     data: { payload: "named route" },
//     paramsRegexp: [],
//     paramsMap: [[ 1, "name", false ]],
//   },
// ]

test('Routes length', () => {
  expect(allRoutes.length).toBe(1); // error: expected 1 but got 2
  expect(allAtRoutes.length).toBe(1); // error: expected 1 but got 2
})

// { 
//   data: { payload: "@ reg named route" },
//   paramsRegexp: [ , /^@(?<name>[^/]+)$/],
//   paramsMap: [[1, /^@(?<name>[^/]+)$/, false ]],
// }
findRoute(router, "POST", "/path/fooval", { params: false });

// {
//   data: { payload: "named route" },
//   paramsRegexp: [],
//   paramsMap: [[ 1, "name", false ]],
// },
findRoute(router, "POST", "/path/@fooval", { params: false });