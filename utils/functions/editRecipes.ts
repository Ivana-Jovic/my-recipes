import { QueryFunctionContext } from "react-query";
// Utils
import { RecipeType, RecipeDetailsType, RecipeDBAllType } from "../types";

export const editRecipes: (
  context: QueryFunctionContext<
    [string, RecipeType | undefined, number | undefined]
  >,
) => Promise<void> = async (context) => {
  const recipe = context.queryKey[1];
  const idToEdit = context.queryKey[2]; // id details
  const id = idToEdit;

  if (!recipe) {
    console.log("Recipe is undefined");
    return;
  }

  const tmpDetails: Omit<RecipeDetailsType, "id"> = {
    title: recipe?.title,
    pictures: [recipe?.pictures[0]],
    description: recipe?.description,
    cookTime: recipe?.cookTime,
    author: recipe?.author,
    difficulty: recipe?.difficulty,
  };

  const responseDetails = await fetch(
    `http://localhost:3000/recipes-details/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpDetails),
    },
  );
  const jsonDataDetails = (await responseDetails.json()) as RecipeDetailsType;

  const newId = jsonDataDetails.id;

  const tmpAll: Omit<RecipeDBAllType, "id"> = {
    pictures: recipe?.pictures,
    idDetails: newId, //todo ovo id details nema poentu nigde, jer ne mogu da namestim da mi fetch radi sa parametrom
    ingredients: recipe?.ingredients,
    instructions: recipe?.instructions,
  };

  await fetch(`http://localhost:3000/recipes-all/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmpAll),
  });
};
