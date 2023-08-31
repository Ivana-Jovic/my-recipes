import { QueryFunctionContext } from "react-query";
// Utils
import { RecipeType, RecipeDetailsType, RecipeDBAllType } from "../types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchRecipesById: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1]; // details id from the card

  // const urlParam = "id=" + id;

  const [recipesResponse, detailsResponse] = await Promise.all([
    fetch(`${apiUrl}/recipes-all/${id}`),
    // fetch(`${apiUrl}/recipes-all?idDetails=${id}`),//todo ovo id details nema poentu nigde, jer ne mogu da namestim da mi fetch radi sa parametrom
    // fetch(`${apiUrl}/recipes-all?${urlParam}`),
    fetch(`${apiUrl}/recipes-details/${id}`),
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
