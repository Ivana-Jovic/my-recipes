import { QueryFunctionContext } from "react-query";
// Utils
import { RecipeType, RecipeDetailsType, RecipeDBAllType } from "../types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const addRecipes: (
  context: QueryFunctionContext<
    [string, RecipeType | undefined, number | undefined]
  >,
) => Promise<void> = async (context) => {
  const recipe = context.queryKey[1];
  // const isToEdit = context.queryKey[2];

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

  const responseDetails = await fetch(`${apiUrl}/recipes-details/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmpDetails),
  });
  const jsonDataDetails = (await responseDetails.json()) as RecipeDetailsType;

  const newId = jsonDataDetails.id;

  const tmpAll: Omit<RecipeDBAllType, "id"> = {
    pictures: recipe?.pictures,
    idDetails: newId,
    ingredients: recipe?.ingredients,
    instructions: recipe?.instructions,
  };

  await fetch(`${apiUrl}/recipes-all/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmpAll),
  });
};
