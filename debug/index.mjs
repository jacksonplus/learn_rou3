import { createRouter, addRoute, findRoute, findAllRoutes, removeRoute } from "rou3";

const router = createRouter(/* options */);
// /* ----------------- addRoute -------------------------------- */
// addRoute(router, "POST", "/sys/dicmItem/selectByExamPartId", { payload: "sys/examItem/selectByExamPartId" });
// addRoute(router, "POST", "/sys/dict/list", { payload: "sys/dict/list" });
// addRoute(router, "POST", "/sys/exat/:parentId/list", { payload: "sys/dict/:parentId/list" });
// addRoute(router, "POST", "/registration/getApplyByReg/:id", { payload: "registration/getApplyByReg/:id" });
// addRoute(router, "GET", "/api/user", { payload: "api user path" });
// addRoute(router, "POST", "/*", { payload: "Anonymous route" }); // 极端测试
// addRoute(router, "GET", "/path", { payload: "this path" });
// addRoute(router, "POST", "/path/*", { payload: "Anonymous route" }); // 跟 :name 作用相同
addRoute(router, "POST", "/path/@:name", { payload: "@ reg route" });
addRoute(router, "POST", "/path/:name", { payload: "named route" }); // 要命名用这个，否则用上面那个
// addRoute(router, "GET", "/path/foo/**/har", { payload: "wildcard route" });
// addRoute(router, "GET", "/path/foo/**:name", { payload: "named wildcard route" });
// addRoute(router, "GET", "/api/:id/:name", { payload: "multiple named route" });
// addRoute(router, "GET", "/test/users/@:id(\d+)", { payload: "test users id(\d+)" });

// /* ----------------- findRoute -------------------------------- */
// // Returns { payload: 'this path' }
// findRoute(router, "GET", "/path");
// // Returns { payload: 'named route', params: { name: 'fooval' } }
// const foovalRoute = findRoute(router, "POST", "/path/fooval");
// // Returns { payload: '@ reg route', params: { name: 'fooval' } }
// const atFoovalRoute = findRoute(router, "POST", "/path/@fooval"); // => 
// // Returns { payload: 'wildcard route' }
// findRoute(router, "GET", "/path/foo/bar/baz");
// // Returns undefined (no route matched for/)
// findRoute(router, "GET", "/");
// const testUsersIdRoute = findRoute(router, "GET", "/test/users/@123");
// // Returns { payload: 'multiple named route', params: { id: '001', name: 'zhangsan' } }
// const zhangsan = findRoute(router, "GET", "/api/001/zhangsan");

/* ----------------- findAllRoutes -------------------------------- */
// 查找所有匹配 GET /path/foo/bar 的路由
// const allRoutes = findAllRoutes(router, "GET", "/path/foo/bar");
// 输出: [
//   { payload: 'wildcard route', params: { _: "bar" } },
//   { payload: 'named wildcard route', params: { name: 'bar' } }
// ]

// 查找所有匹配 /path 开头的路由
// const allPathRoutes = findAllRoutes(router, "GET", "/path");
// 输出: [{ data: { payload: 'this path' }, params: undefined }]
// 查找所有匹配 POST /path/fooval 的路由，不包含参数
const allPostRoutes = findAllRoutes(router, "POST", "/path/fooval", { params: false }); // 
// 对比 findRoute 的结果
const singleRoute = findRoute(router, "POST", "/path/fooval", { params: false });
// 测试 /path/@fooval 的匹配结果
const allAtRoutes = findAllRoutes(router, "POST", "/path/@fooval", { params: false });
// 对比 findRoute 的结果
const singleAtRoute = findRoute(router, "POST", "/path/@fooval", { params: false });

// /* ----------------- removeRoute -------------------------------- */
// // 移除 GET /path 路由
// removeRoute(router, "GET", "/path");
// const removedRoute = findRoute(router, "GET", "/path");

// // 移除 GET /path/foo/** 路由
// removeRoute(router, "GET", "/path/foo/**");
// const remainingWildcardRoute = findRoute(router, "GET", "/path/foo/bar/baz");

// // 查看移除后的所有匹配路由
const remainingAllRoutes = findAllRoutes(router, "GET", "/path/foo/bar/baz");