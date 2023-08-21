import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { RecipeType } from "../utils/types";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStore } from "../store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;

type RecipeDetailsScreenRouteProp = Props["route"];

const fetchRecipes: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  const jsonData = (await response.json()) as RecipeType;
  return jsonData;
};

function RecipeDetails() {
  const router = useRoute<RecipeDetailsScreenRouteProp>();
  const recipeId = parseInt(router.params.recipeId);

  const addRecentRecipes = useStore((state) => state.addRecentRecipes);
  const {
    data: currRecipe,
    isLoading,
    isError,
  }: UseQueryResult<RecipeType, [string, number]> = useQuery(
    ["recipes", recipeId],
    fetchRecipes,
  );

  // const recipesContext = useStore((state) => state.recipes);
  // const currRecipe = recipesContext.find(
  //   (recipe: RecipeDetailsType) => recipe.id === recipeId,
  // );
  useEffect(() => {
    if (currRecipe) addRecentRecipes(currRecipe);
  }, [currRecipe]);

  if (!currRecipe) {
    return <Text>-{recipeId}Loading...</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Title:{currRecipe?.title}</Text> */}
      <Title>{currRecipe.title}</Title>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-assignment */}
      <Image source={require("../assets/pasta.jpeg")} style={styles.image} />
      <View style={styles.containerRight}>
        <View style={styles.details}>
          <View style={styles.detailsItem}>
            <Ionicons name="timer-outline" />
            <Text>{currRecipe.cookTime}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="ios-analytics" />
            <Text>{currRecipe.difficulty}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="person-outline" />
            <Text>{currRecipe.author}</Text>
          </View>
        </View>
        <Text>{currRecipe.description}</Text>
        {/* //sastojci */}
      </View>
    </View>
  );
}

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.cardColor,
    padding: 20,
    minHeight: 100,
    flex: 1,
    width: "100%",
    gap: 20,
    alignItems: "center",
  },
  containerRight: {
    flex: 2,
    width: "100%",
    gap: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  details: {
    flexDirection: "row",
    gap: 35,
    width: "100%",
  },
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
