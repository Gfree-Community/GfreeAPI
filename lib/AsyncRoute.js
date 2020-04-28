/** Helpers Functions */
const isFunction = (functionToCheck) =>
  functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
// Given an async route, handle catching err
const asyncRoute = (route) => (req, res, next = console.error) =>
  Promise.resolve(route(req, res)).catch(next);

const asyncRouteDependingOnModuleExport = (module) => {
  /** If module is a function export */
  if (isFunction(module)) return asyncRoute(module);

  /** If Module is an Object of functions */
  const AsyncRouterModule = Object.keys(module).reduce((acc, key) => {
    acc[key] = asyncRoute(module[key]);
    return acc;
  }, {});
  return AsyncRouterModule;
};

module.exports = asyncRouteDependingOnModuleExport;
