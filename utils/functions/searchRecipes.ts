import { QueryFunctionContext } from "react-query";
// Utils
import { RecipeDetailsType, RecipeDBAllType } from "../types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const searchRecipes: (
  context: QueryFunctionContext<[string, string]>,
) => Promise<RecipeDetailsType[]> = async (context) => {
  const searchString = context.queryKey[1];

  if (searchString.length === 0) return [];

  const [ingredientsResponse, titleResponse] = await Promise.all([
    fetch(`${apiUrl}/recipes-all?ingredients_like=${searchString}`),
    fetch(`${apiUrl}/recipes-details?title_like=${searchString}`),
  ]);

  const [ingredientsData, titleData] = await Promise.all([
    ingredientsResponse.json() as Promise<RecipeDBAllType[]>,
    titleResponse.json() as Promise<RecipeDetailsType[]>,
  ]);

  const returnValue = titleData;

  if (ingredientsData.length !== 0) {
    let urlParam = "";

    ingredientsData.forEach((elem, id) => {
      urlParam += "id=" + elem.idDetails;
      if (id !== ingredientsData.length - 1) urlParam += "&";
    });

    const ingredientsDataDetailsResponse = await fetch(
      `${apiUrl}/recipes-details?${urlParam}`,
    );

    const ingredientsDataDetails =
      (await ingredientsDataDetailsResponse.json()) as RecipeDetailsType[];

    returnValue.push(...ingredientsDataDetails);

    const uniqueObjects: RecipeDetailsType[] = Array.from<RecipeDetailsType>(
      returnValue
        .reduce((map, obj) => map.set(obj.id, obj), new Map())
        .values(),
    );

    return uniqueObjects;
  }

  return returnValue;
};
