// import React, { useLayoutEffect } from "react";
// import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useStore } from "../store/store";
import {
  QueryFunctionContext,
  //  UseQueryResult, useQuery
} from "react-query";
// Utils
import {
  RecipeType,
  //   NavigationProp,
  //   ToRecipeDetailsRouteProp,
  RecipeDetailsType,
  RecipeDBAllType,
} from "../types";
// // Components
// import ScreenMessage from "../components/ScreenMessage";
// import DetailItem from "../components/DetailItem";

export const fetchRecipesById: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1]; // details id from the card

  const [recipesResponse, detailsResponse] = await Promise.all([
    fetch(`http://localhost:3000/recipes-all/${id}`),
    // fetch(`http://localhost:3000/recipes-all?idDetails=${id}`),
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
