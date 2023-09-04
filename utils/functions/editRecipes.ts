// Utils
import { RecipeType, RecipeDetailsType, RecipeDBAllType } from "../types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const editRecipes = async (
  recipe: RecipeType,
  idToEdit: number,
): Promise<void> => {
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

  const responseDetails = await fetch(`${apiUrl}/recipes-details/${id}`, {
    method: "PUT",
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

  await fetch(`${apiUrl}/recipes-all/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmpAll),
  });
};
