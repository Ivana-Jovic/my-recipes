import { QueryFunctionContext } from "react-query";
// Utils
import { RecipeType, RecipeDetailsType, RecipeDBAllType } from "../types";
// // Components

export const fetchRecipesById: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1]; // details id from the card

  // const urlParam = "id=" + id;

  const [recipesResponse, detailsResponse] = await Promise.all([
    fetch(`http://localhost:3000/recipes-all/${id}`),
    // fetch(`http://localhost:3000/recipes-all?idDetails=${id}`),
    // fetch(`http://localhost:3000/recipes-all?${urlParam}`),
    fetch(`http://localhost:3000/recipes-details/${id}`),
  ]);

  const [recipesData, detailsData] = await Promise.all([
    recipesResponse.json() as Promise<RecipeDBAllType>,
    detailsResponse.json() as Promise<RecipeDetailsType>,
  ]);

  const combinedData = {
    ...recipesData,
    ...detailsData,
    pictures: recipesData.pictures,
  };

  return combinedData;
};
