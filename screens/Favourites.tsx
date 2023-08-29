import React, { useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { useUser } from "../store/user";
import RecipeCard from "../components/RecipeCard";
import { UseQueryResult, useQuery } from "react-query";
import { fetchRecipesById } from "../utils/functions/fetchRecipesById";
import { RecipeType, UserType } from "../utils/types";

const Favourites: React.FC = () => {
  const user = useUser((state) => state.user);

  // const { isLoading, isError }: UseQueryResult<RecipeType, [string, number]> =
  //   useQuery(["recipes", recipeId], fetchRecipesById, {
  //     onSuccess(data) {
  //       if (!recentRecipe || recentRecipe?.id !== recipeId) {
  //         addRecentRecipes(data);
  //       }
  //     },
  //     enabled: !recentRecipe || recentRecipe?.id !== recipeId,
  //   });

  return (
    <View>
      {user?.favourites.map((favId) => (
        <Text key={favId}>{favId}</Text>
        // <RecipeCard key={favId} recipe={undefined} isUsersRecpe={item.author === user?.name} />
      ))}
    </View>
  );
};

export default Favourites;
