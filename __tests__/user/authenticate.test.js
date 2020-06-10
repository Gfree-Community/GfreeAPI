const request = require("supertest");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

const AuthRequiredRoutes = [
  ["get", "/getUser"],
  ["post", "/createRecipe"],
  ["post", "/updateRecipe"],
  ["post", "/archiveRecipe"],
  ["post", "/likeRecipe"],
];

const nonAuthRoutes = [
  ["post", "/signin"],
  ["post", "/signup"],
  ["get", "/getNewestRecipesFeed"],
  ["post", "/getPopularRecipesFeed"],
  ["get", "/findRecipes"],
];

describe("Authentification Middleware", () => {
  AuthRequiredRoutes.forEach(([reqMeth, protectedRoute]) => {
    it(`${protectedRoute} should not be accessible.`, async (done) => {
      const res = await request(app)[reqMeth](protectedRoute);
      expect(res.statusCode).toEqual(401);
      done();
    });
  });

  nonAuthRoutes.forEach(([reqMeth, unProtectedRoute]) => {
    it(`${unProtectedRoute} should be accessible.`, async (done) => {
      const res = await request(app)[reqMeth](unProtectedRoute);
      expect(res.statusCode !== 401).toBeTruthy();
      done();
    });
  });
});
