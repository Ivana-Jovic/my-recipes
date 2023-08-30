// //todo rename file
// // server.get("/searchRecipes", (req, res) => {
// import jsonServer from "json-server";

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);

// server.get("/search/recipes", (req, res) => {
//   const query = req.query.q?.toString()?.toLowerCase() || "";
//   const recipes = router.db.get("recipes").value();

//   const matchingRecipes = recipes.filter((recipe) =>
//     recipe.title.toLowerCase().includes(query),
//   );

//   res.json(matchingRecipes);
// });

// server.use(router);

// server.listen(3000, () => {
//   console.log("JSON Server is running");
// });
