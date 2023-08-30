import React, { useState } from "react";
// import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import AddRecipe from "./AddRecipe";
import { UseQueryResult, useQuery } from "react-query";
import { useRoute } from "@react-navigation/native";
//Utils
import { fetchRecipesById } from "../utils/functions/fetchRecipesById";
import { RecipeType, ToRecipeDetailsRouteProp } from "../utils/types";
//Component
import ScreenMessage from "../components/ScreenMessage";

const Modal: React.FC = () => {
  const router = useRoute<ToRecipeDetailsRouteProp>();
  const recipeId = parseInt(router.params.recipeId);
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);

  const { isLoading, isError }: UseQueryResult<RecipeType, [string, number]> =
    useQuery(["recipes", recipeId], fetchRecipesById, {
      onSuccess(data) {
        setRecipe(data);
      },
    });

  if (isLoading) {
    return <ScreenMessage msg={"Loading..."} />;
  }

  if (isError) {
    return <ScreenMessage msg={"Error fetching data"} />;
  }

  return <AddRecipe recipeToEdit={recipe} edit={true} />;
};

export default Modal;
