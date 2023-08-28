import React, { useState } from "react";
// import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import AddRecipe from "./AddRecipe";
import { UseQueryResult, useQuery } from "react-query";
import { RecipeType, ToRecipeDetailsRouteProp } from "../utils/types";
import { useRoute } from "@react-navigation/native";
import { fetchRecipesById } from "../utils/fetchRecipesById";
// import { useRoute } from "@react-navigation/native";
//Utils
// import { ToRecipeDetailsRouteProp } from "../utils/types";

const Modal: React.FC = () => {
  const router = useRoute<ToRecipeDetailsRouteProp>();
  const recipeId = parseInt(router.params.recipeId);
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);

  const { isLoading, isError }: UseQueryResult<RecipeType, [string, number]> =
    useQuery(["recipes", recipeId], fetchRecipesById, {
      onSuccess(data) {
        setRecipe(data);
        // if (!recentRecipe || recentRecipe?.id !== recipeId) {
        //   addRecentRecipes(data);
        // }
      },
      //   enabled: !recentRecipe || recentRecipe?.id !== recipeId,
    });
  return <AddRecipe />;
};

export default Modal;
